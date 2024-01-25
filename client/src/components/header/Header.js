import React from "react";
import {
  Box,
  Spacer,
  Image,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import Navbar from "./Navbar";

const MotionImage = motion(Image);

function Header({ animate }) {
  const logoSize = useBreakpointValue({
    base: "70%",
    sm: "50%",
    md: "50%",
    xl: "40%",
    "2xl": "30%",
  });
  const baloonSize = useBreakpointValue({
    base: "30%",
    sm: "20%",
    md: "20%",
    xl: "15%",
  });
  return (
    <Box bg="transparent" px={4}>
      <Flex
        as="header"
        alignItems="center"
        backgroundImage="url(/assets/images/Mill_Header.png)"
        backgroundRepeat="no-repeat"
        backgroundPosition="left"
        backgroundSize="contain"
      >
        <MotionImage
          src="/assets/images/baloon.png"
          alt="Heading Baloon"
          width={baloonSize}
          ml="5%"
          animate={animate ? { x: [500, 0], opacity: [0, 1] } : {}}
          transition={{ duration: 7, ease: "easeInOut" }}
        />
        <Flex direction="column" alignItems="right" width={logoSize}>
          <Image src="/assets/images/sam-logo.png" alt="Sam's Logo" />
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
