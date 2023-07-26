// Sourced the template for the page from https://choc-ui.com/docs/page-sections/features
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ImageRightCard from "../components/merchendiseComponents/ImageRightCard";
import ImageLeftCard from "../components/merchendiseComponents/ImageLeftCard";

import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../features/product";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../utils/queries";

import { idbPromise } from "../utils/idbPromise";

const merchendise = [
  {
    name: "Gumnut Witch",
    description: "This is the book for children. This is the description.",
    image: "./assets/images/Gumnut_Witch_Square.png",
    price: 10,
    quantity: 20,
  },
  {
    name: "Song Of The Seasnake",
    description: "This is the book for children. This is the description.",
    image: "./assets/images/Song_Of_The_Seasnake_Square.png",
    price: 10,
    quantity: 20,
  },
  {
    name: "The Last Moa",
    description: "This is the book for children. This is the description.",
    image: "./assets/images/The_Last_Moa_Square.png",
    price: 10,
    quantity: 20,
  },
];

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
      </Box>
    </Flex>
  );
}
