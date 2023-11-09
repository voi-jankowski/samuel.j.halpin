// The shake animation variant for moth images
export const shakeVariant = {
  initial: {
    rotate: 0, // Initial rotation
  },
  shake: {
    rotate: [
      0, -10, 10, -10, 10, -5, 5, 0, -10, 10, -10, 10, -5, 5, 0, -10, 10, -10,
      10, -5, 5, 0, -10, 10, -10, 10, -5, 5, 0,
    ],
    scale: [1, 1.1, 1.1, 1.1, 1.1, 1.05, 1.05, 1],
    transition: {
      duration: 0.8, // Total animation duration in seconds
      ease: "easeInOut", // You can adjust the easing function
      loop: Infinity, // Infinite loop
    },
  },
};
