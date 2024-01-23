import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/idbPromise";

import { Box, Heading, Text, Flex, Image } from "@chakra-ui/react";

export default function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

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
      <Text fontSize="lg" color="gray.600">
        You will now be redirected to the home page.
      </Text>
    </Box>
  );
}
