'use client';


import { fetchCarts, updateCart } from '@/api/cart.api';
import { fetchDiscounts } from '@/api/discount.api';
import { Cart, Discount } from '@/types/types';
import { toastSuccess, toastFailed } from '@/utils/toastHelper';
import { Select, SelectSection, SelectItem, Input } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  useEffect(() => {
    // Fetch cart data
    const fetchCartData = async () => {
      const user = JSON.parse(localStorage.getItem('user') as string);
      const userId = user?.id;

      const response = await fetchCarts({ userId: Number(userId) });
      let carts = response?.carts as unknown as Cart[];
      setCarts(carts);

      const discountResponse = await fetchDiscounts({ appliedDiscountType: 'MINIMUM_PURCHASE' });
      setDiscounts(discountResponse.discounts);
    };

    fetchCartData();
  }, []);

  const handleQuantityChange = async (cartId: number, cartItemId: number, newQuantity: number) => {
    // Update cart item quantity and recalculate prices
    const updatedCarts = carts.map((cart) => {
      if (cart.id === cartId) {
        const updatedItems = cart.cartItems?.map((item) => {
          let newItem = item;
          if (item.id === cartItemId) {
            let priceEa = item.product?.price ?? 0;
            let discountedPriceEa = item.product?.price ?? 0;
            if (item.discount?.discountType === 'PERCENTAGE' && item.discount?.discountPercentage) {
              discountedPriceEa -= (discountedPriceEa * item.discount?.discountPercentage) / 100;
            } else if (item.discount?.discountType === 'AMOUNT' && item.discount?.discountAmount) {
              discountedPriceEa -= item.discount?.discountAmount;
            } else if (item.discount?.discountType === 'BUY_ONE_GET_ONE') {
              if (newQuantity % 2 === 0 && newQuantity !== 0) {
                discountedPriceEa = (discountedPriceEa * 50) / 100;
              } else if (newQuantity == 1 || newQuantity == 0) {
                newQuantity = 2;
                discountedPriceEa = (discountedPriceEa * 50) / 100;
              } else {
                newQuantity = newQuantity - 1;
                discountedPriceEa = (discountedPriceEa * 50) / 100;
              }
            }

            newItem = {
              ...item,
              quantity: newQuantity,
              totalPrice: Number(discountedPriceEa) * newQuantity,
              totalDiscount: (Number(priceEa) - Number(discountedPriceEa)) * newQuantity
            };
          }

          return newItem;
        });

        const updatedCartTotalPrice = updatedItems?.reduce((sum, item) => sum + Number(item.totalPrice), 0);
        const updatedCartTotalDiscount = updatedItems?.reduce((sum, item) => sum + Number(item.totalDiscount), 0);

        return {
          ...cart,
          cartItems: updatedItems,
          totalPrice: updatedCartTotalPrice,
          totalDiscount: updatedCartTotalDiscount
        };
      }
      return cart;
    });

    setCarts(updatedCarts);

    try {
      const cartToUpdate = updatedCarts.find((cart) => cart.id == cartId);
      await updateCart(Number(cartId), {
        discountId: cartToUpdate?.discountId ?? undefined,
        totalPrice: Number(cartToUpdate?.totalPrice),
        totalDiscount: Number(cartToUpdate?.totalDiscount),
        cartItems: cartToUpdate?.cartItems
      });
      toastSuccess('Product added to cart successfully!');
    } catch (err) {
      toastFailed('Failed to add item to cart');
    }
  };

  const handleDiscountSelection = async (cartId: number, discountId: number) => {
    const discount = discounts.find((d) => d.id == discountId);
    if (!discount) return;

    const updatedCarts = carts.map((cart) => {
      if (cart.id == cartId) {
        const discountAmount = discount.discountAmount || 0;

        const cartTotalPrice = cart?.cartItems?.reduce((sum, item) => sum + Number(item.totalPrice), 0);
        const cartTotalDiscount = cart?.cartItems?.reduce((sum, item) => sum + Number(item.totalDiscount), 0);

        const updatedCartTotalPrice = Number(cartTotalPrice) - discountAmount;
        const updatedCartTotalDiscount = Number(cartTotalDiscount) + discountAmount;

        return {
          ...cart,
          discountId: discountId,
          totalDiscount: updatedCartTotalDiscount > Number(cartTotalPrice) ? cartTotalPrice : updatedCartTotalDiscount,
          totalPrice: updatedCartTotalPrice > 0 ? updatedCartTotalPrice : 0
        };
      }
      return cart;
    });

    setCarts(updatedCarts);

    try {
      const cartToUpdate = updatedCarts.find((cart) => cart.id == cartId);
      await updateCart(Number(cartId), {
        discountId: cartToUpdate?.discountId ?? undefined,
        totalPrice: Number(cartToUpdate?.totalPrice),
        totalDiscount: Number(cartToUpdate?.totalDiscount),
        cartItems: cartToUpdate?.cartItems
      });
      toastSuccess('Product added to cart successfully!');
    } catch (err) {
      toastFailed('Failed to add item to cart');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {carts.map((cart) => (
        <div key={cart.id} className="mb-8 shadow-md mx-5 p-4">
          <h2 className="text-xl font-semibold mb-2">{cart.store?.name}</h2>
          <ul>
            {cart.cartItems?.map((item) => (
              <li key={item.id} className="mb-4 border-b pb-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.product?.productName}</p>
                    <p className="text-base font-semibold">
                      <span className="line-through">
                        Rp. {(Number(item.totalPrice) + Number(item.totalDiscount)).toLocaleString('id-ID')}
                      </span>{' '}
                      <span className="text-orange-600">Rp. {item.totalPrice?.toLocaleString('id-ID')}</span>
                    </p>
                    <p>
                      Price/Item: Rp.{' '}
                      {((Number(item.totalPrice) + Number(item.totalDiscount)) / Number(item.quantity)).toLocaleString(
                        'id-ID'
                      )}
                    </p>
                    {item.discount && (
                      <p className="text-sm text-gray-500">
                        Discount: {item.discount.name} -{' '}
                        {item.discount.discountType === 'AMOUNT'
                          ? `Rp. ${item.discount.discountAmount?.toLocaleString('id-ID')}`
                          : item.discount.discountType === 'PERCENTAGE'
                            ? `${item.discount.discountPercentage}%`
                            : 'Buy One Get One'}{' '}
                        (Total Discount: Rp. {item.totalDiscount?.toLocaleString('id-ID')})
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="number"
                      value={String(item.quantity)}
                      onChange={(e) =>
                        handleQuantityChange(Number(cart.id), Number(item.id), parseInt(e.target.value, 10))
                      }
                      className="border p-1 w-16"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-row justify-between">
            <Select
              className="w-1/2"
              label="Apply Discount"
              onSelectionChange={(e) => handleDiscountSelection(Number(cart.id), Number(e.currentKey))}
            >
              <SelectSection>
                {discounts.map((discount) => (
                  <SelectItem
                    key={String(discount.id)}
                    textValue={`${discount.name} 
                    (Rp. ${discount.discountAmount?.toLocaleString('id-ID')})`}
                    value={String(discount.id)}
                  >
                    {discount.name} (Rp. {discount.discountAmount?.toLocaleString('id-ID')})
                  </SelectItem>
                ))}
              </SelectSection>
            </Select>
            <div className="mt-4 flex flex-col items-end">
              <p className="text-lg font-semibold">
                <span className="text-gray-800 font-semibold line-through">
                  Rp. {(Number(cart.totalDiscount) + Number(cart.totalPrice))?.toLocaleString('id-ID')}
                </span>
                <span className="text-orange-600">{cart.totalPrice?.toLocaleString('id-ID')}</span>
              </p>
              <p className="text-green-600">(- Rp. {cart.totalDiscount?.toLocaleString('id-ID')})</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
