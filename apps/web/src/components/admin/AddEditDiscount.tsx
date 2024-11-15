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
import { Discount, dummyProducts, Product } from '@/data/dummyData';
import { set } from 'cypress/types/lodash';

interface AddEditDiscountProps {
  mode: 'add' | 'edit';
  editedData?: Discount;
  isOpen: boolean;
  onClose: () => void;
  onSaveEdit: () => void;
}

const AddEditDiscount: React.FC<AddEditDiscountProps> = ({ isOpen, onClose, onSaveEdit, mode, editedData }) => {
  const [id, setId] = useState<number>();
  const [editedDiscountName, setEditedDiscountName] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [appliedDiscountType, setAppliedDiscountType] = useState('MINIMUM_PURCHASE');
  const [discountValue, setDiscountValue] = useState<number | string>('');
  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState<number | string>('');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (mode == 'edit') {
        setId(editedData?.id);
        setEditedDiscountName(editedData?.name || '');
        setDiscountType(editedData?.discountType || 'PERCENTAGE');
        setAppliedDiscountType(editedData?.appliedDiscountType || 'MINIMUM_PURCHASE');
        setDiscountValue(
          appliedDiscountType == 'PERCENTAGE'
            ? editedData?.discountPercentage || 0
            : editedData?.discountPercentage || 0
        );
        setMinimumPurchaseAmount(editedData?.minimumPurchaseAmount || 0);
        setSelectedProductIds(
          editedData?.products?.map((val) => {
            return String(val.id);
          }) || []
        );
        setSelectedProducts(editedData?.products || []);
      } else {
        setEditedDiscountName('');
        setDiscountType('PERCENTAGE');
        setAppliedDiscountType('MINIMUM_PURCHASE');
        setDiscountValue('');
        setMinimumPurchaseAmount('');
        setSelectedProductIds([]);
        setSelectedProducts([]);
      }
    }
  }, [
    appliedDiscountType,
    editedData?.appliedDiscountType,
    editedData?.discountPercentage,
    editedData?.discountType,
    editedData?.id,
    editedData?.minimumPurchaseAmount,
    editedData?.name,
    editedData?.products,
    isOpen,
    mode
  ]);

  const handleSaveEdit = () => {
    onSaveEdit();
    onClose();
  };

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
                  value={String(discountValue)}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
              ) : (
                <Input
                  fullWidth
                  label="Discount Amount"
                  type="number"
                  startContent="Rp."
                  value={String(discountValue)}
                  onChange={(e) => setDiscountValue(new Intl.NumberFormat('id-ID').format(Number(e.target.value)))}
                />
              )}
              <Select
                label="Applied Discount Type"
                value={appliedDiscountType}
                onChange={(e) => setAppliedDiscountType(e.target.value)}
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
                  onChange={(e) =>
                    setMinimumPurchaseAmount(new Intl.NumberFormat('id-ID').format(Number(e.target.value)))
                  }
                />
              )}
              {(appliedDiscountType === 'ON_PRODUCT' || appliedDiscountType === 'BUY_ONE_GET_ONE') && (
                <>
                  <Select
                    label="Can be applied to product:"
                    multiple
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
                      <SelectItem key={product.id} value={product.id}>
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
              <Button onClick={handleSaveEdit}>Save</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddEditDiscount;
