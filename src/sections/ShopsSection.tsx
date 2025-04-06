import React from "react";
import { motion } from "framer-motion";
import { MdRestaurant as Utensils } from "react-icons/md";
import MapContainer from "../components/MapContainer";
import SearchCards from "../components/SearchCards";
import ShopCard from "../components/ShopCard";
import { Shop, Coordinates } from "../types";

interface ShopsSectionProps {
  mapCenter: Coordinates;
  mapZoom: number;
  filteredShops: Shop[];
  selectedShopId: string | number | null;
  handleSearch: (location?: string) => void;
  handleCardClick: (shop: Shop) => void;
  handleMarkerClick: (shopId: string | number) => void;
  handleMapClick: () => void;
  getGoogleMapsUrl: (shop: Shop) => string;
}

const ShopsSection: React.FC<ShopsSectionProps> = ({
  mapCenter,
  mapZoom,
  filteredShops,
  selectedShopId,
  handleSearch,
  handleCardClick,
  handleMarkerClick,
  handleMapClick,
  getGoogleMapsUrl,
}) => {
  return (
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
            Featured Affiliated Restaurants
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Explore the best restaurants curated for you. Use the search options
            or click on a map marker to get details.
          </p>
        </motion.div>

        {/* Search Section */}
        <section id="search-area" className="py-6 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Side: Search Cards */}
              <div className="col-span-1">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Search Locations
                </h2>
                <SearchCards onSearch={handleSearch} />
              </div>

              {/* Right Side: Google Maps */}
              <div className="col-span-2">
                <motion.div
                  id="shops-map"
                  className="rounded-lg overflow-hidden shadow-xl border border-gray-200 h-[500px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  {import.meta.env.VITE_Maps_API_KEY ? (
                    <MapContainer
                      apiKey={import.meta.env.VITE_Maps_API_KEY}
                      libraries={["places"]}
                      center={mapCenter}
                      zoom={mapZoom}
                      shops={filteredShops}
                      selectedShopId={selectedShopId}
                      onMarkerClick={handleMarkerClick}
                      onMapClick={handleMapClick}
                      getGoogleMapsUrl={getGoogleMapsUrl}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg">
                      Map requires VITE_Maps_API_KEY to be set in your .env
                      file.
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Title for Cards */}
        <motion.div
          className="flex flex-col items-center justify-center my-16 px-4 py-8 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center space-x-2">
            <Utensils className="w-6 h-6 text-red-600" />
            <span>All Restaurants and Shops</span>
          </h3>
          <div className="w-24 h-1 bg-red-600 rounded-full"></div>
        </motion.div>

        {/* Shop Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop, index) => (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                layout
              >
                <ShopCard
                  shop={shop}
                  onClick={handleCardClick}
                  isSelected={selectedShopId === shop.id}
                  getGoogleMapsUrl={getGoogleMapsUrl}
                />
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-600 text-lg py-8"
            >
              No affiliated shops found matching your current search or filter.
              Try searching "NIT Raipur" or clearing the search.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopsSection;
