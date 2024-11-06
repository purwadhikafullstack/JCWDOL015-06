'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Select, Textarea, Button, SelectItem } from '@nextui-org/react';
import Image from 'next/image';
import '@nextui-org/react/style.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  // Handle file input and preview image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example of form submission logic
    console.log({ name, store, image, discount, description, weight });
    
    // Redirect to products list after submitting the form
    router.push('/admin/products');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <Input
            isClearable
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <Select
            label="Store"
            value={store}
            onChange={(value) => 
              { 
                // console.log(value)
                // setStore(value)
              }}
            required
            fullWidth
          >
            <SelectItem value="1" key={'1'}>Warehouse Jakarta</SelectItem>
          </Select>
        </div>

        <div style={{ marginBottom: '15px' }}>
        <Input
            type="file"
            label="Product Image"
            onChange={handleImageChange}
            accept="image/*"
            aria-label="Product Image Upload"
            fullWidth
          />
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <span className='text-lg'>Image Preview:</span>
              <Image
                src={imagePreview}
                alt="Product Preview"
                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <Select
            label="Discount"
            value={discount}
            onChange={(value) => 
              { 
                // console.log(value)
                // setDiscount(value)
              }}
            required
            fullWidth
          >
            <SelectItem value="1" key={''}>10% on product</SelectItem>
          </Select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <Textarea
            label="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            rows={4}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <Input
            type="number"
            label="Product Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            fullWidth
          />
        </div>

        <div>
          <Button type="submit" color="primary" size="lg" fullWidth>
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
