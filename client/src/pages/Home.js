import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";

function Home() {
  return (
    <Container>
      <Heading my="30px" p="10px">
        About
      </Heading>
      <Box>
        <Text marginLeft="30px">
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
