// src/types.ts

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface KnownLocation extends Coordinates {
  tag: string | null;
  zoom: number;
}

// Interface for your shop data
export interface Shop {
  id: string | number; // Use string or number depending on your data
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  discount: string;
  offers: string[];
  tags?: string[]; // Optional: Area/Cuisine tags
  // Add other optional fields used in your App/ShopCard
  image?: string;
  cuisine?: string;
  rating?: number;
  deliveryTime?: string;
  priceForTwo?: string;
  trending?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  university: string;
  comment: string;
  image: string;
}

// Props for MapContainer component
export interface MapContainerProps {
  apiKey: string;
  libraries: "places"[]; // Be specific with library names
  center: Coordinates;
  zoom: number;
  shops: Shop[];
  selectedShopId: string | number | null; // ID of the currently selected shop
  onMarkerClick: (shopId: string | number) => void; // Callback when a marker is clicked
  onMapClick: () => void; // Callback when the map background is clicked
  getGoogleMapsUrl: (shop: Shop) => string; // Function to get GMaps URL
}

// Props for ShopCard component
export interface ShopCardProps {
  shop: Shop;
  onClick: (shop: Shop) => void;
  isSelected: boolean; // <-- New prop for selection state
  getGoogleMapsUrl: (shop: Shop) => string; // <-- New prop for URL generator
}

// Props for TestimonialCarousel
export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export interface Testimonial {
  // id: number;
  name: string;
  university: string;
  comment: string;
  image: string;
}

// Props for AnimatedFoodBackground
export interface AnimatedFoodBackgroundProps {
  count: number;
  enabled: boolean;
}
