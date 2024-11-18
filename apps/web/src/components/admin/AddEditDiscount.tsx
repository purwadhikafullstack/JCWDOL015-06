import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  ModalContent
} from '@nextui-org/react';
import { Discount, Product } from '@/types/types';
import { fetchProducts } from '@/lib/product.api';

interface AddEditDiscountProps {
  addEditMode: 'add' | 'edit';
  discount?: Discount;
  isOpen: boolean;
  onClose: () => void;
  handleSave: (discount: Discount) => void;
}

const AddEditDiscount: React.FC<AddEditDiscountProps> = ({ isOpen, onClose, handleSave, addEditMode, discount }) => {
  const [id, setId] = useState<number>();
  const [editedDiscountName, setEditedDiscountName] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState<number | string>('');
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set());
  const [appliedDiscountType, setAppliedDiscountType] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await fetchProducts({ page: 1, pageSize: 100 });
      const productResponse = response.products.map((product: any) => {
        return {
          ...product,
          id: String(product.id)
        };
      });
      setProducts(productResponse);
    };

    getAllProducts();
  }, []);

  useEffect(() => {
    const appliedType = discount?.appliedDiscountType as string;
    const appliedProducts = discount?.ProductDiscount;
    const appliedProductIds = appliedProducts?.map((val) => String(val.id));
    setAppliedDiscountType(appliedType ? new Set([appliedType]) : new Set());
    setSelectedProductIds(appliedProductIds ? new Set([...appliedProductIds]) : new Set());
  }, [discount]);

  useEffect(() => {
    if (isOpen) {
      if (addEditMode == 'edit') {
        setId(discount?.id);
        setEditedDiscountName(discount?.name ?? '');
        setDiscountType(discount?.discountType ?? 'PERCENTAGE');
        setDiscountAmount(discount?.discountAmount ?? 0);
        setDiscountPercentage(discount?.discountPercentage ?? 0);
        setMinimumPurchaseAmount(discount?.minimumPurchaseAmount ?? 0);
      } else {
        setEditedDiscountName('');
        setDiscountType('PERCENTAGE');
        setDiscountAmount(0);
        setDiscountPercentage(0);
        setMinimumPurchaseAmount('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSaveEdit = () => {
    handleSave({
      id,
      name: editedDiscountName,
      discountType: discountType,
      appliedDiscountType: Array.from(appliedDiscountType)[0],
      discountAmount:
        Array.from(appliedDiscountType)[0] !== 'BUY_ONE_GET_ONE' && discountType == 'AMOUNT' ? discountAmount : null,
      discountPercentage:
        Array.from(appliedDiscountType)[0] !== 'BUY_ONE_GET_ONE' && discountType == 'PERCENTAGE'
          ? discountPercentage
          : null,
      minimumPurchaseAmount: Array.from(appliedDiscountType)[0] === 'MINIMUM_PURCHASE' ? minimumPurchaseAmount : null,
      selectedProductIds:
        Array.from(appliedDiscountType)[0] !== 'MINIMUM_PURCHASE' &&
        Array.from(selectedProductIds)?.map((val) => Number(val))
    } as Discount);
  };

  return (
    <Modal className="overflow-auto" size="3xl" isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit Discount</ModalHeader>
            <ModalBody>
              <div className="flex flex-row w-[100%] gap-2">
                <div
                  className={
                    Array.from(appliedDiscountType)[0] === 'ON_PRODUCT' ||
                    Array.from(appliedDiscountType)[0] === 'BUY_ONE_GET_ONE'
                      ? 'flex flex-col gap-2'
                      : 'flex flex-col gap-2 w-[100%]'
                  }
                >
                  <Input
                    fullWidth
                    label="Discount Name"
                    value={editedDiscountName}
                    onChange={(e) => setEditedDiscountName(e.target.value)}
                  />
                  {Array.from(appliedDiscountType)[0] !== 'BUY_ONE_GET_ONE' && (
                    <RadioGroup
                      value={discountType}
                      onValueChange={(value) => setDiscountType(value)}
                      label="Discount Type"
                    >
                      <Radio value="PERCENTAGE">Percentage</Radio>
                      <Radio value="AMOUNT">Amount</Radio>
                    </RadioGroup>
                  )}
                  {Array.from(appliedDiscountType)[0] !== 'BUY_ONE_GET_ONE' && discountType === 'PERCENTAGE' ? (
                    <Input
                      fullWidth
                      label="Discount Percentage"
                      type="number"
                      endContent="%"
                      value={String(discountPercentage)}
                      onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                    />
                  ) : (
                    <Input
                      fullWidth
                      label="Discount Amount"
                      type="number"
                      startContent="Rp."
                      value={String(discountAmount)}
                      onChange={(e) => setDiscountAmount(Number(e.target.value))}
                    />
                  )}
                  {/* {appliedDiscountType} */}
                  <Select
                    label="Applied Discount Type"
                    selectedKeys={appliedDiscountType}
                    onSelectionChange={(e) => {
                      const key = e.currentKey as string;
                      setAppliedDiscountType(new Set([key]));
                    }}
                  >
                    <SelectItem key="MINIMUM_PURCHASE" value="MINIMUM_PURCHASE">
                      Minimum Purchase
                    </SelectItem>
                    <SelectItem key="ON_PRODUCT" value="ON_PRODUCT">
                      On Product
                    </SelectItem>
                    <SelectItem key="BUY_ONE_GET_ONE" value="BUY_ONE_GET_ONE">
                      Buy One Get One
                    </SelectItem>
                  </Select>
                  {Array.from(appliedDiscountType)[0] === 'MINIMUM_PURCHASE' && (
                    <Input
                      fullWidth
                      label="Minimum Purchase Amount"
                      type="number"
                      startContent="Rp."
                      value={String(minimumPurchaseAmount)}
                      onChange={(e) => setMinimumPurchaseAmount(Number(e.target.value))}
                    />
                  )}
                </div>
                {(Array.from(appliedDiscountType)[0] === 'ON_PRODUCT' ||
                  Array.from(appliedDiscountType)[0] === 'BUY_ONE_GET_ONE') && (
                  <div className=" w-[70%]">
                    <Select
                      label="Can be applied to product:"
                      selectionMode="multiple"
                      selectedKeys={selectedProductIds}
                      onSelectionChange={(e) => {
                        const newSelected = [...selectedProductIds, String(e.currentKey)];
                        setSelectedProductIds(new Set([...newSelected]));
                      }}
                    >
                      {products.map((product) => (
                        <SelectItem key={Number(product.id)} value={product.id}>
                          {product.productName}
                        </SelectItem>
                      ))}
                    </Select>
                    <div className="p-2 bg-gray-50 rounded-md shadow-md my-2 flex flex-col gap-2">
                      <div className="font-semibold">List of products that can use this discounts:</div>
                      <div className="p-y-1 px-2">
                        <ul>
                          {Array.from(selectedProductIds)?.map((val, index) => (
                            <li key={val}>
                              {index + 1}.{' '}
                              {products.find((product) => String(product.id) == String(val))?.productName ?? ''}
                            </li>
                          ))}
                        </ul>
                        {Array.from(selectedProductIds)?.length == 0 && 'No product'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={handleSaveEdit} color="primary">
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddEditDiscount;
