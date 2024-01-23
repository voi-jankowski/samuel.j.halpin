import {
  CloseButton,
  Flex,
  Link,
  Select,
  SelectProps,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";

import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantity, removeFromCart } from "../../features/product";

import { idbPromise } from "../../utils/idbPromise";

const QuantitySelect = (props) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  );
};

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.product);

  const { _id, name, image, price, purchaseQuantity } = item;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart({ _id }));
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch(updateCartQuantity({ _id, purchaseQuantity: newQuantity }));
      idbPromise("cart", "put", { ...item, purchaseQuantity: newQuantity });
    }
  };

  const handleDelete = () => {
    dispatch(removeFromCart({ _id }));
    idbPromise("cart", "delete", { ...item });
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta name={name} image={image} />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <QuantitySelect
          value={purchaseQuantity}
          onChange={(e) => {
            handleQuantityChange(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency={"AUD"} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={handleDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Link fontSize="sm" textDecor="underline" onClick={handleDelete}>
          Delete
        </Link>
        <QuantitySelect
          value={purchaseQuantity}
          onChange={(e) => {
            handleQuantityChange(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency={"AUD"} />
      </Flex>
    </Flex>
  );
};
