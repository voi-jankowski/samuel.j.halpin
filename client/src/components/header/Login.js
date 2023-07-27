// Template sourced from https://chakra-templates.dev/forms/authentication
import React from "react";
import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
// import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function Login({ setLoginOpen }) {
  const dispatch = useDispatch();
  // const history = useHistory();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await loginUser({
        variables: { ...formState },
      });
      console.log(data);
      // Pass the values of the form to the global state
      dispatch(
        login({
          username: data.login.user.username,
          email: data.login.user.email,
          password: formState.password,
        })
      );
      // Save the token to localStorage
      Auth.login(data.login.token);

      setLoginOpen(false);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Flex
      minH={"50vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"purple.500"}
                  color={"white"}
                  _hover={{
                    bg: "red.400",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
