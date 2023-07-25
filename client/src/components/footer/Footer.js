import React from "react";
import {
  Box,
  IconButton,
  Icon,
  Container,
  Stack,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import SocialButton from "./SocialButton";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <Flex
      color={useColorModeValue("white", "gray.200")}
      marginTop="auto"
      justifyContent="center" // Center the content horizontally
      alignItems="center" // Center the content vertically
      position="relative" // Set the position to relative for the footer container
    >
      {/* Footer image */}
      <Box
        as="img"
        src="/assets/images/footer.png"
        width="50%"
        alt="Silhouette"
      />

      {/* Social buttons */}
      <Stack
        direction={"row"}
        spacing={0}
        position="absolute" // Set the position to absolute for the social buttons container
        bottom={8} // Adjust the bottom value to control the vertical positioning
        left="50%" // Center the social buttons container horizontally
        transform="translateX(-50%)" // Center the social buttons container horizontally
      >
        <SocialButton
          label={"Twitter"}
          href={"#"}
          icon={<FaTwitter />}
          color={"twitter"}
        />
        <SocialButton
          label={"Instagram"}
          href={"#"}
          icon={<FaInstagram />}
          color={"instagram"}
        />
      </Stack>
    </Flex>
  );
}
