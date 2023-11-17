// Template sourced from https://chakra-templates.dev/forms/authentication
import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function SignupCard({ setSignupOpen }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const [successAlert, setSuccessAlert] = useState(""); // Success alert state
  const [errorAlert, setErrorAlert] = useState(""); // Error alert state
  const [validationAlert, setValidationAlert] = useState(""); // Validation alert state

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

    // Check for empty fields and display a validation alert
    if (
      !formState.username.trim() ||
      !formState.email.trim() ||
      !formState.password.trim()
    ) {
      setValidationAlert("All fields must be filled.");
      setSuccessAlert(""); // Clear success alert
      setErrorAlert(""); // Clear error alert
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);
      // Pass the values of the form to the global state
      dispatch(
        login({
          username: formState.username,
          email: formState.email,
          password: formState.password,
          userIcon: "./assets/images/moth7.png",
        })
      );

      Auth.login(data.addUser.token);

      // Show success alert for 2 seconds and redirect to homepage
      setErrorAlert(""); // Clear error alert
      setValidationAlert(""); // Clear validation alert
      setSuccessAlert("Account created successfully.");

      // Delay refreshing the page to allow the success alert to show
      setTimeout(() => {
        setSuccessAlert("");
        // Refresh the page after logout but remain on the same page
        window.location.replace(window.location.pathname);
        // setSignupOpen(false);
      }, 2000);
    } catch (e) {
      console.error(e);

      setSuccessAlert(""); // Clear success alert
      setValidationAlert(""); // Clear validation alert
      // Check if the error is a duplicate key error
      if (e.message.includes("E11000 duplicate key error")) {
        setErrorAlert("This email is already in use.");
      } else {
        setErrorAlert("Something went wrong.");
      }
    }
  };

  return (
    <Flex
      minH={"50vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      rounded={"lg"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to have access to all the features
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
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                  focusBorderColor="purple.400"
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  focusBorderColor="purple.400"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    focusBorderColor="purple.400"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"purple.400"}
                  color={"white"}
                  _hover={{
                    bg: "purple.500",
                  }}
                  type="submit"
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>

            {/* Success Alert */}
            {successAlert && (
              <Alert status="success" mt={4} rounded="md">
                <AlertIcon />
                <AlertTitle mr={2}>Success!</AlertTitle>
                <AlertDescription>{successAlert}</AlertDescription>
                <CloseButton
                  onClick={() => setSuccessAlert("")}
                  position="relative"
                />
              </Alert>
            )}

            {/* Error Alert */}
            {errorAlert && (
              <Alert status="error" mt={4} rounded="md">
                <AlertIcon />
                <AlertDescription style={{ whiteSpace: "normal" }}>
                  {errorAlert}
                </AlertDescription>
                <CloseButton
                  onClick={() => setErrorAlert("")}
                  position="relative"
                />
              </Alert>
            )}

            {/* Validation Alert */}
            {validationAlert && (
              <Alert status="error" mt={4} rounded="md">
                <AlertIcon />
                <AlertTitle mr={2}>Validation Error!</AlertTitle>
                <AlertDescription>{validationAlert}</AlertDescription>
                <CloseButton
                  onClick={() => setValidationAlert("")}
                  position="relative"
                />
              </Alert>
            )}
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
