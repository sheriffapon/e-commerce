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

const productsData: Omit<Product, 'images'>[] = [
  {
    id: '1',
    name: 'Minimalist Trench Coat',
    price: 320.0,
    category: 'Coats',
    sizes: ['S', 'M', 'L'],
    description: 'A timeless beige trench coat made from water-resistant cotton gabardine. Features a classic double-breasted silhouette, a belted waist, and horn buttons. Perfect for transitional weather.',
    imageIds: ['product-1-front', 'product-1-back', 'product-1-detail'],
  },
  {
    id: '2',
    name: 'Classic Silk Blouse',
    price: 180.0,
    category: 'Tops',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'An elegant black blouse crafted from pure silk. It has a relaxed fit, a concealed button placket, and long sleeves with buttoned cuffs. A versatile wardrobe staple.',
    imageIds: ['product-2-front', 'product-2-detail'],
  },
  {
    id: '3',
    name: 'Linen Wide-Leg Trousers',
    price: 150.0,
    category: 'Trousers',
    sizes: ['S', 'M', 'L'],
    description: 'Effortlessly chic white trousers made from breathable linen. Designed with a high-rise waist and a fluid, wide-leg cut for a comfortable yet polished look.',
    imageIds: ['product-3-front'],
  },
  {
    id: '4',
    name: 'Structured Navy Blazer',
    price: 280.0,
    category: 'Blazers',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A sharply tailored blazer in a deep navy hue. Made from a premium wool blend, it features peak lapels, a single-button fastening, and flap pockets. Fully lined.',
    imageIds: ['product-4-front'],
  },
  {
    id: '5',
    name: 'Satin Slip Dress',
    price: 210.0,
    category: 'Dresses',
    sizes: ['XS', 'S', 'M'],
    description: 'A luxurious slip dress in a soft gold satin. Cut on the bias for a beautiful drape, it features a V-neckline, adjustable spaghetti straps, and a midi-length hem.',
    imageIds: ['product-5-front'],
  },
  {
    id: '6',
    name: 'Cashmere Crewneck Sweater',
    price: 250.0,
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'An exceptionally soft crewneck sweater knitted from the finest Mongolian cashmere. This cream-colored piece has a relaxed fit, ribbed trims, and timeless appeal.',
    imageIds: ['product-6-front'],
  },
  {
    id: '7',
    name: 'High-Waisted Wool Trousers',
    price: 190.0,
    category: 'Trousers',
    sizes: ['S', 'M', 'L'],
    description: 'Sophisticated charcoal trousers tailored from Italian wool. They sit high on the waist and fall to a straight-leg silhouette, finished with neat pressed creases.',
    imageIds: ['product-7-front'],
  },
  {
    id: '8',
    name: 'Elegant Evening Gown',
    price: 450.0,
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A show-stopping evening gown in black. This floor-length dress features an asymmetric neckline, a fitted bodice, and a column skirt that elegantly drapes to the floor.',
    imageIds: ['product-8-front'],
  },
  {
    id: '9',
    name: "Men's Oxford Shirt",
    price: 95.0,
    category: "Men's",
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A classic Oxford shirt in crisp white cotton. A versatile staple for any man\'s wardrobe, perfect for both casual and formal occasions.',
    imageIds: ['product-9-front'],
  },
  {
    id: '10',
    name: "Men's Slim-Fit Jeans",
    price: 120.0,
    category: "Men's",
    sizes: ['30', '32', '34', '36'],
    description: 'Modern slim-fit jeans in a versatile dark wash. Made with a hint of stretch for comfort and style.',
    imageIds: ['product-10-front'],
  },
  {
    id: '11',
    name: 'Floral Midi Dress',
    price: 160.0,
    category: "Women's",
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A beautiful midi dress with a vibrant floral print. Features a flattering A-line silhouette and a cinched waist.',
    imageIds: ['product-11-front'],
  },
  {
    id: '12',
    name: "Men's Wool Overcoat",
    price: 350.0,
    category: "Men's",
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Exuding timeless sophistication, this meticulously crafted overcoat is tailored from a premium, heavyweight wool blend for exceptional warmth and a structured drape. It features a classic notched lapel, a clean single-breasted front, and a smooth, fully-lined interior for effortless layering. A versatile masterpiece for the modern gentleman\'s winter wardrobe.',
    imageIds: ['product-12-front'],
  },
];

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
  return products.find(p => p.id === id);
}

export const getRelatedProducts = (productId: string): Product[] => {
    const product = getProductById(productId);
    if (!product) return [];

    return products.filter(p => p.category === product.category && p.id !== productId).slice(0, 4);
}

export const getProductCategories = (): string[] => {
  return [...new Set(products.map(p => p.category))];
}
