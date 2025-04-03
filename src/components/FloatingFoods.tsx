import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PizzaIcon,
  BurgerIcon,
  SushiIcon,
  CoffeeIcon,
  IceCreamIcon,
} from "./FoodIcons";

// Import your floating food images - MAKE SURE YOU HAVE THESE IMAGES
import burgerImg from "../../public/android-chrome-512x512.png"; // Adjust path
import momosImg from "../../public/android-chrome-512x512.png"; // Adjust path
import pizzaImg from "../../public/android-chrome-512x512.png"; // Adjust path
import tomatoImg from "../../public/android-chrome-512x512.png"; // Adjust path
import basilImg from "../../public/android-chrome-512x512.png"; // Adjust path

const FloatingFoods = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Food Items - Positioned Absolutely */}
      <img
        src={burgerImg}
        alt="Burger"
        className="absolute w-32 md:w-48 lg:w-64 top-1/2 left-4 md:left-10 lg:left-20 transform -translate-y-1/2 animate-float opacity-90"
        style={{ animationDelay: "0s" , zIndex: -1 }}
      />
      <img
        src={momosImg}
        alt="Momos"
        className="absolute w-24 md:w-32 lg:w-40 top-10 right-4 md:right-10 lg:right-20 animate-float opacity-90"
        style={{ animationDelay: "1s", zIndex: -1 }}
      />
      <img
        src={pizzaImg}
        alt="Pizza Slice"
        className="absolute w-28 md:w-36 lg:w-44 bottom-10 right-10 md:right-20 lg:right-40 animate-float opacity-90"
        style={{ animationDelay: "0.5s", zIndex: -1 }}
      />
      <img
        src={tomatoImg}
        alt="Tomato"
        className="absolute w-8 md:w-10 bottom-20 left-10 md:left-32 animate-float opacity-80"
        style={{ animationDelay: "1.5s", zIndex: -1 }}
      />
      <img
        src={basilImg}
        alt="Basil leaf"
        className="absolute w-6 md:w-8 top-20 left-1/3 animate-float opacity-80"
        style={{ animationDelay: "2s", zIndex: -1 }}
      />
      <img
        src={tomatoImg}
        alt="Tomato Slice"
        className="absolute w-6 md:w-8 bottom-1/2 right-1/4 animate-float opacity-80"
        style={{ animationDelay: "2.5s", zIndex: -1 }}
      />
    </div>
  );
};

export default FloatingFoods;
