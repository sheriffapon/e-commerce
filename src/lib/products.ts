import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: 'Coats' | 'Dresses' | 'Trousers' | 'Tops' | 'Sweaters' | 'Blazers' | "Men's" | "Women's";
  sizes: string[];
  description: string;
  imageIds: string[];
  images: ImagePlaceholder[];
};

const productsData: Omit<Product, 'images'>[] = [];

const products: Product[] = productsData.map(p => ({
  ...p,
  images: p.imageIds.map(id => PlaceHolderImages.find(img => img.id === id)).filter((img): img is ImagePlaceholder => !!img),
}));

export const getProducts = (filters?: { category?: string }): Product[] => {
  if (filters?.category) {
    return products.filter(p => p.category.toLowerCase() === filters.category?.toLowerCase());
  }
  return products;
}

export const getProductById = (id: string): Product | undefined => {
  // We need to check both the static products and the dynamically added ones.
  const allProducts = getProducts();
  return allProducts.find(p => p.id === id);
}

export const getRelatedProducts = (productId: string): Product[] => {
    const product = getProductById(productId);
    if (!product) return [];

    return products.filter(p => p.category === product.category && p.id !== productId).slice(0, 4);
}

export const getProductCategories = (): string[] => {
  const staticCategories = ['Coats', 'Dresses', 'Trousers', 'Tops', 'Sweaters', 'Blazers', "Men's", "Women's"];
  const productCategories = [...new Set(products.map(p => p.category))];
  const allCategories = [...new Set([...staticCategories, ...productCategories])];
  return allCategories;
}
