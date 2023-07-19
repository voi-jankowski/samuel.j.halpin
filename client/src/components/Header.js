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
        <HStack spacing="10px">
          <Box bg="gray.200" p="10px">
            M
          </Box>
          <Text>voi@gmail.com</Text>
          <Button colorScheme="purple">Logout</Button>
        </HStack>
      </Flex>
      <Navbar />
    </Box>
  );
}

export default Header;
