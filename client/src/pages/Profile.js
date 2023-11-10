import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/user";

import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";

import DeleteUser from "../components/booksComponents/DeleteUser";

import AuthService from "../utils/auth";
import { redirect } from "react-router-dom";
const Auth = new AuthService();

export default function Profile() {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const themeColor = useSelector((state) => state.theme.value);

  const [formState, setFormState] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
    userIcon: user.userIcon,
  });

  const [updateUser, { error, data }] = useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await updateUser({
        variables: { ...formState },
      });
      console.log(data);
      // Pass the values of the form to the global state
      dispatch(
        update({
          username: data.updateUser.username,
          email: data.updateUser.email,
          password: formState.password,
          userIcon: data.updateUser.user.userIcon,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container style={{ color: themeColor }}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={"transparent"}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          {Auth.loggedIn() ? (
            <>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                User Profile Edit
              </Heading>
              <form onSubmit={handleFormSubmit}>
                <FormControl id="userIcon">
                  <FormLabel>User Icon</FormLabel>

                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar size="xl" src={user.userIcon}>
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <Button w="full">Change Icon</Button>
                    </Center>
                  </Stack>
                </FormControl>
                <FormControl id="userName">
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder={user.username}
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    placeholder={user.email}
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder={user.password}
                    _placeholder={{ color: "gray.500" }}
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <br />
                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "red.500",
                    }}
                    onClick={() => setDeleteOpen(true)}
                  >
                    Delete Account
                  </Button>
                  <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setDeleteOpen(false)}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <DeleteUser onClose={() => setDeleteOpen(false)} />
                    </ModalContent>
                  </Modal>
                  <Button
                    bg={"purple.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "purple.500",
                    }}
                  >
                    Update Profile
                  </Button>
                </Stack>
              </form>
            </>
          ) : (
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Log in or Sign up
              </Heading>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                or
              </Heading>
              <Button
                bg={"purple.400"}
                color={"white"}
                w="80%"
                _hover={{
                  bg: "purple.500",
                }}
                onClick={handleClick}
              >
                Return to Home
              </Button>
            </Stack>
          )}
        </Stack>
      </Flex>
    </Container>
  );
}
