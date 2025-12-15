export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  isPopular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  email: string;
  role: 'admin' | 'user';
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}