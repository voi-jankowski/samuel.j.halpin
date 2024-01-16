import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../utils/mutations";

export default function Reset() {
  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
  });

  const [resetPassword, { error, data }] = useMutation(RESET_PASSWORD);

  const [successAlert, setSuccessAlert] = useState("");
  const [validationAlert, setValidationAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

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

    // Check for empty password field and display a validation alert
    if (!formState.password.trim() || !formState.confirmPassword.trim()) {
      setValidationAlert("Both password fields must be filled.");
      setSuccessAlert("");
      setErrorAlert("");
      return;
    }

    // Check that password and confirmPassword fields match
    if (formState.password !== formState.confirmPassword) {
      setValidationAlert("Passwords do not match.");
      setSuccessAlert("");
      setErrorAlert("");
      return;
    }

    // Add your password reset logic here

    // Example: Check if passwords match
    if (formState.password !== formState.confirmPassword) {
      setValidationAlert("Passwords do not match.");
      return;
    }

    // Implement password reset logic
  };

  return (
    <Box
      minH={"50vh"}
      mx={"auto"}
      maxW={"lg"}
      py={12}
      px={6}
      bg={useColorModeValue("gray.50", "gray.800")}
      rounded={"lg"}
      boxShadow={"lg"}
    >
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Reset Your Password</Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4}>
            <FormControl id="password" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                focusBorderColor="purple.400"
              />
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
                focusBorderColor="purple.400"
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
                type="submit"
              >
                Reset Password
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

          {/* Error Alert */}
          {errorAlert && (
            <Alert status="error" mt={4} rounded="md">
              <AlertIcon />
              <AlertTitle mr={2}>Error!</AlertTitle>
              <AlertDescription>{errorAlert}</AlertDescription>
              <CloseButton
                onClick={() => setErrorAlert("")}
                position="relative"
              />
            </Alert>
          )}
        </form>
      </Box>
    </Box>
  );
}
