// Sourced the template for the page from https://choc-ui.com/docs/page-sections/features
import { Box, Flex, Button, Icon, IconButton } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ImageRightCard from "../components/merchendiseComponents/ImageRightCard";
import ImageLeftCard from "../components/merchendiseComponents/ImageLeftCard";
import { FaShoppingCart } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../features/product";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../utils/queries";

import { idbPromise } from "../utils/idbPromise";

import AuthService from "../utils/auth";
const Auth = new AuthService();

export default function Merchandise() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log(products);

  const { loading, data } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data.products));
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch(setProducts(products));
      });
    }
  }, [data, loading, dispatch]);

  return (
    <Flex
      bg="transparent"
      p={20}
      w="full"
      justifyContent="center"
      alignItems="center"
    >
      <Box shadow="xl" px={8} py={20} mx="auto">
        {products.length ? (
          products.map((product, index) => {
            if (index % 2 === 0) {
              // Even index, render ImageRightCard
              return (
                <ImageRightCard
                  key={index}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  quantity={product.quantity}
                />
              );
            } else {
              // Odd index, render ImageLeftCard
              return (
                <ImageLeftCard
                  key={index}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  quantity={product.quantity}
                />
              );
            }
          })
        ) : (
          <h3>You haven't added any products yet!</h3>
        )}
        {Auth.loggedIn() ? (
          <Flex justifyContent="right">
            <Button
              w={{
                base: "full",
                sm: "auto",
              }}
              size="lg"
              bg="gray.900"
              _dark={{
                bg: "gray.700",
              }}
              _hover={{
                bg: "gray.700",
                _dark: {
                  bg: "gray.600",
                },
              }}
              color="gray.100"
              as="a"
              rightIcon={<FaShoppingCart />}
            >
              Shopping Cart
            </Button>
          </Flex>
        ) : (
          <h3>Please log in to add products to your cart.</h3>
        )}
      </Box>
    </Flex>
  );
}
