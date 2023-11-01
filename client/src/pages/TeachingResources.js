// import React from "react";

// import {
//   Box,
//   Button,
//   Container,
//   Flex,
//   Heading,
//   Icon,
//   Stack,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";

// import {
//   FcAbout,
//   FcAssistant,
//   FcCollaboration,
//   FcDonate,
//   FcManager,
// } from "react-icons/fc";

// const Card = ({ heading, description, icon, href }) => {
//   return (
//     <Box
//       maxW={{ base: "full", md: "275px" }}
//       w={"full"}
//       borderWidth="1px"
//       borderRadius="lg"
//       overflow="hidden"
//       p={5}
//     >
//       <Stack align={"start"} spacing={2}>
//         <Flex
//           w={16}
//           h={16}
//           align={"center"}
//           justify={"center"}
//           color={"white"}
//           rounded={"full"}
//           bg={useColorModeValue("gray.100", "gray.700")}
//         >
//           {icon}
//         </Flex>
//         <Box mt={2}>
//           <Heading size="md">{heading}</Heading>
//           <Text mt={1} fontSize={"sm"}>
//             {description}
//           </Text>
//         </Box>
//         <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
//           Learn more
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default function gridListWith() {
//   return (
//     <Box p={4}>
//       <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
//         <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
//           Teaching Resources
//         </Heading>
//         <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
//           obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
//         </Text>
//       </Stack>

//       <Container maxW={"5xl"} mt={12}>
//         <Flex flexWrap="wrap" gridGap={6} justify="center">
//           <Card
//             heading={"Heading"}
//             icon={<Icon as={FcAssistant} w={10} h={10} />}
//             description={
//               "Lorem ipsum dolor sit amet catetur, adipisicing elit."
//             }
//             href={"#"}
//           />
//           <Card
//             heading={"Heading"}
//             icon={<Icon as={FcCollaboration} w={10} h={10} />}
//             description={
//               "Lorem ipsum dolor sit amet catetur, adipisicing elit."
//             }
//             href={"#"}
//           />
//           <Card
//             heading={"Heading"}
//             icon={<Icon as={FcDonate} w={10} h={10} />}
//             description={
//               "Lorem ipsum dolor sit amet catetur, adipisicing elit."
//             }
//             href={"#"}
//           />
//           <Card
//             heading={"Heading"}
//             icon={<Icon as={FcManager} w={10} h={10} />}
//             description={
//               "Lorem ipsum dolor sit amet catetur, adipisicing elit."
//             }
//             href={"#"}
//           />
//           <Card
//             heading={"Heading"}
//             icon={<Icon as={FcAbout} w={10} h={10} />}
//             description={
//               "Lorem ipsum dolor sit amet catetur, adipisicing elit."
//             }
//             href={"#"}
//           />
//         </Flex>
//       </Container>
//     </Box>
//   );
// }

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

const resources = [
  {
    title: "The Peculiar Peggs of Riddling Woods",
    image: ".assets/images/peggs_title.png",
    document: "./assets/resources/Peggs_Teaching_Resources.pdf",
    description:
      "This is the story of a sleepy town called Suds. A place where stories fill the air of children turning grey and disappearing without a trace... Poppy and Erasmus are certain there's something peculiar going on in Suds, and they're determined to unravel its secrets. But when they discover the answers might lie in the dark and twisting woods, can they find the courage to creep inside and solve this riddling mystery?      'A thrilling read...flavoured with fairytales, drizzled with a syrup of fear and sprinkled with heart.' M.G. Leonard",
    download:
      "https://drive.google.com/file/d/1ddOFWRpxZ9emkB6BIU5bsVsadvhiGV59/view?usp=sharing",
  },
];

export default function gridListWith() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Teaching Resources
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Click on the resources below to view and download!
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {resources.map((resources, index) => (
            <BookCardSimple
              key={index}
              title={resources.title}
              image={resources.image}
              document={resources.document}
              description={resources.description}
              download={resources.download}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
