import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Heading, Text, Flex, Spinner, Image } from "@chakra-ui/react";

export default function Success() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Flex justifyContent="center" alignItems="center">
        <Image
          boxSize="lg"
          src={"./assets/images/cat.png "}
          alt="Cat Success"
        />
      </Flex>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Payment Successful!
      </Heading>
      <Text fontSize="lg" color="gray.600">
        Thank you for your purchase!
      </Text>
    </Box>
  );
}
