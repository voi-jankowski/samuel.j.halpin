import React from "react";
import { Container, Link, Text } from "@chakra-ui/react";
import { SocialIcon } from "react-social-icons";

const baseStyle = {
  width: 45,
  height: 45,
};

const largeStyle = {
  width: 30,
  height: 30,
};

export default function SocialButton({ label, href, color }) {
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
      >
        <SocialIcon
          url={href}
          bgColor={"black"}
          style={{ base: { baseStyle }, lg: { largeStyle } }}
        />
        <Text display={{ base: "none", lg: "block" }} ml={2}>
          {label}
        </Text>
      </Link>
    </Container>
  );
}
