export type CategoryType =
  | "All"
  | "Continental"
  | "Chinese"
  | "North Indian"
  | "Pizza"
  | "Burger"
  | "Pasta"
  | "Seafood"
  | "Rice Bowls"
  | "Mocktails"
  | "Milkshakes"
  | "Desserts"
  | "Salads";

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  description: string;
  image: string;
  isVeg: boolean;
  isBestSeller?: boolean;
  isChefSpecial?: boolean;
  rating: number;
  prepTime: string;
  calories?: string;
  spiceLevel?: 1 | 2 | 3; // 1 = mild, 2 = medium, 3 = hot
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  dishRecommended?: string;
  verified: boolean;
}

export interface DailyOffer {
  day: string;
  title: string;
  tagline: string;
  discount: string;
  code: string;
  iconName: string;
  description: string;
  bannerImage: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Rooftop" | "Food" | "Mocktails" | "Events";
  image: string;
  description: string;
}

export interface CelebrationPackage {
  id: string;
  title: string;
  subtitle: string;
  capacity: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  recommendations?: string[];
}
