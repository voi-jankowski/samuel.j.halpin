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

export default function MothElement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");

  const btnRef = React.useRef(null);
  return (
    <Box boxSize="sm" position="relative">
      <Image
        src="assets/images/moth1.png"
        alt="moth-1"
        ref={btnRef}
        onClick={onOpen}
        cursor="pointer"
      />
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
        size="xl"
        motionPreset="scale"
        isCentered // Set this to true to center the modal above the btnRef
        initialFocusRef={btnRef} // Set the initial focus to the btnRef
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Inspiration />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
