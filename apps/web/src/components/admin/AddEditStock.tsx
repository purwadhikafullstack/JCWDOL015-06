'use client';

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem
} from '@nextui-org/react';
import { Store, Stock, Product } from '@/types/types';
import { fetchStores } from '@/api/store.api';
import { fetchProducts } from '@/api/product.api';

interface AddEditStockProps {
  isOpen: boolean;
  addEditMode: 'add' | 'edit';
  stock?: Stock;
  handleSave: (stock: Stock) => void;
  onClose: () => void;
}

const AddEditStock: React.FC<AddEditStockProps> = ({ isOpen, stock, addEditMode, handleSave, onClose }) => {
  const [stockForm, setStockForm] = useState<Stock>(stock || {});
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [errors, setErrors] = useState<{
    quantity?: string;
    storeId?: string;
    productId?: string;
  }>({});
  const [selectedProduct, setSelectedProduct] = useState(stock?.product?.id ?? undefined);
  const [selectedProductInputValue, setSelectedProductInputValue] = useState(stock?.product?.productName ?? '');
  const [selectedStore, setSelectedStore] = useState(stock?.store?.id ? new Set([String(stock?.store?.id)]) : []);

  useEffect(() => {
    setErrors({});
    setStockForm(stock || {});
    setSelectedStore(stock?.store?.id ? new Set([String(stock?.store?.id)]) : []);
    setSelectedProduct(stock?.product?.id ?? undefined);
    setSelectedProductInputValue(stock?.product?.productName ?? '');
  }, [stock]);

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      const getStores = async () => {
        const response = await fetchStores();
        const stores = response.stores.map((store: any) => {
          return {
            ...store,
            id: String(store.id)
          };
        });
        setStores(stores);
      };

      const getProducts = async () => {
        const queryParams = { page: 1, pageSize: 100 };
        const response = await fetchProducts(queryParams);
        const products = response.products.map((product: any) => {
          return {
            ...product,
            id: String(product.id)
          };
        });
        setProducts(products);
      };

      getStores();
      getProducts();
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {} as {
      quantity?: string;
      storeId?: string;
      productId?: string;
    };
    if (!stockForm.quantity) newErrors.quantity = 'This field is required';
    if (!stockForm.storeId) newErrors.storeId = 'This field is required';
    if (!stockForm.productId) newErrors.productId = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} closeButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{addEditMode === 'edit' ? 'Edit' : 'Add'} Stock</ModalHeader>
            <ModalBody>
              <Select
                fullWidth
                label="Store"
                isDisabled={addEditMode === 'edit'}
                selectedKeys={selectedStore}
                onSelectionChange={(e) => {
                  const newStockForm = { ...stockForm };
                  newStockForm.storeId = Number(e.currentKey);
                  setStockForm(newStockForm);
                  setSelectedStore(new Set([String(e.currentKey)]));
                }}
                errorMessage={errors.storeId}
                isInvalid={errors.storeId ? true : false}
              >
                {stores.map((store) => (
                  <SelectItem key={store.id} textValue={store.name} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </Select>
              <Autocomplete
                fullWidth
                label="Product"
                isDisabled={addEditMode === 'edit'}
                inputValue={selectedProductInputValue}
                onInputChange={(e) => {
                  setSelectedProductInputValue(e);
                }}
                selectedKey={selectedProduct}
                onSelectionChange={(e) => {
                  const newStockForm = { ...stockForm };
                  newStockForm.productId = Number(e);
                  setStockForm(newStockForm);
                  setSelectedProduct(Number(e));
                  const name = products.find((product) => product.id == Number(e))?.productName || '';
                  setSelectedProductInputValue(name);
                }}
                isClearable={false}
                errorMessage={errors.productId}
                isInvalid={errors.productId ? true : false}
              >
                {products.map((product) => (
                  <AutocompleteItem key={Number(product.id)} textValue={product.productName} value={product.id}>
                    {product.productName}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Input
                fullWidth
                label="Quantity"
                type="number"
                value={String(stockForm.quantity) || ''}
                onChange={(e) => {
                  const newStockForm = { ...stockForm };
                  newStockForm.quantity = Number(e.target.value);
                  setStockForm(newStockForm);
                }}
                errorMessage={errors.quantity}
                isInvalid={errors.quantity ? true : false}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={() => {
                  if (validateForm()) {
                    handleSave({
                      ...stockForm
                    });
                  }
                }}
                color="primary"
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddEditStock;
