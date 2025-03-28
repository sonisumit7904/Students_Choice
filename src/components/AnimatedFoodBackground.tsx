import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PizzaIcon,
  BurgerIcon,
  SushiIcon,
  CoffeeIcon,
  IceCreamIcon,
} from "./FoodIcons";

// Define the props for the component
interface AnimatedFoodBackgroundProps {
  count?: number;
  duration?: number;
  enabled?: boolean;
}

// Define the food item interface
interface FoodItem {
  id: number;
  Icon: React.FC<{ className?: string }>;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
}

const Icons = [PizzaIcon, BurgerIcon, SushiIcon, CoffeeIcon, IceCreamIcon];

export const AnimatedFoodBackground: React.FC<AnimatedFoodBackgroundProps> = ({
  count = 10,
  duration = 15,
  enabled = true,
}) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    if (!enabled) return;

    // Generate random food items
    const items: FoodItem[] = Array.from({ length: count }).map((_, index) => {
      const randomIcon = Icons[Math.floor(Math.random() * Icons.length)];
      const direction = Math.random() > 0.5;

      return {
        id: index,
        Icon: randomIcon,
        startX: direction ? -100 : window.innerWidth + 100,
        startY: Math.random() * window.innerHeight,
        endX: direction ? window.innerWidth + 100 : -100,
        endY: Math.random() * window.innerHeight,
        size: 20 + Math.random() * 40,
        duration: duration * (0.7 + Math.random() * 0.6),
        delay: Math.random() * 20,
        rotate: Math.random() * 360,
      };
    });

    setFoodItems(items);
  }, [count, duration, enabled]);

  if (!enabled || foodItems.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {foodItems.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          initial={{
            x: item.startX,
            y: item.startY,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            x: item.endX,
            y: item.endY,
            rotate: item.rotate,
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: Math.random() * 5,
          }}
          style={{
            width: item.size,
            height: item.size,
          }}
        >
          <item.Icon className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedFoodBackground;
