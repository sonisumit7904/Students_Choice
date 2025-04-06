import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { FaExternalLinkAlt } from "react-icons/fa";
// Make sure these types are correctly imported or defined in '../types'
import { Coordinates, Shop, MapContainerProps } from "../types";

// Container style (remains the same)
const containerStyle = {
  width: "100%",
  height: "500px",
};

// Map options (remains the same)
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const MapContainer: React.FC<MapContainerProps> = ({
  apiKey,
  libraries,
  center,
  zoom,
  shops,
  selectedShopId,
  onMarkerClick,
  onMapClick,
  getGoogleMapsUrl,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Refs to store the actual Icon objects, initialized to null
  const defaultMarkerIconRef = useRef<google.maps.Icon | null>(null);
  const selectedMarkerIconRef = useRef<google.maps.Icon | null>(null);

  // State to trigger re-render once icons are created
  const [iconsReady, setIconsReady] = useState(false);

  useEffect(() => {
    // Check if google.maps API is loaded
    if (window.google?.maps) {
      // --- Create icon objects ONLY when google.maps is available ---
      defaultMarkerIconRef.current = {
        url: "/icons/map-marker-default.svg", // Ensure this path is correct relative to your public folder
        scaledSize: new window.google.maps.Size(35, 35),
        anchor: new window.google.maps.Point(17, 35),
      };
      selectedMarkerIconRef.current = {
        url: "/icons/map-marker-selected.svg", // Ensure this path is correct
        scaledSize: new window.google.maps.Size(45, 45),
        anchor: new window.google.maps.Point(22, 45),
      };
      // Set state to true to trigger a re-render using the new icons
      setIconsReady(true);
    }
    // This effect should ideally run only once, but if google maps loads later,
    // you might need dependencies or a different approach if LoadScriptNext handles this internally.
    // For now, empty dependency array is usually okay with LoadScriptNext.
  }, []); // Run once after component mount

  // Find the currently selected shop object for the InfoWindow
  const selectedShop = shops.find((shop) => shop.id === selectedShopId);

  // Safely create pixelOffset for InfoWindow
  const infoWindowPixelOffset = window.google?.maps
    ? new window.google.maps.Size(0, -45)
    : undefined; // Adjusted offset slightly

  return (
    <LoadScriptNext
      googleMapsApiKey={apiKey}
      libraries={libraries}
      loadingElement={
        <div
          style={containerStyle}
          className="bg-gray-200 flex items-center justify-center"
        >
          <p>Loading Map...</p>
        </div>
      }
      // Optional: Add onReady callback if needed, though useEffect often suffices
      // onReady={() => console.log('Google Maps Script Ready')}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={mapOptions}
      >
        {/* Render markers only if icons are ready or fallback to default */}
        {shops.map((shop) => {
          // Determine the desired icon based on selection and readiness
          let markerIconToShow: google.maps.Icon | undefined = undefined;
          if (iconsReady) {
            const iconObject =
              shop.id === selectedShopId
                ? selectedMarkerIconRef.current
                : defaultMarkerIconRef.current;
            // Only assign if the iconObject is not null
            if (iconObject) {
              markerIconToShow = iconObject;
            }
          }

          return (
            <MarkerF
              key={shop.id}
              position={{ lat: shop.latitude, lng: shop.longitude }}
              onClick={() => onMarkerClick(shop.id)}
              // Pass the prepared icon or undefined
              icon={markerIconToShow}
              zIndex={shop.id === selectedShopId ? 1000 : 1}
              title={shop.name}
            />
          );
        })}

        {/* InfoWindow for the selected shop */}
        {selectedShop && (
          <InfoWindowF
            position={{
              lat: selectedShop.latitude,
              lng: selectedShop.longitude,
            }}
            onCloseClick={onMapClick}
            options={{
              pixelOffset: infoWindowPixelOffset, // Use safely created offset
            }}
          >
            {/* InfoWindow Content */}
            <div className="p-2 max-w-xs text-sm font-sans">
              <h4 className="font-bold text-base mb-1 text-gray-800">
                {selectedShop.name}
              </h4>
              <p className="text-gray-600 mb-2">{selectedShop.address}</p>
              <p className="text-red-600 font-semibold mb-3">
                {selectedShop.discount}
              </p>
              <a
                href={getGoogleMapsUrl(selectedShop)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              >
                Get Directions <FaExternalLinkAlt className="w-3 h-3 ml-1.5" />
              </a>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default React.memo(MapContainer);
