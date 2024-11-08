'use client';

import React, { useState } from 'react';
import {
  Table,
  Pagination,
  Button,
  TableHeader,
  TableBody,
  TableCell,
  TableColumn,
  TableRow,
  Input
} from '@nextui-org/react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

const dummyCategories = [
  { id: 1, name: 'Fruits' },
  { id: 2, name: 'Vegetables' },
  { id: 3, name: 'Dairy' },
  { id: 4, name: 'Meat' },
  { id: 5, name: 'Bakery' },
  { id: 6, name: 'Beverages' },
  { id: 7, name: 'Snacks' },
  { id: 8, name: 'Frozen Foods' },
  { id: 9, name: 'Canned Goods' },
  { id: 10, name: 'Condiments' },
  { id: 11, name: 'Spices' },
  { id: 12, name: 'Grains' },
  { id: 13, name: 'Pasta' },
  { id: 14, name: 'Seafood' },
  { id: 15, name: 'Sweets' },
  { id: 16, name: 'Personal Care' },
  { id: 17, name: 'Household Items' },
  { id: 18, name: 'Pet Supplies' },
  { id: 19, name: 'Baby Products' },
  { id: 20, name: 'Health Products' }
];

const dummyProducts = [
  {
    id: 1,
    productName: 'Product 1',
    price: 65000,
    category: {
      id: 20
    },
    image_url: '',
    desc: 'Description for product 1Description for product 1Description for product 1Description for product 1Description for product 1Description for product 1',
    weight: 199,
    stock: 42
  },
  {
    id: 2,
    productName: 'Product 2',
    price: 99000,
    category: {
      id: 16
    },
    image_url: '',
    desc: 'Description for product 2Description for product 2Description for product 2Description for product 2Description for product 2Description for product 2',
    weight: 235,
    stock: 8
  },
  {
    id: 3,
    productName: 'Product 3',
    price: 19000,
    category: {
      id: 19
    },
    image_url: '',
    desc: 'Description for product 3Description for product 3Description for product 3Description for product 3Description for product 3Description for product 3',
    weight: 339,
    stock: 39
  },
  {
    id: 4,
    productName: 'Product 4',
    price: 42000,
    category: {
      id: 20
    },
    image_url: '',
    desc: 'Description for product 4Description for product 4Description for product 4Description for product 4Description for product 4Description for product 4',
    weight: 178,
    stock: 38
  },
  {
    id: 5,
    productName: 'Product 5',
    price: 33000,
    category: {
      id: 19
    },
    image_url: '',
    desc: 'Description for product 5Description for product 5Description for product 5Description for product 5Description for product 5Description for product 5',
    weight: 403,
    stock: 10
  },
  {
    id: 6,
    productName: 'Product 6',
    price: 30000,
    category: {
      id: 17
    },
    image_url: '',
    desc: 'Description for product 6Description for product 6Description for product 6Description for product 6Description for product 6Description for product 6',
    weight: 301,
    stock: 94
  },
  {
    id: 7,
    productName: 'Product 7',
    price: 77000,
    category: {
      id: 20
    },
    image_url: '',
    desc: 'Description for product 7Description for product 7Description for product 7Description for product 7Description for product 7Description for product 7',
    weight: 531,
    stock: 72
  },
  {
    id: 8,
    productName: 'Product 8',
    price: 7000,
    category: {
      id: 6
    },
    image_url: '',
    desc: 'Description for product 8Description for product 8Description for product 8Description for product 8Description for product 8Description for product 8',
    weight: 179,
    stock: 72
  },
  {
    id: 9,
    productName: 'Product 9',
    price: 77000,
    category: {
      id: 12
    },
    image_url: '',
    desc: 'Description for product 9Description for product 9Description for product 9Description for product 9Description for product 9Description for product 9',
    weight: 331,
    stock: 21
  },
  {
    id: 10,
    productName: 'Product 10',
    price: 53000,
    category: {
      id: 12
    },
    image_url: '',
    desc: 'Description for product 10Description for product 10Description for product 10Description for product 10Description for product 10Description for prod',
    weight: 524,
    stock: 67
  },
  {
    id: 11,
    productName: 'Product 11',
    price: 66000,
    category: {
      id: 18
    },
    image_url: '',
    desc: 'Description for product 11Description for product 11Description for product 11Description for product 11Description for product 11Description for prod',
    weight: 522,
    stock: 2
  },
  {
    id: 12,
    productName: 'Product 12',
    price: 17000,
    category: {
      id: 10
    },
    image_url: '',
    desc: 'Description for product 12Description for product 12Description for product 12Description for product 12Description for product 12Description for prod',
    weight: 223,
    stock: 31
  },
  {
    id: 13,
    productName: 'Product 13',
    price: 73000,
    category: {
      id: 5
    },
    image_url: '',
    desc: 'Description for product 13Description for product 13Description for product 13Description for product 13Description for product 13Description for prod',
    weight: 241,
    stock: 45
  },
  {
    id: 14,
    productName: 'Product 14',
    price: 53000,
    category: {
      id: 16
    },
    image_url: '',
    desc: 'Description for product 14Description for product 14Description for product 14Description for product 14Description for product 14Description for prod',
    weight: 479,
    stock: 100
  },
  {
    id: 15,
    productName: 'Product 15',
    price: 50000,
    category: {
      id: 7
    },
    image_url: '',
    desc: 'Description for product 15Description for product 15Description for product 15Description for product 15Description for product 15Description for prod',
    weight: 172,
    stock: 88
  },
  {
    id: 16,
    productName: 'Product 16',
    price: 63000,
    category: {
      id: 11
    },
    image_url: '',
    desc: 'Description for product 16Description for product 16Description for product 16Description for product 16Description for product 16Description for prod',
    weight: 382,
    stock: 31
  },
  {
    id: 17,
    productName: 'Product 17',
    price: 96000,
    category: {
      id: 17
    },
    image_url: '',
    desc: 'Description for product 17Description for product 17Description for product 17Description for product 17Description for product 17Description for prod',
    weight: 206,
    stock: 24
  },
  {
    id: 18,
    productName: 'Product 18',
    price: 81000,
    category: {
      id: 20
    },
    image_url: '',
    desc: 'Description for product 18Description for product 18Description for product 18Description for product 18Description for product 18Description for prod',
    weight: 268,
    stock: 12
  },
  {
    id: 19,
    productName: 'Product 19',
    price: 97000,
    category: {
      id: 19
    },
    image_url: '',
    desc: 'Description for product 19Description for product 19Description for product 19Description for product 19Description for product 19Description for prod',
    weight: 125,
    stock: 19
  },
  {
    id: 20,
    productName: 'Product 20',
    price: 51000,
    category: {
      id: 13
    },
    image_url: '',
    desc: 'Description for product 20Description for product 20Description for product 20Description for product 20Description for product 20Description for prod',
    weight: 479,
    stock: 40
  },
  {
    id: 21,
    productName: 'Product 21',
    price: 27000,
    category: {
      id: 4
    },
    image_url: '',
    desc: 'Description for product 21Description for product 21Description for product 21Description for product 21Description for product 21Description for prod',
    weight: 201,
    stock: 10
  },
  {
    id: 22,
    productName: 'Product 22',
    price: 81000,
    category: {
      id: 9
    },
    image_url: '',
    desc: 'Description for product 22Description for product 22Description for product 22Description for product 22Description for product 22Description for prod',
    weight: 532,
    stock: 26
  },
  {
    id: 23,
    productName: 'Product 23',
    price: 49000,
    category: {
      id: 9
    },
    image_url: '',
    desc: 'Description for product 23Description for product 23Description for product 23Description for product 23Description for product 23Description for prod',
    weight: 560,
    stock: 19
  },
  {
    id: 24,
    productName: 'Product 24',
    price: 34000,
    category: {
      id: 14
    },
    image_url: '',
    desc: 'Description for product 24Description for product 24Description for product 24Description for product 24Description for product 24Description for prod',
    weight: 106,
    stock: 22
  },
  {
    id: 25,
    productName: 'Product 25',
    price: 29000,
    category: {
      id: 7
    },
    image_url: '',
    desc: 'Description for product 25Description for product 25Description for product 25Description for product 25Description for product 25Description for prod',
    weight: 436,
    stock: 71
  },
  {
    id: 26,
    productName: 'Product 26',
    price: 51000,
    category: {
      id: 11
    },
    image_url: '',
    desc: 'Description for product 26Description for product 26Description for product 26Description for product 26Description for product 26Description for prod',
    weight: 489,
    stock: 49
  },
  {
    id: 27,
    productName: 'Product 27',
    price: 76000,
    category: {
      id: 18
    },
    image_url: '',
    desc: 'Description for product 27Description for product 27Description for product 27Description for product 27Description for product 27Description for prod',
    weight: 177,
    stock: 58
  },
  {
    id: 28,
    productName: 'Product 28',
    price: 35000,
    category: {
      id: 3
    },
    image_url: '',
    desc: 'Description for product 28Description for product 28Description for product 28Description for product 28Description for product 28Description for prod',
    weight: 157,
    stock: 78
  },
  {
    id: 29,
    productName: 'Product 29',
    price: 26000,
    category: {
      id: 11
    },
    image_url: '',
    desc: 'Description for product 29Description for product 29Description for product 29Description for product 29Description for product 29Description for prod',
    weight: 525,
    stock: 90
  },
  {
    id: 30,
    productName: 'Product 30',
    price: 38000,
    category: {
      id: 6
    },
    image_url: '',
    desc: 'Description for product 30Description for product 30Description for product 30Description for product 30Description for product 30Description for prod',
    weight: 494,
    stock: 61
  },
  {
    id: 31,
    productName: 'Product 31',
    price: 36000,
    category: {
      id: 5
    },
    image_url: '',
    desc: 'Description for product 31Description for product 31Description for product 31Description for product 31Description for product 31Description for prod',
    weight: 160,
    stock: 11
  },
  {
    id: 32,
    productName: 'Product 32',
    price: 92000,
    category: {
      id: 6
    },
    image_url: '',
    desc: 'Description for product 32Description for product 32Description for product 32Description for product 32Description for product 32Description for prod',
    weight: 425,
    stock: 87
  },
  {
    id: 33,
    productName: 'Product 33',
    price: 6000,
    category: {
      id: 1
    },
    image_url: '',
    desc: 'Description for product 33Description for product 33Description for product 33Description for product 33Description for product 33Description for prod',
    weight: 262,
    stock: 57
  },
  {
    id: 34,
    productName: 'Product 34',
    price: 87000,
    category: {
      id: 7
    },
    image_url: '',
    desc: 'Description for product 34Description for product 34Description for product 34Description for product 34Description for product 34Description for prod',
    weight: 254,
    stock: 2
  },
  {
    id: 35,
    productName: 'Product 35',
    price: 54000,
    category: {
      id: 17
    },
    image_url: '',
    desc: 'Description for product 35Description for product 35Description for product 35Description for product 35Description for product 35Description for prod',
    weight: 485,
    stock: 36
  },
  {
    id: 36,
    productName: 'Product 36',
    price: 74000,
    category: {
      id: 12
    },
    image_url: '',
    desc: 'Description for product 36Description for product 36Description for product 36Description for product 36Description for product 36Description for prod',
    weight: 229,
    stock: 93
  },
  {
    id: 37,
    productName: 'Product 37',
    price: 92000,
    category: {
      id: 16
    },
    image_url: '',
    desc: 'Description for product 37Description for product 37Description for product 37Description for product 37Description for product 37Description for prod',
    weight: 168,
    stock: 2
  },
  {
    id: 38,
    productName: 'Product 38',
    price: 35000,
    category: {
      id: 6
    },
    image_url: '',
    desc: 'Description for product 38Description for product 38Description for product 38Description for product 38Description for product 38Description for prod',
    weight: 576,
    stock: 78
  },
  {
    id: 39,
    productName: 'Product 39',
    price: 28000,
    category: {
      id: 4
    },
    image_url: '',
    desc: 'Description for product 39Description for product 39Description for product 39Description for product 39Description for product 39Description for prod',
    weight: 203,
    stock: 22
  },
  {
    id: 40,
    productName: 'Product 40',
    price: 31000,
    category: {
      id: 11
    },
    image_url: '',
    desc: 'Description for product 40Description for product 40Description for product 40Description for product 40Description for product 40Description for prod',
    weight: 230,
    stock: 97
  },
  {
    id: 41,
    productName: 'Product 41',
    price: 26000,
    category: {
      id: 8
    },
    image_url: '',
    desc: 'Description for product 41Description for product 41Description for product 41Description for product 41Description for product 41Description for prod',
    weight: 414,
    stock: 91
  },
  {
    id: 42,
    productName: 'Product 42',
    price: 68000,
    category: {
      id: 18
    },
    image_url: '',
    desc: 'Description for product 42Description for product 42Description for product 42Description for product 42Description for product 42Description for prod',
    weight: 368,
    stock: 22
  },
  {
    id: 43,
    productName: 'Product 43',
    price: 70000,
    category: {
      id: 9
    },
    image_url: '',
    desc: 'Description for product 43Description for product 43Description for product 43Description for product 43Description for product 43Description for prod',
    weight: 404,
    stock: 30
  },
  {
    id: 44,
    productName: 'Product 44',
    price: 48000,
    category: {
      id: 9
    },
    image_url: '',
    desc: 'Description for product 44Description for product 44Description for product 44Description for product 44Description for product 44Description for prod',
    weight: 317,
    stock: 5
  },
  {
    id: 45,
    productName: 'Product 45',
    price: 44000,
    category: {
      id: 14
    },
    image_url: '',
    desc: 'Description for product 45Description for product 45Description for product 45Description for product 45Description for product 45Description for prod',
    weight: 288,
    stock: 100
  },
  {
    id: 46,
    productName: 'Product 46',
    price: 22000,
    category: {
      id: 15
    },
    image_url: '',
    desc: 'Description for product 46Description for product 46Description for product 46Description for product 46Description for product 46Description for prod',
    weight: 564,
    stock: 20
  },
  {
    id: 47,
    productName: 'Product 47',
    price: 31000,
    category: {
      id: 17
    },
    image_url: '',
    desc: 'Description for product 47Description for product 47Description for product 47Description for product 47Description for product 47Description for prod',
    weight: 246,
    stock: 21
  },
  {
    id: 48,
    productName: 'Product 48',
    price: 15000,
    category: {
      id: 17
    },
    image_url: '',
    desc: 'Description for product 48Description for product 48Description for product 48Description for product 48Description for product 48Description for prod',
    weight: 202,
    stock: 67
  },
  {
    id: 49,
    productName: 'Product 49',
    price: 62000,
    category: {
      id: 12
    },
    image_url: '',
    desc: 'Description for product 49Description for product 49Description for product 49Description for product 49Description for product 49Description for prod',
    weight: 286,
    stock: 4
  },
  {
    id: 50,
    productName: 'Product 50',
    price: 20000,
    category: {
      id: 9
    },
    image_url: '',
    desc: 'Description for product 50Description for product 50Description for product 50Description for product 50Description for product 50Description for prod',
    weight: 435,
    stock: 1
  }
];

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [editedProductName, setEditedProductName] = useState('');
  const [editedProductPrice, setEditedProductPrice] = useState(0);

  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = dummyProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setEditedProductName(product.productName);
    setEditedProductPrice(product.price);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Save the edited product logic here
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Delete the product logic here
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="my-2 text-lg font-semibold">Products</div>
      <Table aria-label="Products Table">
        <TableHeader>
          <TableColumn className="text-md text-gray-700">Name</TableColumn>
          <TableColumn className="text-md text-gray-700">Price</TableColumn>
          <TableColumn className="text-md text-gray-700">Category</TableColumn>
          <TableColumn className="text-md text-gray-700">Description</TableColumn>
          <TableColumn className="text-md text-gray-700">Stock</TableColumn>
          <TableColumn className="text-md text-gray-700">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {currentProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>Rp. {product.price.toLocaleString('id-ID')}</TableCell>
              <TableCell className="max-w-[100px]">
                {String(dummyCategories.find((val) => val.id == product.category.id)?.name)}
              </TableCell>
              <TableCell className="max-w-[100px] truncate">
                <span className="truncate">{product.desc}</span>
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <div>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleEditClick(product)}>
                    <div className="flex items-center gap-1 border rounded-md border-primary p-1">
                      <FaPencilAlt size={14} className="text-primary bg-white text-lg" />
                    </div>
                  </Button>
                  <Button size="sm" className="p-1 min-w-[22px] bg-white" onClick={() => handleDeleteClick(product)}>
                    <div className="flex items-center gap-1 border rounded-md border-danger p-1">
                      <FaTrash size={14} className="text-danger bg-white text-lg" />
                    </div>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        showControls
        className="my-2 shadow-sm"
        total={Math.ceil(dummyProducts.length / productsPerPage)}
        initialPage={1}
        onChange={(page) => paginate(page)}
      />

      <Modal size="xl" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} closeButton>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalBody>
          <Input
            fullWidth
            label="Product Name"
            value={editedProductName}
            onChange={(e) => setEditedProductName(e.target.value)}
          />
          <Input
            fullWidth
            label="Product Price"
            type="number"
            value={String(editedProductPrice)}
            onChange={(e) => setEditedProductPrice(Number(e.target.value))}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </ModalFooter>
      </Modal>

      <Modal size="xl" isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} closeButton>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete {selectedProduct?.productName}?</ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsDeleteModalOpen(false)}>No</Button>
          <Button onClick={handleConfirmDelete}>Yes</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductsPage;
