export interface Category {
  id: string;
  name: string;
}

export interface Variation {
  id: string | number;
  name: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  stock: number;
  image_url?: string;
  category_id?: string;
  description?: string;
  variations?: Variation[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariation?: Variation;
}
