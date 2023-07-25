import React from "react";
import {
  Box,
  Spacer,
  Heading,
  Image,
  Flex,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

import Navbar from "./Navbar";

function Header() {
  const logoSize = useBreakpointValue({ base: "70%", md: "50%" });
  const baloonSize = useBreakpointValue({ base: "30%", md: "20%" });
  return (
    <Box bg="transparent" px={4}>
      <Flex as="header" alignItems="center">
        <Image
          src="./assets/images/baloon.png"
          alt="Heading Baloon"
          width="20%"
        />
        <Flex direction="column" alignItems="right" width={logoSize}>
          <Image src="./assets/images/sam-logo.png" alt="Sam's Logo" />
          <Text
            fontSize={{ base: "md", sm: "xl", md: "2xl", lg: "3xl", xl: "4xl" }}
            fontWeight="bold"
            color="gray.800"
            alignSelf="flex-end"
            mt={{ base: -1, sm: -2, md: -3, lg: -4, xl: -5 }}
          >
            Author
          </Text>
        </Flex>
        <Spacer />
      </Flex>
      <Navbar />
    </Box>
  );
}

export default Header;
