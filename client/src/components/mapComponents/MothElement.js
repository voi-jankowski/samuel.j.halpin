import React from "react";
import { motion } from "framer-motion";
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
} from "@chakra-ui/react";
import Inspiration from "./Inspiration";

const MotionImage = motion(Image); // Wrap the Image component in motion

export default function MothElement({
  title,
  description,
  linkImage,
  image,
  style,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");

  const btnRef = React.useRef(null);
  return (
    <Box
      position="absolute"
      cursor="pointer"
      style={style} // Apply the random position from props
      boxSize="200px"
    >
      <MotionImage
        src={linkImage}
        alt={title}
        ref={btnRef}
        onClick={onOpen}
        w="100%" // Make the image take up the full width and height of the container
        h="100%"
        objectFit="cover" // Scale the image to cover the container while maintaining aspect ratio
        transition="transform 0.2s ease" // Add a smooth transition when scaling on hover
        _hover={{ transform: "scale(1.5)" }} // Scale up the image on hover
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
    </Box>
  );
}
