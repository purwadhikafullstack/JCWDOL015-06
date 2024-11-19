'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Select, SelectItem, SelectSection } from '@nextui-org/react';
import { Cart, CartItem, Product } from '@/types/types';
import { toastFailed, toastSuccess } from '@/utils/toastHelper';
import { getProductById } from '@/api/product.api';
import { useRouter, useSearchParams } from 'next/navigation';
import { createCart, fetchCarts, updateCart } from '@/api/cart.api';
import { useAppSelector } from '@/store';

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [availableStock, setAvailableStock] = useState<number>(0);
  const [selectedDiscountId, setSelectedDiscountId] = useState<number | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);

  const userId = useAppSelector((state) => state.auth.id);
  const userVerify = useAppSelector((state) => state.auth.isVerify);

  useEffect(() => {
    const getDetails = async () => {
      if (id) {
        try {
          const response = await getProductById(Number(id));
          setProduct(response);
        } catch (err) {
          toastFailed('Failed to fetch product');
          router.back();
        }
      }
    };

    getDetails();
  }, [id, router]);

  useEffect(() => {
    // Update available stock when store changes
    if (selectedStoreId) {
      const storeStock = product?.Stock?.find((stock) => stock.storeId === Number(selectedStoreId))?.quantity;
      setAvailableStock(storeStock || 0);
      setQuantity(1); // Reset quantity when changing store
    }
  }, [selectedStoreId, product]);

  useEffect(() => {
    const applyDiscount = (discountId: number) => {
      const discount = product?.productDiscounts?.find((d) => d.discount?.id === discountId)?.discount;

      if (discount && product) {
        let price = product.price ?? 0;

        if (discount.discountType === 'PERCENTAGE' && discount.discountPercentage) {
          price -= (price * discount.discountPercentage) / 100;
        } else if (discount.discountType === 'AMOUNT' && discount.discountAmount) {
          price -= discount.discountAmount;
        } else if (discount.discountType === 'BUY_ONE_GET_ONE') {
          if (quantity % 2 === 0 && quantity !== 0) {
            price = (price * 50) / 100;
          } else if (quantity == 1 || quantity == 0) {
            const newQty = 2;
            setQuantity(newQty);
            price = (price * 50) / 100;
          } else {
            const newQty = quantity - 1;
            setQuantity(newQty);
            price = (price * 50) / 100;
          }
        }

        setDiscountedPrice(Math.max(price, 0));
      }
    };

    if (selectedDiscountId !== null) {
      applyDiscount(selectedDiscountId);
    }
  }, [selectedDiscountId, product, quantity]);

  const createNewCart = async (userId: number) => {
    try {
      const response = await createCart({ userId: Number(userId), storeId: Number(selectedStoreId) });
      let cart = response as Cart;
      return cart;
    } catch (err) {
      toastFailed('Failed to add item to cart');
    }
  };

  const handleAddToCart = async () => {
    if (!selectedStoreId) {
      toastFailed('Please select a store first!');
      return;
    }
    if (quantity > availableStock) {
      toastFailed(`Quantity exceeds available stock (${availableStock})`);
      return;
    }

    //find user cart
    // const user = JSON.parse(localStorage.getItem('user') as string);
    // const userId = user?.id;

    let cartId = undefined as undefined | number;
    if (userId) {
      if (userVerify == 1) {
        const response = await fetchCarts({ userId: Number(userId), storeId: Number(selectedStoreId) });
        let carts = response?.carts as unknown as Cart[];
        let cart = carts?.[0];
        cartId = cart?.id;

        //if no cart id, create one first
        if (!cartId) {
          const cart = await createNewCart(userId);
          cartId = cart?.id;
        }

        //create new cartItems
        const newCartItem = {
          productId: Number(id),
          quantity: quantity,
          discountId: selectedDiscountId ?? undefined,
          totalPrice: Number(discountedPrice) * quantity,
          totalDiscount: (Number(product?.price) - Number(discountedPrice)) * quantity
        };
        let cartItems = [] as {
          productId?: number;
          quantity?: number;
          discountId?: number;
          totalPrice?: number;
          totalDiscount?: number;
        }[];
        if (cart.cartItems && cart.cartItems?.length > 0) {
          cart.cartItems?.forEach((cartItem) => {
            cartItems.push({
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              discountId: cartItem.discountId ?? undefined,
              totalPrice: cartItem.totalPrice,
              totalDiscount: cartItem.totalDiscount
            });
          });
        }
        //join with old cartItems
        cartItems.push(newCartItem);

        // call updateCart api
        try {
          const cartTotalPrice = cartItems.reduce((total, item) => total + Number(item.totalPrice), 0);
          const cartTotalDiscount = cartItems.reduce((total, item) => total + Number(item.totalDiscount), 0);

          await updateCart(Number(cartId), {
            discountId: selectedDiscountId ?? undefined,
            totalPrice: Number(cartTotalPrice),
            totalDiscount: Number(cartTotalDiscount),
            cartItems: cartItems
          });
          toastSuccess('Product added to cart successfully!');
        } catch (err) {
          toastFailed('Failed to add item to cart');
        }
      } else {
        toastFailed('You account has not been verified!');
        router.push('/user');
      }
    } else {
      toastFailed('You are not logged in!');
      router.push('/login');
    }
  };

  const handlePrevImage = () => {
    let index = 0;
    if (product?.imageUrls) {
      const split = product?.imageUrls?.split(',');
      if (split?.length > 1) {
        index = split?.length - 1;
      }
    }
    if (currentImageIndex !== null) {
      setCurrentImageIndex((prevIndex) => (prevIndex! > 0 ? prevIndex! - 1 : index));
    }
  };

  const handleNextImage = () => {
    let index = 0;
    if (product?.imageUrls) {
      const split = product?.imageUrls?.split(',');
      if (split?.length > 1) {
        index = split?.length - 1;
      }
    }
    if (currentImageIndex !== null) {
      setCurrentImageIndex((prevIndex) => (prevIndex! < index ? prevIndex! + 1 : 0));
    }
  };

  const handleImageClick = () => {
    setCurrentImageIndex(0);
  };

  const handleCloseOverlay = () => {
    setCurrentImageIndex(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="grid grid-cols-12 gap-4">
        {/* Product Image */}
        <div className="col-span-6">
          {product?.imageUrls?.split(',').map((url, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={`http://localhost:8000/uploads/${url}`}
              alt={`Product ${index + 1}`}
              className="w-full h-auto mb-4 cursor-pointer"
              onClick={() => handleImageClick()}
            />
          ))}
        </div>

        {/* Product Info */}
        <div className="col-span-6">
          <h1 className="text-2xl font-bold mb-2">{product?.productName}</h1>
          <p className="text-gray-700 mb-4">{product?.desc}</p>
          <div className="flex flex-row gap-2">
            <p className="text-lg font-semibold mb-4">Rp. {product?.price?.toLocaleString()}</p>
            <p className="text-lg font-semibold mb-4">x {quantity}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className={discountedPrice ? `font-semibold mb-4 line-through text-base` : `text-lg font-semibold mb-4`}>
              Rp. {(Number(product?.price) * quantity)?.toLocaleString()}
            </p>
            {discountedPrice && (
              <p className="text-lg font-semibold mb-4 text-orange-600">
                Rp. {(discountedPrice * quantity)?.toLocaleString()}
              </p>
            )}
          </div>

          {/* Store Selection */}
          <div className="mb-4">
            <Select fullWidth label="Select Store" onSelectionChange={(e) => setSelectedStoreId(String(e.currentKey))}>
              <SelectSection>
                {product?.Stock ? (
                  product.Stock.map((stock) => (
                    <SelectItem
                      key={Number(stock.storeId)}
                      textValue={`${stock.store?.name} (Stock: ${stock.quantity})`}
                      value={String(stock.storeId)}
                    >
                      {stock.store?.name} (Stock: {stock.quantity})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key={0}>No stock</SelectItem>
                )}
              </SelectSection>
            </Select>
          </div>

          {/* Discount Selection */}
          <div className="mb-4">
            <Select
              fullWidth
              label="Apply Discount"
              onSelectionChange={(e) => setSelectedDiscountId(Number(e.currentKey))}
            >
              <SelectSection>
                {product?.productDiscounts ? (
                  product?.productDiscounts?.map((productDiscount) => {
                    const discount = productDiscount.discount;
                    return (
                      <SelectItem
                        key={Number(discount?.id)}
                        textValue={`${discount?.name} 
                        (${
                          discount?.discountType === 'PERCENTAGE'
                            ? `${discount?.discountPercentage}%`
                            : discount?.discountType === 'AMOUNT'
                              ? `Rp. ${discount?.discountAmount}`
                              : 'Buy One Get One'
                        })
                        `}
                        value={String(discount?.id)}
                      >
                        {discount?.name} (
                        {discount?.discountType === 'PERCENTAGE'
                          ? `${discount?.discountPercentage}%`
                          : discount?.discountType === 'AMOUNT'
                            ? `Rp. ${discount?.discountAmount}`
                            : 'Buy One Get One'}
                        )
                      </SelectItem>
                    );
                  })
                ) : (
                  <SelectItem key={0}>No discount</SelectItem>
                )}
              </SelectSection>
            </Select>

            {product?.productDiscounts?.find((d) => d.discount?.id === selectedDiscountId)?.discount?.discountType ==
              'BUY_ONE_GET_ONE' && (
              <span className="text-red-500 text-xs">
                If you select buy one get one, quantity will be adjusted to even number
              </span>
            )}
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <Input
              label="Quantity"
              type="number"
              value={String(quantity)}
              onChange={(e) => setQuantity(Number(e.target.value))}
              fullWidth
              min={1}
              max={availableStock}
              disabled={!selectedStoreId}
              placeholder="Enter quantity"
            />
          </div>

          {/* Add to Cart Button */}
          <Button
            className={!selectedStoreId ? `bg-gray-200 text-gray-600` : 'bg-primary text-white'}
            fullWidth
            disabled={!selectedStoreId}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          {!selectedStoreId && (
            <span className="text-red-500 text-xs">Select store and input quantity before add to cart</span>
          )}
        </div>
      </div>

      {/* Image Overlay */}
      {currentImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button onClick={handleCloseOverlay} className="absolute top-4 right-4 text-white text-2xl">
            &times;
          </button>
          <button onClick={handlePrevImage} className="absolute left-4 text-white text-2xl">
            &lt;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`http://localhost:8000/uploads/${product?.imageUrls ? product?.imageUrls?.split(',')[currentImageIndex] : ''}`}
            alt={`Product Preview ${currentImageIndex + 1}`}
            width={800}
            height={600}
            style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
          />
          <button onClick={handleNextImage} className="absolute right-4 text-white text-2xl">
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
