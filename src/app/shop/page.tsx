'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import {
  getProducts,
  getProductCategories,
  type Product,
} from '@/lib/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useNewProduct } from '@/context/new-product-context';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState('newest');

  const { newProducts } = useNewProduct();
  const allProducts = useMemo(() => [...getProducts(), ...newProducts], [newProducts]);
  const categories = useMemo(() => ['all', ...getProductCategories()], []);
  const backgroundImage = PlaceHolderImages.find(
    (img) => img.id === 'background-shop'
  );

  const filteredProducts = useMemo(() => {
    let products =
      selectedCategory.toLowerCase() === 'all'
        ? allProducts
        : allProducts.filter(
            (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
          );

    return products.sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
        default:
          // Adjust sorting to handle both string and number IDs
          const aId = a.id.startsWith('new-') ? parseInt(a.id.split('-')[1]) : parseInt(a.id);
          const bId = b.id.startsWith('new-') ? parseInt(b.id.split('-')[1]) : parseInt(b.id);
          if (a.id.startsWith('new-') && !b.id.startsWith('new-')) return -1;
          if (!a.id.startsWith('new-') && b.id.startsWith('new-')) return 1;
          return bId - aId;
      }
    });
  }, [selectedCategory, sortOrder, allProducts]);

  return (
    <div className="relative">
      {backgroundImage && (
        <Image
          src={backgroundImage.imageUrl}
          alt={backgroundImage.description}
          fill
          className="z-[-1] object-cover blur-sm"
          data-ai-hint={backgroundImage.imageHint}
        />
      )}
      <div className="container mx-auto max-w-7xl bg-background/80 px-4 py-8 backdrop-blur-sm sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            Our Collection
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover pieces designed to last, in style and substance.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <label htmlFor="category" className="text-sm font-medium">
              Filter:
            </label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger id="category" className="w-[180px] capitalize">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category.toLowerCase()}
                    className="capitalize"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="sort" className="text-sm font-medium">
              Sort by:
            </label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger id="sort" className="w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className="mb-8" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-6">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPageContent />
    </Suspense>
  );
}
