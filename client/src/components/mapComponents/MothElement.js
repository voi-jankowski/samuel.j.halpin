import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Image,
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import Inspiration from "./Inspiration";

const MotionImage = motion(Box); // Wrap the Image component in motion

export default function MothElement({
  title,
  description,
  linkImage,
  image,
  style,
  initialPosition,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");

  const btnRef = React.useRef(null);

  // Animation controls
  const controls = useAnimation();

  // Animate the MothElement when it mounts
  useEffect(() => {
    controls.start({
      x: style.left || 0, // Initial x position (left property from style or 0)
      y: style.top || 0, // Initial y position (top property from style or 0)
      opacity: 1, // Set opacity to 1 for visibility
      transition: {
        duration: 3, // Animation duration
        ease: "easeOut", // Easing function
      },
    });
  }, [controls, style]);

  // Set different box sizes based on the screen breakpoints
  const boxSize = useBreakpointValue({
    base: "100px", // On smaller screens, the MothElement will be 100px x 100px
    sm: "150px", // On medium screens and up, the MothElement will be 150px x 150px
    md: "200px", // On large screens and up, the MothElement will be 200px x 200px
    lg: "250px", // On larger screens and up, the MothElement will be 250px x 250px
    xl: "300px", // On extra large screens and up, the MothElement will be 300px x 300px
  });

  return (
    <MotionImage
      position="absolute"
      cursor="pointer"
      style={style} // Apply the random position from props
      boxSize={boxSize} // Use the responsive boxSize based on the screen size
      animate={controls} // Apply the animation controls
    >
      <Image
        src={linkImage}
        alt={title}
        ref={btnRef}
        onClick={onOpen}
        w="100%" // Make the image take up the full width and height of the container
        h="100%"
        objectFit="cover" // Scale the image to cover the container while maintaining aspect ratio
      />
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
        size="xl"
        motionPreset="scale"
        isCentered
        initialFocusRef={btnRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Inspiration
              title={title}
              description={description}
              image={image}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </MotionImage>
  );
}
