import {
  Container,
  Heading,
  Box,
  Flex,
  chakra,
  SimpleGrid,
  Button,
  VStack,
  Wrap,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import BookCardSimple from "../components/BookCardSimple";

export default function Books() {
  return (
    <Container as="main">
      <Heading>Books</Heading>
      <Wrap spacing="30px" justify="space-around">
        <Box minW="250px">
          <BookCardSimple />
        </Box>
        <Box minW="250px">
          <BookCardSimple />
        </Box>
      </Wrap>
    </Container>
  );
}
