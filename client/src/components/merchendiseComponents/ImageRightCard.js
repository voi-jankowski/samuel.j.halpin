import {
  Box,
  Button,
  Stack,
  Text,
  SimpleGrid,
  chakra,
  HStack,
  Image,
} from "@chakra-ui/react";
import React from "react";

export default function ImageRightCard({
  name,
  description,
  image,
  price,
  quantity,
}) {
  return (
    <SimpleGrid
      alignItems="start"
      columns={{
        base: 1,
        md: 2,
      }}
      mb={44}
      spacingY={{
        base: 10,
        md: 32,
      }}
      spacingX={{
        base: 10,
        md: 24,
      }}
    >
      <Box>
        <chakra.h2
          mb={4}
          fontSize={{
            base: "2xl",
            md: "4xl",
          }}
          fontWeight="extrabold"
          letterSpacing="tight"
          textAlign={{
            base: "center",
            md: "left",
          }}
          color="gray.900"
          _dark={{
            color: "gray.400",
          }}
          lineHeight={{
            md: "shorter",
          }}
          textShadow="2px 0 currentcolor"
        >
          {name}
        </chakra.h2>
        <Text
          mb={5}
          textAlign={{
            base: "center",
            sm: "left",
          }}
          color="gray.600"
          _dark={{
            color: "gray.400",
          }}
          fontSize={{
            md: "lg",
          }}
        >
          {description}
        </Text>

        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {quantity} left in stock
          </Text>

          <Stack direction={"row"} align={"center"}></Stack>
        </Stack>

        <HStack pt={10} align={"center"} justify="space-between">
          <Button
            w={{
              base: "full",
              sm: "auto",
            }}
            size="md"
            bg="gray.900"
            _dark={{
              bg: "gray.700",
            }}
            _hover={{
              bg: "gray.700",
              _dark: {
                bg: "gray.600",
              },
            }}
            color="gray.100"
            as="a"
          >
            Add To Cart
          </Button>
          <Text fontWeight={800} fontSize={"3xl"}>
            ${price}
          </Text>
        </HStack>
      </Box>
      <Box w="100%" h="100px" maxW="350px" mt="-30px">
        <Image src={image} alt={name} fit={"cover"} align={"center"} />
      </Box>
    </SimpleGrid>
  );
}
