import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { GET_CHECKOUT_SESSION } from "../../utils/queries";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartOpen, addMultipleToCart } from "../../features/product";

import { idbPromise } from "../../utils/idbPromise";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const cartData = [
  {
    id: "1",
    price: 39.99,
    currency: "GBP",
    name: "Ferragamo bag",
    description: "Tan, 40mm",
    quantity: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: "2",
    price: 39.99,
    currency: "GBP",
    name: "Bamboo Tan",
    description: "Tan, 40mm",
    quantity: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: "3",
    price: 39.99,
    currency: "GBP",
    name: "Yeezy Sneakers",
    description: "Tan, 40mm",
    quantity: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
  },
];

export default function ShoppingCart({ onClose }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.product);
  const [getCheckout, { data }] = useLazyQuery(GET_CHECKOUT_SESSION);
  console.log(state.cart);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch(addMultipleToCart([...cart]));
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch(toggleCartOpen());
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  const total = calculateTotal();

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      {state.cart.length ? ( // If there are items in the cart, render the cart
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack spacing={{ base: "8", md: "10" }} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart (
              {state.cart.length === 1 ? (
                <span>1 item</span>
              ) : (
                <span>{state.cart.length} items</span>
              )}
              )
            </Heading>

            <Stack spacing="6">
              {state.cart.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary total={total} />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link color={mode("blue.500", "blue.200")} onClick={onClose}>
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      ) : (
        // If there are no items in the cart, render an empty cart
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="xl"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Your cart is empty
          </Heading>
          <Link mt="6" color={mode("blue.500", "blue.200")} onClick={onClose}>
            Continue shopping
          </Link>
        </Flex>
      )}
    </Box>
  );
}
