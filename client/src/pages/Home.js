import React from "react";
import TestimonialCard from "../components/homeComponents/TestimonialCard";
import AboutSam from "../components/homeComponents/AboutSam";
import {
  SimpleGrid,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

const testimonials = [
  {
    name: "-THE BOOK SELLER-",
    content:
      "Halpin weaves a tantalising web with echoes of Tim Burton and Neil Gaiman.",
    image: "./assets/images/moth5.png",
  },
  {
    name: "-LANCASTER GUARDIAN-",
    content: "Halpin knows how to weave a thrilling story",
    image: "./assets/images/moth6.png",
  },
  {
    name: "-EMILY BEARN, THE TELEGRAPH-",
    content:
      "The real joy of his writing lies in his ability to observe adult vanities through the eyes of a child.",
    image: "./assets/images/moth2.png",
  },
];

export default function Home() {
  return (
    <Stack
      textAlign={"center"}
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 10, md: 18 }}
    >
      <Box w="full" boxShadow={"2xl"}>
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
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "3xl" }}
          position="relative"
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "purple.400",
              zIndex: -1,
            }}
          >
            Others About Me
          </Text>
        </Heading>
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing={"20"}
          mt={16}
          mb={16}
          mx={"auto"}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              content={testimonial.content}
              image={testimonial.image}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Stack>
  );
}
