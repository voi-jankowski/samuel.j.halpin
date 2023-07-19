import {
  Box,
  chakra,
  Flex,
  Heading,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export default function Map() {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <chakra.header>
      <Box
        w="full"
        h="container.sm"
        backgroundImage="url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
        bgPos="center"
        bgSize="cover"
      >
        <Flex
          align="center"
          pos="relative"
          justify="center"
          boxSize="full"
          //   bg="blackAlpha.700"
        >
          <Stack textAlign="center" alignItems="center" spacing={6}>
            <Heading
              fontSize={["2xl", , "3xl"]}
              fontWeight="semibold"
              color="white"
              textTransform="uppercase"
            >
              Build Your new{" "}
              <chakra.span color="blue.400" textDecor="underline">
                Saas
              </chakra.span>
            </Heading>
            <Button
              colorScheme="brand"
              textTransform="uppercase"
              w="fit-content"
            >
              Start project
            </Button>
          </Stack>
        </Flex>
      </Box>
    </chakra.header>
  );
}
