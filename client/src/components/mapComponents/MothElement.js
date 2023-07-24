import React from "react";
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
    >
      <Image src={linkImage} alt={title} ref={btnRef} onClick={onOpen} />
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
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
