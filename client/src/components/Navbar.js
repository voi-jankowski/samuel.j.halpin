import { Flex, Box } from "@chakra-ui/react";
import React from "react";

export default function Navbar() {
  const boxStyles = {
    w: "150px",
    h: "30px",
    m: "10px",
    borderRadius: "10px",
    bg: "purple.500",
    color: "white",
    textAlign: "center",
  };

  return (
    <Flex as="nav" p="10px" bg="gray.200" justifyContent="space-around">
      <Box sx={boxStyles}>1</Box>
      <Box sx={boxStyles}>2</Box>
      <Box sx={boxStyles}>3</Box>
      <Box sx={boxStyles}>4</Box>
      <Box sx={boxStyles}>5</Box>
    </Flex>
  );
}
