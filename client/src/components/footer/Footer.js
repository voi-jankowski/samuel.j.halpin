import React from "react";

import {
  Box,
  Stack,
  Flex,
  useColorModeValue,
  Text,
  Link,
} from "@chakra-ui/react";
import SocialButton from "./SocialButton";

export default function Footer() {
  return (
    // Footer container
    <Stack direction={"column"} spacing={0}>
      <Flex
        color={useColorModeValue("white", "gray.200")}
        marginTop="auto"
        justifyContent="center" // Center the content horizontally
        alignItems="center" // Center the content vertically
        position="relative" // Set the position to relative for the footer container
      >
        {/* Footer image */}
        <Box
          as="img"
          src="/assets/images/footer.png"
          width="60%"
          alt="Silhouette"
        />

        {/* Social buttons */}
        <Stack
          direction={"row"}
          spacing={0}
          position="absolute" // Set the position to absolute for the social buttons container
          bottom={4} // Adjust the bottom value to control the vertical positioning
          left="50%" // Center the social buttons container horizontally
          transform="translateX(-50%)" // Center the social buttons container horizontally
        >
          <SocialButton
            label={"X-Twitter"}
            href={"https://x.com/samueljhalpin?lang=en"}
            color={"twitter"}
          />
          <SocialButton
            label={"Instagram"}
            href={"https://www.instagram.com/samueljhalpin/?hl=en"}
            color={"instagram"}
          />
        </Stack>
      </Flex>
      <Box bg="black" color="white" textAlign="center" pt={3} pb={5}>
        {/* Footer text */}
        <Text fontSize="xs" textAlign="center" mt={4}>
          Copyright © 2024 Samuel J. Halpin. All texts and illustrations on this
          site are protected. Teaching resources are shared with permission from
          Usborne Publishing. <br />
          Website design and development by Voi Jankowski. <br />
          Privacy information can be found in our{" "}
          <Link href="/privacy-policy" color="purple.400">
            Privacy Policy
          </Link>
        </Text>
      </Box>
    </Stack>
  );
}
