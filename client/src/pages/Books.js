import React from "react";
import BookCardSimple from "../components/booksComponents/BookCardSimple";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const books = [
  {
    title: "The Peculiar Peggs of Riddling Woods",
    image: "./assets/images/Peggs_Book_Cover.png",
    description:
      "This is the story of a sleepy town called Suds. A place where stories fill the air of children turning grey and disappearing without a trace... Poppy and Erasmus are certain there's something peculiar going on in Suds, and they're determined to unravel its secrets. But when they discover the answers might lie in the dark and twisting woods, can they find the courage to creep inside and solve this riddling mystery?",
    publisher: "Usborne",
    publisherLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiEb9sJCnewxzyUGHbiMZuZvuytJDiMQKZLS6MyHQDFw&s",
    year: "2019",
  },
  {
    title: "The Midnight Switch",
    image: "./assets/images/Midnight_Book_Cover.png",
    description:
      "A spooky, quirky adventure of curses and magic, perfect for fans of Malamander and A Place Called Perfect.",
    publisher: "Usborne",
    publisherLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiEb9sJCnewxzyUGHbiMZuZvuytJDiMQKZLS6MyHQDFw&s",
    year: "2023",
  },
];

export default function gridListWith() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Short heading
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {books.map((book, index) => (
            <BookCardSimple
              key={index}
              title={book.title}
              image={book.image}
              link={book.link}
              description={book.description}
              publisher={book.publisher}
              publisherLogo={book.publisherLogo}
              year={book.year}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
