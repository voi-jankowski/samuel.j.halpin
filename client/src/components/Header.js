import {
  Box,
  Spacer,
  Heading,
  Flex,
  Text,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

function Header() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex as="header" alignItems="center">
        <Heading as="h1">Samuel J. Halpin</Heading>
        <Spacer />
      </Flex>
      <Navbar />
    </Box>
  );
}

export default Header;
