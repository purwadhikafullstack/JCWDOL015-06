'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Select, Textarea, Button, SelectItem } from '@nextui-org/react';
import Image from 'next/image';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

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

    console.log({ name, store, image, discount, description, weight });

    router.push('/admin/products');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 md:gap-2 sm:gap-0">
          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Input
              isClearable
              label="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Select
              label="Store"
              value={store}
              onChange={(event) => {
                setStore(event.target.value);
              }}
              required
              fullWidth
            >
              <SelectItem value="1" key={'1'}>
                Warehouse Jakarta
              </SelectItem>
            </Select>
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
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
                <span className="text-lg">Image Preview:</span>
                <Image
                  src={imagePreview}
                  alt="Product Preview"
                  width={500}
                  height={300}
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                />
              </div>
            )}
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Select
              label="Discount"
              value={discount}
              onChange={(event) => {
                setDiscount(event.target.value);
              }}
              required
              fullWidth
            >
              <SelectItem value="1" key={''}>
                10% on product
              </SelectItem>
            </Select>
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Textarea
              label="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              rows={4}
            />
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Input
              type="number"
              label="Product Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              fullWidth
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-end my-4">
          <Button className="bg-gray-400 text-black" size="md">
            Cancel
          </Button>
          <Button type="submit" color="primary" size="md">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
