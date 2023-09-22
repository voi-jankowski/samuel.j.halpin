import React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Modal,
  useDisclosure,
  Button,
  Flex,
  Link,
  chakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import BoookCardExtended from "./BoookCardExtended";

export default function BookCardSimple({
  index,
  title,
  image,
  link,
  description,
  publisher,
  publisherLogo,
  year,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");

  const btnRef = React.useRef(null);

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        // height={""}
        maxW={"330px"}
        w={"full"}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        ref={btnRef}
        onClick={onOpen}
        _hover={{
          transform: "scale(1.05)",
          cursor: "pointer",
        }}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"430px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={430}
            width={300}
            objectFit={"cover"}
            src={image}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading
            display="block"
            color="gray.800"
            _dark={{
              color: "white",
            }}
            fontWeight="bold"
            fontSize="2xl"
            textAlign="center"
            mt={2}
            _hover={{
              color: "gray.600",
              textDecor: "underline",
            }}
          >
            {title}
          </Heading>
          <Box>
            <Flex alignItems="center">
              <Flex alignItems="center">
                <Image
                  h={10}
                  fit="cover"
                  rounded="full"
                  src={publisherLogo}
                  alt="Publisher Logo"
                />
                <Text
                  mx={2}
                  fontWeight="bold"
                  color="gray.700"
                  _dark={{
                    color: "gray.200",
                  }}
                >
                  {publisher}
                </Text>
              </Flex>
              <chakra.span
                mx={1}
                fontSize="sm"
                color="gray.600"
                _dark={{
                  color: "gray.300",
                }}
              >
                {year}
              </chakra.span>
            </Flex>
          </Box>
        </Stack>
      </Box>
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <BoookCardExtended
              key={index}
              title={title}
              image={image}
              link={link}
              description={description}
              publisher={publisher}
              publisherLogo={publisherLogo}
              year={year}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} bg={"purple.100"}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
