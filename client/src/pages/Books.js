import React from "react";
import BookCardSimple from "../components/booksComponents/BookCardSimple";
import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const books = [
  {
    title: "The Peculiar Peggs of Riddling Woods",
    image: "./assets/images/Peggs_Book_Cover.png",
    link: "https://usborne.com/au/the-peculiar-peggs-of-riddling-woods-9781474945660",
    description:
      "This is the story of a sleepy town called Suds. A place where stories fill the air of children turning grey and disappearing without a trace... Poppy and Erasmus are certain there's something peculiar going on in Suds, and they're determined to unravel its secrets. But when they discover the answers might lie in the dark and twisting woods, can they find the courage to creep inside and solve this riddling mystery?      'A thrilling read...flavoured with fairytales, drizzled with a syrup of fear and sprinkled with heart.' M.G. Leonard",
    publisher: "Usborne",
    publisherLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiEb9sJCnewxzyUGHbiMZuZvuytJDiMQKZLS6MyHQDFw&s",
    year: "2019",
  },
  {
    title: "The Midnight Switch",
    image: "./assets/images/Midnight_Book_Cover.png",
    link: "https://usborne.com/au/the-midnight-switch-9781474970655",
    description:
      "A spooky, quirky adventure of curses and magic, perfect for fans of Malamander and A Place Called Perfect.When Lewis's family moves to a faraway town called Barrow, he can't quite put his finger on what feels so strange about his new home. Everyone is obsessed with superstition, and an old story about floods and witches and a curse, while a mysterious bird watches his every move.Then his family friend Moira arrives to stay. Only, there's something peculiar about Moira too. She doesn't know where she's from, or even when she's from, and strange things happen around her. Lewis and Moira are determined to figure out what's going on in Barrow, but as they unravel secret symbols, riddles and stories of a midnight curse, they find that there might be some truth in the old town tales.    Time is running out, before magic switches up everything they know...",
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
          Books by Samuel J. Halpin
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Click on the book cover to find out more!
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
