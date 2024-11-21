/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Button, Select, SelectItem } from '@nextui-org/react';
// import Image from 'next/image';
import { Category, Product } from '@/types/types';
import { toastFailed, toastSuccess } from '@/utils/toastHelper';
import { createProduct, updateProduct } from '@/api/product.api';
import { fetchCategories } from '@/api/category.api';

interface AddEditProductFormProps {
  mode: 'add' | 'edit';
  data?: Product;
}

const AddEditProductForm: React.FC<AddEditProductFormProps> = ({ mode, data }) => {
  const [name, setName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const router = useRouter();
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    price?: string;
    weight?: string;
    categoryId?: string;
  }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Set<string>>(new Set());

  useEffect(() => {
    setErrors({});
    const getCategories = async () => {
      const response = await fetchCategories({ page: 1, pageSize: 100 });
      const categoriesResponse = response.categories.map((category: any) => {
        return {
          ...category,
          id: String(category.id)
        };
      });
      setCategories(categoriesResponse);
    };

    getCategories();
  }, []);

  useEffect(() => {
    setErrors({});
    if (mode === 'edit' && data) {
      setName(data.productName ?? '');
      setDescription(data.desc ?? '');
      setWeight(data.weight ?? 0);
      setPrice(data.price ?? 0);
      setSelectedCategory(data?.category?.id ? new Set([String(data?.category?.id)]) : new Set());
      if (data.imageUrls) {
        let baseImagePath = `${process.env.NEXT_PUBLIC_IMAGE_API_URL}`;

        const imageUrlsAsArray = data.imageUrls.split(',');
        const imageUrlsAsArrayRender = imageUrlsAsArray.map((val) => {
          return `${baseImagePath}${val}`;
        });
        setImagePreviews(imageUrlsAsArrayRender);
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

  const validateForm = () => {
    const newErrors = {} as {
      name?: string;
      description?: string;
      price?: string;
      weight?: string;
      categoryId?: string;
    };
    if (!name) newErrors.name = 'This field is required';
    if (!description) newErrors.description = 'This field is required';
    if (!price) newErrors.price = 'This field is required';
    if (!weight) newErrors.weight = 'This field is required';
    if (!Array.from(selectedCategory)[0]) newErrors.categoryId = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      //upload image
      if (images?.length > 0) {
        try {
          const formData = new FormData();
          images.forEach((file) => formData.append('images', file));

          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product/upload-images`, {
            method: 'POST',
            body: formData
          });

          const result = await response.json();
          let imageUrls = result.files.join(',');
          if (data?.imageUrls && data?.imageUrls.split(',')?.length > 0) {
            const allImageUrls = data?.imageUrls.split(',').concat(result.files);
            imageUrls = allImageUrls.join(',');
          }

          if (data?.id && mode == 'edit') {
            //edit
            try {
              await updateProduct(data?.id, {
                productName: name,
                desc: description,
                price: Number(price),
                weight: Number(weight),
                imageUrls: imageUrls,
                categoryId: Number(Array.from(selectedCategory)[0])
              });
              toastSuccess('Updated product successfully');
              router.push('/admin/products');
            } catch (err) {
              toastFailed('Failed to update product');
            }
          } else {
            //add
            try {
              await createProduct({
                productName: name,
                desc: description,
                price: Number(price),
                weight: Number(weight),
                imageUrls,
                categoryId: Number(Array.from(selectedCategory)[0])
              });
              toastSuccess('Created product successfully');
              router.push('/admin/products');
            } catch (err) {
              toastFailed('Failed to create product');
            }
          }
        } catch (err) {
          toastFailed(`Failed to ${mode} product`);
        }
      } else {
        if (data?.id && mode == 'edit') {
          //edit
          try {
            await updateProduct(data?.id, {
              productName: name,
              desc: description,
              price: Number(price),
              weight: Number(weight),
              categoryId: Number(Array.from(selectedCategory)[0])
            });
            toastSuccess('Updated product successfully');
            router.push('/admin/products');
          } catch (err) {
            toastFailed('Failed to update product');
          }
        } else {
          //add
          try {
            await createProduct({
              productName: name,
              desc: description,
              price: Number(price),
              weight: Number(weight),
              categoryId: Number(Array.from(selectedCategory)[0])
            });
            toastSuccess('Created product successfully');
            router.push('/admin/products');
          } catch (err) {
            toastFailed('Failed to create product');
          }
        }
      }
    }
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
              fullWidth
              errorMessage={errors.name}
              isInvalid={errors.name ? true : false}
              placeholder="Enter product name"
            />
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Select
              fullWidth
              label="Category"
              selectedKeys={selectedCategory}
              onSelectionChange={(e) => {
                setSelectedCategory(new Set([String(e.currentKey)]));
              }}
              errorMessage={errors.categoryId}
              isInvalid={errors.categoryId ? true : false}
            >
              {categories.map((category) => (
                <SelectItem key={category.id} textValue={category.name} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
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
                  {imagePreviews.map((preview, index) => {
                    let baseImagePath = `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/`;
                    let imagePath = preview;
                    if (preview.startsWith('/')) {
                      imagePath = baseImagePath + preview;
                    }
                    return (
                      <img
                        key={index}
                        src={imagePath}
                        alt={`Product Preview ${index + 1}`}
                        width={100}
                        height={100}
                        style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain', cursor: 'pointer' }}
                        onClick={() => handleImageClick(index)}
                      />
                    );
                  })}
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
              errorMessage={errors.description}
              isInvalid={errors.description ? true : false}
              fullWidth
              rows={4}
              placeholder="Enter product description"
            />
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Input
              type="number"
              errorMessage={errors.weight}
              isInvalid={errors.weight ? true : false}
              label="Product Price"
              startContent="Rp. "
              labelPlacement="outside"
              value={String(price)}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              fullWidth
              placeholder="Enter product price"
            />
          </div>

          <div className="md:col-span-6 sm:col-span-12 mb-3">
            <Input
              type="number"
              errorMessage={errors.weight}
              isInvalid={errors.weight ? true : false}
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
