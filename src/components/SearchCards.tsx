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
    const mapElement = document.getElementById("shops");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {locations.map((location) => (
        <div
          key={location.tag}
          className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleCardClick(location.tag)}
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {location.name}
          </h3>
          <p className="text-sm text-gray-500">
            Click to search for {location.name}
          </p>
        </div>
      ))}

      {/* Coming Soon Card */}
      <div className="p-4 bg-gray-100 shadow-md rounded-lg cursor-not-allowed hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-gray-500">Coming Soon</h3>
        <p className="text-sm text-gray-400">
          More locations will be added soon!
        </p>
      </div>
    </div>
  );
};

export default SearchCards;
