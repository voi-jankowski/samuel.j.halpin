import React from "react";
import { Button, Container, Icon, IconButton } from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function SocialButton({ icon, label, href, color }) {
  return (
    <Container>
      <Button
        colorScheme={color}
        variant="ghost"
        aria-label={label}
        href={href}
        leftIcon={icon}
        size="lg"
      >
        {label}
      </Button>
    </Container>
  );
}
