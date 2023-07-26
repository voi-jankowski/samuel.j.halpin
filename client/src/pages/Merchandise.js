// Sourced the template for the page from https://choc-ui.com/docs/page-sections/features
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import ImageRightCard from "../components/merchendiseComponents/ImageRightCard";
import ImageLeftCard from "../components/merchendiseComponents/ImageLeftCard";

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
  return (
    <Flex
      bg="transparent"
      p={20}
      w="full"
      justifyContent="center"
      alignItems="center"
    >
      <Box shadow="xl" px={8} py={20} mx="auto">
        <ImageRightCard
          name={merchendise[0].name}
          description={merchendise[0].description}
          image={merchendise[0].image}
          price={merchendise[0].price}
          quantity={merchendise[0].quantity}
        />
        <ImageLeftCard
          name={merchendise[1].name}
          description={merchendise[1].description}
          image={merchendise[1].image}
          price={merchendise[1].price}
          quantity={merchendise[1].quantity}
        />
        <ImageRightCard
          name={merchendise[2].name}
          description={merchendise[2].description}
          image={merchendise[2].image}
          price={merchendise[2].price}
          quantity={merchendise[2].quantity}
        />
      </Box>
    </Flex>
  );
}
