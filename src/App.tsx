import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import { motion } from "framer-motion";
import {
  Menu,
  X,
  GraduationCap,
  Utensils,
  MapPin,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MapPinned,
  Clock,
  Search,
  Filter,
  TrendingUp,
  ExternalLink, // <-- Add ExternalLink
} from "lucide-react";

// --- Components & Data Imports ---
import MapContainer from "./components/MapContainer";
import ShopCard from "./components/ShopCard";
import AnimatedFoodBackground from "./components/AnimatedFoodBackground";
import TestimonialCarousel from "./components/TestimonialCarousel";
import allShopsData from "./data/affiliatedShops.json";
import testimonials from "./data/testimonials.json"; // Assuming this is a JSON file with testimonial data
import { Analytics } from "@vercel/analytics/react";
import { Coordinates, KnownLocation, Shop, Testimonial } from "./types";

// Import your floating food images - MAKE SURE YOU HAVE THESE IMAGES
import burgerImg from "../public/android-chrome-512x512.png"; // Adjust path
import momosImg from "../public/android-chrome-512x512.png"; // Adjust path
import pizzaImg from "../public/android-chrome-512x512.png"; // Adjust path
import tomatoImg from "../public/android-chrome-512x512.png"; // Adjust path
import basilImg from "../public/android-chrome-512x512.png"; // Adjust path

const typedShopsData: Shop[] = allShopsData;

const knownLocations: Record<string, KnownLocation> = {
  "nit raipur": { lat: 21.2497, lng: 81.605, tag: "nit_raipur", zoom: 15 },
  aiims: { lat: 21.2288, lng: 81.6325, tag: "aiims", zoom: 15 },
  "raipur default": { lat: 21.2514, lng: 81.6296, tag: null, zoom: 13 },
};

// Define libraries outside the component for performance (addressing the warning)
const googleMapsLibraries: "places"[] = ["places"];

function App(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFoodAnimationsEnabled, setIsFoodAnimationsEnabled] =
    useState<boolean>(true);
  const [mapCenter, setMapCenter] = useState<Coordinates>(
    knownLocations["raipur default"]
  );
  const [mapZoom, setMapZoom] = useState<number>(
    knownLocations["raipur default"].zoom
  );
  const [filteredShops, setFilteredShops] = useState<Shop[]>(typedShopsData); // Initialize with all shops
  const [selectedShopId, setSelectedShopId] = useState<string | number | null>(
    null
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
  const handleSearch = (): void => {
    const searchTerm = searchQuery.toLowerCase().trim();
    const location = knownLocations[searchTerm];

    setSelectedShopId(null); // <-- Clear selection on new search

    if (location) {
      console.log("Found location:", location);
      setMapCenter({ lat: location.lat, lng: location.lng });
      setMapZoom(location.zoom);
      if (location.tag) {
        setFilteredShops(
          typedShopsData.filter(
            (shop) => shop.tags && shop.tags.includes(location.tag as string)
          )
        );
      } else {
        setFilteredShops(typedShopsData);
      }
    } else {
      console.warn("Location not predefined:", searchTerm);
      setFilteredShops(typedShopsData); // Show all if search term not found
      setMapCenter(knownLocations["raipur default"]);
      setMapZoom(knownLocations["raipur default"].zoom);
      alert(
        `Location "${searchTerm}" not recognized or no specific tag found. Showing all affiliated shops.`
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
      const mapElement = document.getElementById("shops-map");
      if (mapElement && newSelectedId) {
        // Only scroll if selecting
        mapElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    },
    [selectedShopId]
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
    [handleCardClick]
  ); // handleCardClick is memoized with useCallback

  // --- Handler for Clicking the Map Background (Deselection) ---
  const handleMapClick = useCallback((): void => {
    setSelectedShopId(null); // Deselect shop when map background is clicked
  }, []);

  // --- Typed Event Handlers (no changes needed) ---
  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(e.target.value);
  };

  const handleSearchInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
      {/* Floating Food Items - Positioned Absolutely */}
      <img
        src={burgerImg}
        alt="Burger"
        className="absolute w-32 md:w-48 lg:w-64 top-1/2 left-4 md:left-10 lg:left-20 transform -translate-y-1/2 animate-float opacity-90"
        style={{ animationDelay: "0s", zIndex: 1000 }}
      />
      <img
        src={momosImg}
        alt="Momos"
        className="absolute w-24 md:w-32 lg:w-40 top-10 right-4 md:right-10 lg:right-20 animate-float opacity-90"
        style={{ animationDelay: "1s", zIndex: 1000 }}
      />
      <img
        src={pizzaImg}
        alt="Pizza Slice"
        className="absolute w-28 md:w-36 lg:w-44 bottom-10 right-10 md:right-20 lg:right-40 animate-float opacity-90"
        style={{ animationDelay: "0.5s", zIndex: 1000 }}
      />
      <img
        src={tomatoImg}
        alt="Tomato"
        className="absolute w-8 md:w-10 bottom-20 left-10 md:left-32 animate-float opacity-80"
        style={{ animationDelay: "1.5s", zIndex: 1000 }}
      />
      <img
        src={basilImg}
        alt="Basil leaf"
        className="absolute w-6 md:w-8 top-20 left-1/3 animate-float opacity-80"
        style={{ animationDelay: "2s", zIndex: 1000 }}
      />
      <img
        src={tomatoImg}
        alt="Tomato Slice"
        className="absolute w-6 md:w-8 bottom-1/2 right-1/4 animate-float opacity-80"
        style={{ animationDelay: "2.5s", zIndex: 1000 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-effect shadow-sm z-50">
        {/* ... existing nav code ... */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-red-500 font-bold text-xl">
                Student's Choice
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#home"
                  className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <a
                  href="#what-we-do"
                  className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  What We Do
                </a>
                <a
                  href="#shops"
                  className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Find Shops
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#home"
                className="text-gray-600 hover:bg-gray-50 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Home
              </a>
              <a
                href="#what-we-do"
                className="text-gray-600 hover:bg-gray-50 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                What We Do
              </a>
              <a
                href="#shops"
                className="text-gray-600 hover:bg-gray-50 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Find Shops
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:bg-gray-50 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:bg-gray-50 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-24 md:pt-32 pb-16 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">
                Unlock Exclusive{" "}
                <span className="text-red-600">Student Discounts</span>
              </span>{" "}
              <span className="block text-orange-500 xl:inline">
                at Your Favorite Eateries
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Student's Choice partners with local restaurants near NIT Raipur,
              AIIMS, and more to bring you unbeatable deals. Show your ID, save
              money, eat well!
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#shops"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105"
                >
                  Find Discounts Now <Utensils className="ml-2 h-5 w-5" />
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#what-we-do"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Optional: Add subtle background elements */}
        {/* <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-red-200 rounded-full opacity-30"></div>
          <div className="absolute bottom-0 left-0 -mb-24 -ml-12 w-80 h-80 bg-orange-200 rounded-full opacity-30"></div> */}
      </section>

      {/* Search Section */}
      <section
        id="search-area"
        className="py-6 bg-white sticky top-[63px] md:top-16 z-40 shadow-md"
      >
        {" "}
        {/* Adjusted top value */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center space-x-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
              placeholder="Search area (e.g., NIT Raipur, AIIMS)..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchInputKeyPress}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors shadow-sm font-medium"
            >
              Search
            </button>
            {/* Optional Filter Button - Future Feature */}
            {/* <button className="p-3 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors">
                 <Filter className="h-5 w-5" />
             </button> */}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple Savings for Smart Students
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We connect students with local restaurants offering exclusive
              discounts. Just follow these easy steps.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative p-6 bg-gray-50 rounded-lg shadow-sm transition-shadow hover:shadow-md"
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                    <MapPin className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    1. Find Nearby Shops
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Use our map or search by area (like NIT Raipur or AIIMS) to
                  discover affiliated restaurants near you.
                </dd>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative p-6 bg-gray-50 rounded-lg shadow-sm transition-shadow hover:shadow-md"
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    2. Show Your Student ID
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Visit the restaurant and present your valid student
                  identification card before ordering or paying.
                </dd>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative p-6 bg-gray-50 rounded-lg shadow-sm transition-shadow hover:shadow-md"
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-amber-500 text-white">
                    <Utensils className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    3. Enjoy Your Discount!
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Savor delicious food at a discounted price. It's that simple
                  to save money while exploring local tastes.
                </dd>
              </motion.div>
            </dl>
          </div>
        </div>
      </section>

      {/* Shops Section */}
      <section
        id="shops"
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Discover Affiliated Restaurants
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Find great deals near your campus or area. Click a card or marker
              for details.
            </p>
          </motion.div>

          {/* Map Container - Pass new props */}
          <motion.div
            id="shops-map"
            className="mb-16 rounded-lg overflow-hidden shadow-xl border border-gray-200" // Added border
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {import.meta.env.VITE_Maps_API_KEY ? (
              <MapContainer
                apiKey={import.meta.env.VITE_Maps_API_KEY} // Pass API key directly
                libraries={googleMapsLibraries} // Pass constant libraries array
                center={mapCenter}
                zoom={mapZoom}
                shops={filteredShops}
                selectedShopId={selectedShopId} // <-- Pass selected ID
                onMarkerClick={handleMarkerClick} // <-- Pass marker click handler
                onMapClick={handleMapClick} // <-- Pass map click handler
                getGoogleMapsUrl={getGoogleMapsUrl} // <-- Pass URL generator
              />
            ) : (
              <div className="h-96 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg">
                Map requires VITE_Maps_API_KEY to be set in your .env file.
              </div>
            )}
          </motion.div>

          {/* Section Title for Cards (Optional) */}
          <motion.h3
            className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Utensils className="w-6 h-6 text-red-500" /> Shop List
          </motion.h3>

          {/* Shop Cards List - Pass new props */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShops.length > 0 ? (
              filteredShops.map((shop, index) => (
                <motion.div
                  key={shop.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }} // Slightly faster delay
                  // Add layout animation for smooth transitions when list changes
                  layout
                >
                  <ShopCard
                    shop={shop}
                    onClick={handleCardClick}
                    isSelected={selectedShopId === shop.id} // <-- Pass isSelected boolean
                    getGoogleMapsUrl={getGoogleMapsUrl} // <-- Pass URL generator
                  />
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-gray-600 text-lg py-8"
              >
                No affiliated shops found matching your current search or
                filter. Try searching "NIT Raipur" or clearing the search.
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Students Are Saying
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Hear from fellow students who love saving with Student's Choice.
            </p>
          </motion.div>
          <div className="mt-16">
            <TestimonialCarousel
              testimonials={testimonials}
              autoPlayInterval={5000}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-t from-gray-100 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Get In Touch
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Have questions, suggestions, or want to partner with us? Reach
              out!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0">
                  <Phone className="h-8 w-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                  <p className="mt-1 text-gray-600">
                    Have an urgent question? Give us a ring.
                  </p>
                  <a
                    href="tel:+919028891008"
                    className="mt-2 inline-block text-red-600 hover:text-red-800 font-semibold"
                  >
                    +91 90288 91008
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0">
                  <Mail className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Email Us
                  </h3>
                  <p className="mt-1 text-gray-600">
                    For inquiries or partnership details, drop us an email.
                  </p>
                  <a
                    href="mailto:studentschoice@gmail.com"
                    className="mt-2 inline-block text-orange-600 hover:text-orange-800 font-semibold"
                  >
                    studentschoice11@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0">
                  <MapPinned className="h-8 w-8 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Our Base
                  </h3>
                  <p className="mt-1 text-gray-600">
                    While we operate digitally, our roots are in Raipur.
                  </p>
                  <p className="mt-2 text-gray-700 font-medium">
                    Raipur, Chhattisgarh, India
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Optional: Add a simple contact form here later */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-xl border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send a Message (Coming Soon)
              </h3>
              <form action="#" method="POST" className="space-y-6">
                {/* Form fields (disabled for now) */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none sm:text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none sm:text-sm"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 cursor-not-allowed"
                  >
                    Send Message (Feature disabled)
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold text-white mb-3">
                Student's Choice
              </h3>
              <p className="text-sm">
                Connecting students with unbeatable food deals in Raipur.
              </p>
              {/* Optional: Add social media icons later */}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-md font-semibold text-gray-200 mb-3 uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#what-we-do"
                    className="hover:text-white transition-colors text-sm"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#shops"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Find Shops
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-md font-semibold text-gray-200 mb-3 uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2">
                {/* Add links later if needed */}
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy (TBD)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Terms of Service (TBD)
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Footer */}
            <div>
              <h4 className="text-md font-semibold text-gray-200 mb-3 uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-red-400" /> +91 90288
                  91008
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-orange-400" />{" "}
                  studentschoice11@gmail.com
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-amber-400" /> Raipur,
                  Chhattisgarh
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            {new Date().getFullYear()} Student's Choice. All rights reserved.
            Designed to help students save.
          </div>
        </div>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;
