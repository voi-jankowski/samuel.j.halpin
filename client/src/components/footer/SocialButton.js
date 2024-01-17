import React from "react";
import { Container, Link, Text, useMediaQuery } from "@chakra-ui/react";
import { SocialIcon } from "react-social-icons";

const baseStyle = {
  width: 60,
  height: 60,
};

const largeStyle = {
  width: 40,
  height: 40,
};

export default function SocialButton({ label, href, color }) {
  // Check if the screen is larger than 1050px
  const [isLargerThan1050] = useMediaQuery("(min-width: 1050px)");

  // Set the icon size based on the screen size
  const iconSize = isLargerThan1050 ? largeStyle : baseStyle;

  return (
    <Container>
      <Link
        href={href}
        isExternal
        aria-label={label}
        colorScheme={color}
        fontSize="20px"
        fontWeight="400"
        display="flex"
        alignItems="center"
        _hover={{ color: "purple.400" }}
      >
        <SocialIcon
          url={href}
          bgColor={"black"}
          style={iconSize}
          _hover={{ scale: 1.2 }} // Scale the icon on hover
        />
        {isLargerThan1050 && <Text ml={2}>{label}</Text>}
      </Link>
    </Container>
  );
}
