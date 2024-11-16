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
import { Discount, dummyProducts, Product } from '@/types/types';

interface AddEditDiscountProps {
  mode: 'add' | 'edit';
  editedData?: Discount;
  isOpen: boolean;
  onClose: () => void;
  onSaveEdit: (discount: Discount) => void;
}

const AddEditDiscount: React.FC<AddEditDiscountProps> = ({ isOpen, onClose, onSaveEdit, mode, editedData }) => {
  const [id, setId] = useState<number>();
  const [editedDiscountName, setEditedDiscountName] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [appliedDiscountType, setAppliedDiscountType] = useState('MINIMUM_PURCHASE');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState<number | string>('');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (mode == 'edit') {
        setId(editedData?.id);
        setEditedDiscountName(editedData?.name ?? '');
        setDiscountType(editedData?.discountType ?? 'PERCENTAGE');
        setAppliedDiscountType(editedData?.appliedDiscountType ?? 'MINIMUM_PURCHASE');
        setDiscountAmount(editedData?.discountAmount ?? 0);
        setDiscountPercentage(editedData?.discountPercentage ?? 0);
        setMinimumPurchaseAmount(editedData?.minimumPurchaseAmount ?? 0);
        setSelectedProductIds(
          editedData?.products?.map((val) => {
            return String(val.id);
          }) ?? []
        );
        setSelectedProducts(editedData?.products ?? []);
      } else {
        setEditedDiscountName('');
        setDiscountType('PERCENTAGE');
        setAppliedDiscountType('MINIMUM_PURCHASE');
        setDiscountAmount(0);
        setDiscountPercentage(0);
        setMinimumPurchaseAmount('');
        setSelectedProductIds([]);
        setSelectedProducts([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSaveEdit = () => {
    onSaveEdit({
      id,
      name: editedDiscountName,
      discountType,
      appliedDiscountType,
      discountAmount,
      discountPercentage,
      minimumPurchaseAmount,
      selectedProductIds,
      selectedProducts
    } as Discount);
    onClose();
  };

  useEffect(() => {
    if (appliedDiscountType === 'MINIMUM_PURCHASE') {
      setMinimumPurchaseAmount('');
    } else {
      setSelectedProductIds([]);
      setSelectedProducts([]);
    }
  }, [appliedDiscountType]);

  return (
    <Modal className="overflow-auto" size="xl" isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit Discount</ModalHeader>
            <ModalBody>
              <Input
                fullWidth
                label="Discount Name"
                value={editedDiscountName}
                onChange={(e) => setEditedDiscountName(e.target.value)}
              />
              <RadioGroup value={discountType} onValueChange={(value) => setDiscountType(value)} label="Discount Type">
                <Radio value="PERCENTAGE">Percentage</Radio>
                <Radio value="AMOUNT">Amount</Radio>
              </RadioGroup>
              {discountType === 'PERCENTAGE' ? (
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
                value={appliedDiscountType}
                defaultSelectedKeys={[appliedDiscountType]}
                onChange={(e) => {
                  setAppliedDiscountType(String(e.target.value));
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
              {appliedDiscountType === 'MINIMUM_PURCHASE' && (
                <Input
                  fullWidth
                  label="Minimum Purchase Amount"
                  type="number"
                  startContent="Rp."
                  value={String(minimumPurchaseAmount)}
                  onChange={(e) => setMinimumPurchaseAmount(Number(e.target.value))}
                />
              )}
              {(appliedDiscountType === 'ON_PRODUCT' || appliedDiscountType === 'BUY_ONE_GET_ONE') && (
                <>
                  <Select
                    label="Can be applied to product:"
                    selectionMode="multiple"
                    value={selectedProductIds}
                    onSelectionChange={(selected) => {
                      const selectedIds = Array.from(selected as Set<string>);
                      setSelectedProductIds(selectedIds);
                      const newValues = selectedIds.map((productId) => {
                        return dummyProducts.find((product) => String(product.id) == productId);
                      });
                      setSelectedProducts(newValues as Product[]);
                    }}
                  >
                    {dummyProducts.map((product) => (
                      <SelectItem key={Number(product.id)} value={product.id}>
                        {product.productName}
                      </SelectItem>
                    ))}
                  </Select>
                  <ul>
                    {selectedProducts.map((product) => (
                      <li key={product.id}>{product.productName}</li>
                    ))}
                  </ul>
                </>
              )}
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
