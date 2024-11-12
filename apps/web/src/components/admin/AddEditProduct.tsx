'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Select, Textarea, Button, SelectItem } from '@nextui-org/react';
import Image from 'next/image';

interface AddEditProductFormProps {
  mode: 'add' | 'edit';
  data?: {
    name: string;
    store: string;
    images: File[];
    discount: string;
    description: string;
    weight: string;
  };
  onSubmit: (product: {
    name: string;
    store: string;
    images: File[];
    discount: string;
    description: string;
    weight: string;
  }) => void;
}

const AddEditProductForm: React.FC<AddEditProductFormProps> = ({ mode, data, onSubmit }) => {
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (mode === 'edit' && data) {
      setName(data.name);
      setStore(data.store);
      setImages(data.images);
      setDiscount(data.discount);
      setDescription(data.description);
      setWeight(data.weight);
      if (data.images) {
        const previews = data.images.map((image) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          return new Promise<string>((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
          });
        });
        Promise.all(previews).then(setImagePreviews);
      }
    }
  }, [mode, data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(files);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });
    Promise.all(previews).then(setImagePreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = { name, store, images, discount, description, weight };
    onSubmit(product);

    router.push('/admin/products');
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleCloseOverlay = () => {
    setCurrentImageIndex(null);
  };

  const handlePrevImage = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex((prevIndex) => (prevIndex! > 0 ? prevIndex! - 1 : imagePreviews.length - 1));
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex((prevIndex) => (prevIndex! < imagePreviews.length - 1 ? prevIndex! + 1 : 0));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 md:gap-2 sm:gap-0">
          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Input
              isClearable
              label="Product Name"
              labelPlacement="outside"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              placeholder="Enter product name"
            />
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Select
              label="Store"
              labelPlacement="outside"
              value={store}
              onChange={(event) => {
                setStore(event.target.value);
              }}
              required
              fullWidth
              placeholder="Select store"
            >
              <SelectItem value="1" key={'1'}>
                Store Jakarta
              </SelectItem>
            </Select>
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Input
              type="file"
              label="Product Images"
              labelPlacement="outside"
              onChange={handleImageChange}
              accept="image/*"
              aria-label="Product Image Upload"
              fullWidth
              multiple
              placeholder="Upload product images"
            />
            {imagePreviews.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <span className="text-lg">Image Previews:</span>
                <div className="flex flex-wrap gap-2">
                  {imagePreviews.map((preview, index) => (
                    <Image
                      key={index}
                      src={preview}
                      alt={`Product Preview ${index + 1}`}
                      width={100}
                      height={100}
                      style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain', cursor: 'pointer' }}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Select
              label="Discount"
              labelPlacement="outside"
              value={discount}
              onChange={(event) => {
                setDiscount(event.target.value);
              }}
              required
              fullWidth
              placeholder="Select discount"
            >
              <SelectItem value="1" key={''}>
                10% on product
              </SelectItem>
            </Select>
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Textarea
              label="Product Description"
              labelPlacement="outside"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              rows={4}
              placeholder="Enter product description"
            />
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Input
              type="number"
              label="Product Weight"
              labelPlacement="outside"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              fullWidth
              placeholder="Enter product weight"
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-end my-4">
          <Button className="bg-gray-200 text-gray-700" size="md">
            Cancel
          </Button>
          <Button type="submit" color="primary" size="md">
            {mode === 'add' ? 'Add Product' : 'Update Product'}
          </Button>
        </div>
      </form>

      {currentImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button onClick={handleCloseOverlay} className="absolute top-4 right-4 text-white text-2xl">
            &times;
          </button>
          <button onClick={handlePrevImage} className="absolute left-4 text-white text-2xl">
            &lt;
          </button>
          <Image
            src={imagePreviews[currentImageIndex]}
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
};

export default AddEditProductForm;
