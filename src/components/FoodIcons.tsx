import React from "react";

export const PizzaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
      fill="#FFA500"
    />
    <path
      d="M12 2C6.48 2 2 6.48 2 12L12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
      fill="#FF6347"
    />
    <circle cx="7.5" cy="9.5" r="1" fill="#FFFFFF" />
    <circle cx="10.5" cy="16.5" r="1" fill="#FFFFFF" />
    <circle cx="15.5" cy="8.5" r="1" fill="#FFFFFF" />
    <circle cx="13.5" cy="12.5" r="1" fill="#FFFFFF" />
  </svg>
);

export const BurgerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="6" width="16" height="2" rx="1" fill="#F4A261" />
    <rect x="4" y="16" width="16" height="2" rx="1" fill="#F4A261" />
    <rect x="3" y="11" width="18" height="3" rx="1.5" fill="#2A9D8F" />
    <rect x="3" y="9" width="18" height="2" rx="1" fill="#E76F51" />
    <rect x="3" y="14" width="18" height="2" rx="1" fill="#E9C46A" />
  </svg>
);

export const SushiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="8" width="18" height="8" rx="2" fill="#FFFFFF" />
    <rect x="5" y="10" width="14" height="4" rx="1" fill="#FF6347" />
    <rect
      x="4"
      y="7"
      width="16"
      height="2"
      rx="1"
      fill="#000000"
      opacity="0.1"
    />
  </svg>
);

export const CoffeeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 8H4V16C4 18.2091 5.79086 20 8 20H14C16.2091 20 18 18.2091 18 16V8Z"
      fill="#6F4E37"
    />
    <path d="M18 8H4V10H18V8Z" fill="#FFFFFF" opacity="0.2" />
    <path d="M20 8H2V6H20V8Z" fill="#E6E6E6" />
  </svg>
);

export const IceCreamIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21L16 13H8L12 21Z" fill="#F2D2BD" />
    <path
      d="M8 13C8 9.68629 10.6863 7 14 7C17.3137 7 20 9.68629 20 13H8Z"
      fill="#FFC0CB"
    />
  </svg>
);
