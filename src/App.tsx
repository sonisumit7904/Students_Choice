import { useState, useEffect, useCallback } from "react"; // Import useCallback
// --- Components & Data Imports ---

import AnimatedFoodBackground from "./components/AnimatedFoodBackground";
import Footer from "./sections/Footer"; // Import Footer component
import allShopsData from "./data/affiliatedShops.json";
import testimonials from "./data/testimonials.json"; // Assuming this is a JSON file with testimonial data
import { Analytics } from "@vercel/analytics/react";
import { Coordinates, KnownLocation, Shop } from "./types";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import WhatWeDoSection from "./sections/WhatWeDoSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import ContactSection from "./sections/ContactSection";
import ShopsSection from "./sections/ShopsSection";

const typedShopsData: Shop[] = allShopsData;

const knownLocations: Record<string, KnownLocation> = {
  "nit raipur": {
    lat: 21.2497222,
    lng: 81.6024542,
    tag: "nit_raipur",
    zoom: 15,
  },
  aiims: { lat: 21.2584627, lng: 81.5785734, tag: "aiims", zoom: 15 },
  "raipur default": { lat: 21.2514, lng: 81.6296, tag: null, zoom: 13 },
};

function App(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFoodAnimationsEnabled, setIsFoodAnimationsEnabled] =
    useState<boolean>(true);
  const [mapCenter, setMapCenter] = useState<Coordinates>(
    knownLocations["raipur default"],
  );
  const [mapZoom, setMapZoom] = useState<number>(
    knownLocations["raipur default"].zoom,
  );
  const [filteredShops, setFilteredShops] = useState<Shop[]>(typedShopsData); // Initialize with all shops
  const [selectedShopId, setSelectedShopId] = useState<string | number | null>(
    null,
  ); // <-- State for selected shop ID

  useEffect(() => {
    // Initial setup - already done correctly
    setFilteredShops(typedShopsData);
    setMapCenter(knownLocations["raipur default"]);
    setMapZoom(knownLocations["raipur default"].zoom);
  }, []);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Updated Search Handler ---
  const handleSearch = (location?: string): void => {
    const searchTerm = location
      ? location.toLowerCase().trim()
      : searchQuery.toLowerCase().trim();
    const foundLocation = knownLocations[searchTerm];

    setSelectedShopId(null); // Clear selection on new search

    if (foundLocation) {
      console.log("Found location:", foundLocation);
      setMapCenter({ lat: foundLocation.lat, lng: foundLocation.lng });
      setMapZoom(foundLocation.zoom);
    } else {
      console.warn("Location not predefined:", searchTerm);
      setMapCenter(knownLocations["raipur default"]);
      setMapZoom(knownLocations["raipur default"].zoom);
      alert(
        `Location "${searchTerm}" not recognized. Centering map to default location.`,
      );
    }
  };

  // --- Updated Card Click Handler ---
  const handleCardClick = useCallback(
    (shop: Shop): void => {
      const newSelectedId = selectedShopId === shop.id ? null : shop.id; // Toggle selection
      setSelectedShopId(newSelectedId);
      setMapCenter({ lat: shop.latitude, lng: shop.longitude });
      setMapZoom(17); // Zoom in closer when a specific shop is selected

      // Optional: Scroll map into view if not already visible
      const mapElement = document.getElementById("search-area");
      if (mapElement && newSelectedId) {
        // Only scroll if selecting
        mapElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    },
    [selectedShopId],
  ); // Dependency array includes selectedShopId for toggling logic

  // --- Handler for Marker Click (passed to MapContainer) ---
  const handleMarkerClick = useCallback(
    (shopId: string | number): void => {
      const shop = typedShopsData.find((s) => s.id === shopId);
      if (shop) {
        // Reuse card click logic for consistency (toggle, center, zoom)
        handleCardClick(shop);
      }
    },
    [handleCardClick],
  ); // handleCardClick is memoized with useCallback

  // --- Handler for Clicking the Map Background (Deselection) ---
  const handleMapClick = useCallback((): void => {
    setSelectedShopId(null); // Deselect shop when map background is clicked
  }, []);

  // --- Generate Google Maps URL ---
  const getGoogleMapsUrl = (shop: Shop): string => {
    // Prioritize Lat/Lng for accuracy
    // return `https://www.google.com/maps/search/?api=1&query=${shop.latitude},${shop.longitude}`;
    // Or use Directions API for routing from an unspecified start point
    return `https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`;
    // Or use Name + Address (less reliable for precise location pin)
    // return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ', ' + shop.address)}`;
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <AnimatedFoodBackground count={12} enabled={isFoodAnimationsEnabled} />
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <HeroSection />
      <WhatWeDoSection />

      <ShopsSection
        mapCenter={mapCenter}
        mapZoom={mapZoom}
        filteredShops={filteredShops}
        selectedShopId={selectedShopId}
        handleSearch={handleSearch}
        handleCardClick={handleCardClick}
        handleMarkerClick={handleMarkerClick}
        handleMapClick={handleMapClick}
        getGoogleMapsUrl={getGoogleMapsUrl}
      />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
