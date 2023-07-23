import {
  Button,
  FormControl,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

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

export default function AddComment() {
  const { name, content, avatar } = testimonials[0];
  return (
    <Flex
      // minH={"100vh"}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Flex
          justifyContent={{
            base: "center",
            md: "start",
          }}
          mt={-12}
        >
          <Image
            w={16}
            h={16}
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
        </Flex>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
          color={"red.400"}
        >
          Leave your comment
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          What are your thoughts on the book?
        </Text>
        <FormControl id="comment">
          <Textarea placeholder="Type it here..." />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
