import React from "react";
import { motion } from "framer-motion";
import { Star, Tag, Clock, ExternalLink } from "lucide-react"; // <-- Added ExternalLink
import { Shop, ShopCardProps } from "../types";

// Fallback image if shop.image is not provided
const placeholderImage = (
  name: string,
  color: string = "FFC107",
  textColor: string = "000000"
) =>
  `https://via.placeholder.com/300x200/${color}/${textColor}?Text=${encodeURIComponent(
    name
  )}`;

const ShopCard: React.FC<ShopCardProps> = ({
  shop,
  onClick,
  isSelected,
  getGoogleMapsUrl,
}) => {
  // Construct Google Maps URL
  const mapsUrl = getGoogleMapsUrl(shop);

  // Define the placeholder function result outside for reuse
  const placeholderUrl = placeholderImage(shop.name, "CCCCCC", "555555");
  const imageUrl = shop.image || placeholderImage(shop.name); // Initial URL

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    // Check if the source that failed is DIFFERENT from the placeholder we are about to set
    if (e.currentTarget.src !== placeholderUrl) {
      console.warn(
        `Image failed to load: ${e.currentTarget.src}. Falling back to placeholder.`
      );
      e.currentTarget.src = placeholderUrl;
    } else {
      // Optional: Log if even the placeholder failed, but don't reset src again
      console.error(`Placeholder image failed to load: ${placeholderUrl}`);
    }
  };

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
        // <-- Base border
        isSelected
          ? "border-red-500 ring-2 ring-red-300 ring-offset-1"
          : "border-transparent hover:border-gray-300" // <-- Conditional border & ring
      } transition-all duration-200 ease-in-out cursor-pointer group`}
      onClick={() => onClick(shop)}
      // Define initial style (no shadow)
      style={{ boxShadow: "0 0 #0000" }} // Transparent/no shadow
      whileHover={{
        scale: 1.03,
        // Define the target shadow explicitly (example for shadow-xl)
        boxShadow:
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image */}
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={`${shop.name} storefront or food`}
          // Use the modified error handler
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
          <Tag className="w-3 h-3 mr-1" /> {shop.discount}
        </div>
        {/* Optional: Trending Badge */}
        {shop.trending && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Trending
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate group-hover:text-red-600 transition-colors">
          {shop.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 truncate">{shop.address}</p>

        {/* Key Info Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 mb-4">
          {shop.cuisine && (
            <span className="flex items-center">
              <Tag className="w-3 h-3 mr-1 text-gray-400" /> {shop.cuisine}
            </span>
          )}
          {shop.rating && (
            <span className="flex items-center font-medium text-green-600">
              <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />{" "}
              {shop.rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Offers/Highlights */}
        {shop.offers && shop.offers.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1">
              {shop.offers.slice(0, 2).map(
                (
                  offer,
                  index // Show max 2 offers
                ) => (
                  <li
                    key={index}
                    className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded inline-block mr-1"
                  >
                    {offer}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Google Maps Link - Conditionally enhanced when selected */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // Prevent card click when clicking the link
          className={`mt-2 inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
            isSelected
              ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
              : "text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500" // Default style
          } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out`}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          {isSelected ? "Get Directions" : "View on Map"}
        </a>
      </div>
    </motion.div>
  );
};

export default ShopCard;
