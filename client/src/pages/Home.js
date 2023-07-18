import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";

function Home() {
  const boxStyles = {
    p: "10px",
    border: "1px solid black",
    borderRadius: "10px",
    bg: "purple.500",
    color: "white",
    textAlign: "center",
    ":hover": {
      bg: "purple.800",
      color: "white",
    },
  };
  const headingStyles = {
    my: "30px",
    p: "10px",
  };

  return (
    <Container as="section" maxWidth="3xl" py="20px">
      <Heading sx={headingStyles}>About</Heading>
      <Box sx={boxStyles}>
        <Text mx="20px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          euismod, nisl id aliquam ultricies, nunc nunc aliquet nunc, vitae
          aliquam nunc nunc vitae nunc. Donec euismod, nisl id aliquam
          ultricies, nunc nunc aliquet nunc, vitae aliquam nunc nunc vitae nunc.
          Donec euismod, nisl id aliquam ultricies, nunc nunc aliquet nunc,
          vitae aliquam nunc nunc vitae nunc. Donec euismod, nisl id aliquam
          ultricies, nunc nunc aliquet nunc, vitae aliquam nunc nunc vitae nunc.
          Donec euismod, nisl id aliquam ultricies, nunc nunc aliquet nunc,
          vitae aliquam nunc nunc vitae nunc.
        </Text>
      </Box>
    </Container>
  );
}

export default Home;
