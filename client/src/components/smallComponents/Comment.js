import React from "react";
import { Box, chakra, Flex, Image, Link, Text } from "@chakra-ui/react";
import Reply from "./Reply";
import AddReply from "./AddReply";

const testimonials = [
  {
    name: "Brandon P.",
    content:
      "It really saves me time and effort. It is exactly what our business has been lacking. EEZY is the most valuable business resource we have EVER purchased. After using EEZY my business skyrocketed!",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
  {
    name: "Krysta B.",
    content:
      "I didn't even need training. We've used EEZY for the last five years. I have gotten at least 50 times the value from EEZY. I made back the purchase price in just 48 hours!",
    avatar:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
  {
    name: "Darcy L.",
    content:
      "Thank you for making it painless, pleasant and most of all, hassle free! I'm good to go. No matter where you go, EEZY is the coolest, most happening thing around! I love EEZY!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
  },
  {
    name: "Daniel T.",
    content:
      "I am so pleased with this product. EEZY is both attractive and highly adaptable. Without EEZY, we would have gone bankrupt by now. Thank you for creating this product!",
    avatar:
      "https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
];

export default function Comment() {
  const { name, content, avatar } = testimonials[0];
  return (
    <Flex mt={6} p={0} w="full" flexDir="column" alignItems="flex-end">
      <Box
        w="full"
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
              w={10}
              h={10}
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
              fontSize="medium"
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
          fontSize="md"
          fontWeight={400}
          color="gray.600"
          _dark={{
            color: "gray.200",
          }}
        >
          {content}
        </Text>

        <Flex justifyContent="end" mt={4}></Flex>
      </Box>
      <AddReply />
      <Reply />
    </Flex>
  );
}
