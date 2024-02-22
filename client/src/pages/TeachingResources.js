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

import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import ResourceCardSimple from "../components/resourcesComponents/ResourceCardSimple";

const resources = [
  {
    title: "Resource Pack for KS2 Teachers",
    image: "./assets/images-converted/peggs_title.webp",
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
            <ResourceCardSimple
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
