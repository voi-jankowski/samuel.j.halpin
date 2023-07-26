// Sourced the template for the page from https://choc-ui.com/docs/page-sections/features
import {
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import ImageRightCard from "../components/merchendiseComponents/ImageRightCard";
import ImageLeftCard from "../components/merchendiseComponents/ImageLeftCard";
import { ShoppingCart } from "../components/merchendiseComponents/ShoppingCart";
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");

  const btnRef = React.useRef(null);

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
                  _id={product._id}
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
                  _id={product._id}
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
          <Heading>You haven't added any products yet!</Heading>
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
              ref={btnRef}
              onClick={onOpen}
            >
              Shopping Cart
            </Button>
            <Modal
              onClose={onClose}
              finalFocusRef={btnRef}
              isOpen={isOpen}
              scrollBehavior={scrollBehavior}
              size="4xl"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <ShoppingCart />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        ) : (
          <Heading>Please log in to add products to your cart.</Heading>
        )}
      </Box>
    </Flex>
  );
}
