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
      <Stack direction={["column", "row"]} spacing="124px">
        <BookCardSimple />
        <BookCardSimple />
      </Stack>
    </Container>
  );
}
