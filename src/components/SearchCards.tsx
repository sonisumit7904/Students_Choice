import React from "react";

interface SearchCardsProps {
  onSearch: (location: string) => void;
}

const SearchCards: React.FC<SearchCardsProps> = ({ onSearch }) => {
  const locations = [
    { name: "NIT Raipur", tag: "nit raipur" },
    { name: "AIIMS", tag: "aiims" },
  ];

  const handleCardClick = (tag: string) => {
    onSearch(tag);

    // Scroll to the map section
    const mapElement = document.getElementById("search-area");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {locations.map((location) => (
        <div
          key={location.tag}
          className="p-6 bg-gradient-to-r from-red-400 to-orange-400 rounded-xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          onClick={() => handleCardClick(location.tag)}
        >
          <h3 className="text-xl font-bold text-white mb-2">{location.name}</h3>
          <p className="text-sm text-white/90">
            Click to explore {location.name}
          </p>
        </div>
      ))}

      {/* Coming Soon Card */}
      <div className="p-6 bg-gray-200 rounded-xl shadow-md cursor-not-allowed flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-gray-500 mb-2">Coming Soon</h3>
        <p className="text-sm text-gray-400">
          More locations will be added soon!
        </p>
      </div>
    </div>
  );
};

export default SearchCards;
