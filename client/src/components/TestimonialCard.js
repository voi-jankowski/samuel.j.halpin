import React from "react";
import { Box, chakra, Flex, Image, Link } from "@chakra-ui/react";

export default function TestimonialCard(props) {
  const { name, content, avatar } = props;
  return (
    <Flex
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="md"
        mx="auto"
        py={4}
        px={8}
        bg="orange.400"
        _dark={{
          bg: "orange.400",
        }}
        shadow="lg"
        rounded="lg"
      >
        <Flex
          justifyContent={{
            base: "center",
            md: "end",
          }}
          mt={-16}
        >
          <Image
            w={20}
            h={20}
            fit="cover"
            rounded="full"
            borderStyle="solid"
            borderWidth={2}
            color="brand.500"
            _dark={{
              color: "brand.400",
            }}
            alt="Testimonial avatar"
            src={avatar}
          />
        </Flex>

        <chakra.h2
          color="gray.800"
          _dark={{
            color: "white",
          }}
          fontSize={{
            base: "2xl",
            md: "3xl",
          }}
          mt={{
            base: 2,
            md: 0,
          }}
          fontWeight="bold"
        >
          Design Tools
        </chakra.h2>

        <chakra.p
          mt={2}
          color="gray.600"
          _dark={{
            color: "gray.200",
          }}
        >
          {content}
        </chakra.p>

        <Flex justifyContent="end" mt={4}>
          <Link
            fontSize="xl"
            color="brand.500"
            _dark={{
              color: "brand.300",
            }}
          >
            {name}
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}
