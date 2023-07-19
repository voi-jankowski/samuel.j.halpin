import React from "react";

import {
  Avatar,
  Box,
  chakra,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Link,
  Icon,
  IconProps,
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

function TestimonialCard(props) {
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
export default function Home() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Meeting scheduling{" "}
          <Text as={"span"} color={"orange.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Never miss a meeting. Never be late for one too. Keep track of your
          meetings and receive smart reminders in appropriate times. Read your
          smart “Daily Agenda” every morning.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            Get started
          </Button>
          <Button rounded={"full"} px={6}>
            Learn more
          </Button>
        </Stack>
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
              <TestimonialCard {...cardInfo} index={index} />
            ))}
          </SimpleGrid>
        </Flex>
      </Stack>
    </Container>
  );
}
