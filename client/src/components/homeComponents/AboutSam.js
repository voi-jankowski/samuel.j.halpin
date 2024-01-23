import React from "react";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";

export default function AboutSam() {
  return (
    <Container maxW={"4xl"} pb="30px">
      <Heading
        lineHeight={1.1}
        m={0}
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
          Little Old Me
        </Text>
      </Heading>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        direction={{ base: "column", md: "row" }}
      >
        {/* Column 1: Image */}
        <Flex
          flex={1}
          justify={"flex-end"}
          align={"right"}
          position={"relative"}
          backgroundImage={
            "url(client/public/assets/images/Moths_Reduced_Opacity_1.png)"
          }
        >
          <Box
            position={"relative"}
            height={"80%"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
            borderWidth="5px"
            maxW={"8S%"} // Set the maximum width of the box to 70% of its original width
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={"./assets/images/Portrait.jpg"}
            />
          </Box>
        </Flex>

        {/* Column 2: Text */}
        <Stack
          flex={1}
          spacing={{ base: 3, md: 5 }}
          zIndex={0}
          justify="flex-start"
          align="stretch"
        >
          <Text color={"gray.800"}>
            Hello, I'm Samuel J. Halpin. And I’m an author of the sorts of books
            that make your spine-tingle.
          </Text>
          <Text color={"gray.800"}>
            If you want to get in touch, please feel free to reach out to me on
            social media. Links below. Otherwise, you can message me via the
            contact form below.
          </Text>
        </Stack>

        {/* Column 3: Text */}
        <Stack
          flex={1}
          justify="flex-start"
          align="stretch"
          spacing={{ base: 3, md: 5 }}
          zIndex={0}
        >
          <Text color={"gray.800"}>
            For any book related enquiries please contact my agent Silvia
            Molteni at Peters, Fraser & Dunlop
          </Text>
          <Text color={"gray.800"}>www.petersfraserdunlop.com</Text>
        </Stack>
      </Stack>
    </Container>
  );
}
