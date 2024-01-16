import React from "react";
import { Container, Link, Icon } from "@chakra-ui/react";
import { FaInstagram, FaTwitter } from "react-icons/fa6";

export default function SocialButton({ icon, label, href, color }) {
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
        <Icon as={icon} mr={2} /> {label}
      </Link>
    </Container>
  );
}
