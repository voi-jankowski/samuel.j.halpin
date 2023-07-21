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

import { logout } from "../../features/user";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { REMOVE_USER } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function DeleteUser() {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({});

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={"red.500"}>
            Delete Account
          </Heading>
        </Stack>
        <br />
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Text fontSize={"lg"} color={"red.400"}>
              Are you sure you want to leave us?
            </Text>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Tick the box to confirm</Checkbox>
              </Stack>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
