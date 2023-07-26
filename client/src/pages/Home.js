import React from "react";
import TestimonialCard from "../components/smallComponents/TestimonialCard";
import AboutSam from "../components/homeComponents/AboutSam";
import {
  SimpleGrid,
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Box,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";

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

export default function Home() {
  return (
    <Stack
      textAlign={"center"}
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
    >
      <Box
        w="full"
        backgroundColor={useColorModeValue(
          "gray.300",
          "gray.900",
          "rgba(0, 0, 0, 0.5)"
        )}
      >
        <AboutSam />
      </Box>
      <Flex
        textAlign={"center"}
        pt={10}
        justifyContent={"center"}
        direction={"column"}
        width={"full"}
        overflow={"hidden"}
      >
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={"20"}
          mt={16}
          mb={16}
          mx={"auto"}
        >
          {testimonials.map((cardInfo, index) => (
            <TestimonialCard key={index} {...cardInfo} index={index} />
          ))}
        </SimpleGrid>
      </Flex>
    </Stack>
  );
}
