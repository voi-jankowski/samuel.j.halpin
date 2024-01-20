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
import { UPDATE_PASSWORD } from "../../utils/mutations";

export default function PasswordChange({ onClose }) {
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [updatePassword, { error, data }] = useMutation(UPDATE_PASSWORD);

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

    // Check for empty password fields and display a validation alert
    if (
      !formState.currentPassword.trim() ||
      !formState.newPassword.trim() ||
      !formState.confirmPassword.trim()
    ) {
      setValidationAlert("All password fields must be filled.");
      return;
    }

    // Check if the new password and confirm password fields match
    if (formState.newPassword !== formState.confirmPassword) {
      setValidationAlert(
        "New password and confirm password do not match. Try again!"
      );
      return;
    }

    // Check if the new password is the same as the current password
    if (formState.currentPassword === formState.newPassword) {
      setValidationAlert(
        "New password cannot be the same as the current password. Try again!"
      );
      return;
    }

    // Check if the new password is at least 5 characters long
    if (formState.newPassword.length < 5) {
      setValidationAlert("New password must be at least 5 characters long.");
      return;
    }

    // Implement password change logic
    try {
      const { data } = await updatePassword({
        variables: {
          password: formState.currentPassword,
          newPassword: formState.newPassword,
        },
      });

      // show success alert and close modal after 2 seconds
      setSuccessAlert("Your password has been changed.");
      setValidationAlert("");
      setErrorAlert("");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);

      setSuccessAlert(""); // Clear success alert
      setValidationAlert(""); // Clear validation alert
      //   Check for incorrect credentials error
      if (err.message.includes("Incorrect credentials")) {
        setErrorAlert("Incorrect password. Please try again.");
      } else {
        setErrorAlert("Something went wrong. Please try again.");
      }
    }
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
        <Heading fontSize={"4xl"}>Change Your Password</Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4}>
            <FormControl id="currentPassword" isRequired>
              <FormLabel>Current Password</FormLabel>
              <Input
                type="password"
                name="currentPassword"
                value={formState.currentPassword}
                onChange={handleChange}
                focusBorderColor="purple.400"
              />
            </FormControl>

            <FormControl id="newPassword" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="newPassword"
                value={formState.newPassword}
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

            <Button
              bg={"purple.400"}
              color={"white"}
              _hover={{
                bg: "purple.500",
              }}
              type="submit"
            >
              Change Password
            </Button>
          </Stack>
        </form>
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
      </Box>
    </Box>
  );
}
