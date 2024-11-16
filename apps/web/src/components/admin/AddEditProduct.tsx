/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Button } from '@nextui-org/react';
// import Image from 'next/image';
import { Product } from '@/data/dummyData';

interface AddEditProductFormProps {
  mode: 'add' | 'edit';
  data?: Product;
  onSubmit: (product: Product) => void;
}

const AddEditProductForm: React.FC<AddEditProductFormProps> = ({ mode, data, onSubmit }) => {
  const [name, setName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState(0);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (mode === 'edit' && data) {
      setName(data.productName ?? '');
      // setImages(data.imageUrls ?? []);
      setDescription(data.desc ?? '');
      setWeight(data.weight ?? 0);
      if (data.imageUrls) {
        setImagePreviews(data.imageUrls);
        // const previews = data.images.map((image) => {
        //   const reader = new FileReader();
        //   reader.readAsDataURL(image);
        //   return new Promise<string>((resolve) => {
        //     reader.onloadend = () => {
        //       resolve(reader.result as string);
        //     };
        //   });
        // });
        // Promise.all(previews).then(setImagePreviews);
      }
    }
  }, [mode, data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages((prevImages) => [...prevImages, ...files]);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });
    Promise.all(previews).then((newPreviews) => {
      setImagePreviews((prevPreviews) => {
        const uniquePreviews = newPreviews.filter((preview) => !prevPreviews.includes(preview));
        return [...prevPreviews, ...uniquePreviews];
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = { name, images, description, weight };
    product.weight = product.weight;
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
                    <img
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
              value={String(weight)}
              onChange={(e) => setWeight(Number(e.target.value))}
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
          <img
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
