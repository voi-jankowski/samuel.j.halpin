import {
  Box,
  Spacer,
  Heading,
  Flex,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

function Header() {
  return (
    <div>
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
    </div>
  );
}

export default Header;
