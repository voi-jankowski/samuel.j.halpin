import React from "react";
import { Box, chakra, Flex, Image, Link, Text } from "@chakra-ui/react";

const testimonials = [
  {
    name: "Brandon P.",
    content: "This is a reply!",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
];

export default function Reply() {
  const { name, content, avatar } = testimonials[0];
  return (
    <Box
      w="85%"
      mt={3}
      py={4}
      px={8}
      bg="red.400"
      _dark={{
        bg: "red.400",
      }}
      shadow="lg"
      rounded="lg"
    >
      <Flex justifyContent="space-between">
        <Flex alignItems={"center"} justifyContent="start">
          <Image
            w={8}
            h={8}
            fit="cover"
            rounded="full"
            borderStyle="solid"
            borderWidth={2}
            color="brand.500"
            _dark={{
              color: "brand.400",
            }}
            alt="Comment avatar"
            src={avatar}
          />
          <Text
            ml={2}
            fontWeight={600}
            fontSize="sm"
            color="gray.600"
            _dark={{
              color: "gray.200",
            }}
          >
            {name}
          </Text>
        </Flex>
        <Text
          fontWeight={600}
          fontSize="xs"
          color="gray.600"
          _dark={{
            color: "gray.200",
          }}
          mx={3}
        >
          {/* {getTimeDifference(createdAt)} */}6 weeks ago
        </Text>
      </Flex>
      <Text
        my={2}
        fontSize="sm"
        fontWeight={400}
        color="gray.600"
        _dark={{
          color: "gray.200",
        }}
      >
        {content}
      </Text>
    </Box>
  );
}
