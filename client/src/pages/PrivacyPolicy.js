import React from "react";
import { Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function PrivacyPolicy() {
  return (
    <Container maxW={"4xl"} py="30px">
      <Heading
        lineHeight={1.1}
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "3xl" }}
        textAlign={"center"}
        mb={5}
      >
        Privacy Policy
      </Heading>
      <Stack
        spacing={{ base: 8, md: 10 }}
        textAlign={"left"}
        bg={"transpartent"}
        p={5}
      >
        {/* Privacy Policy Text */}
        <Text>Last Updated: Jan 17, 2024</Text>
        <Text>
          Welcome to the Samuel J. Halpin Author Page. This Privacy Policy
          explains how we, at the Samuel J. Halpin Author Page, collect, use,
          and protect your personal information when you use our website [
          Website URL].
        </Text>
        {/* Add other policy sections here */}
        <Heading fontSize={"lg"}>1. Personal Information We Collect</Heading>
        <Text>
          When you register on our site, we may collect your username and email
          address. This information is essential for you to engage in our
          website's community, particularly for book discussions and comments.
        </Text>

        <Heading fontSize={"lg"}>2. Use of Personal Information</Heading>
        <Text>We use your personal information to identify you...</Text>
      </Stack>
    </Container>
  );
}
