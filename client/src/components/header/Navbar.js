import React, { useState } from "react";
// The navbar template sourced from https://chakra-templates.dev/navigation/navbar
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import Login from "./Login";
import Signup from "./Signup";

import { motion } from "framer-motion";
import { shakeVariant } from "../../utils/animationVariants";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

const Links = [
  { name: "Home", url: "/" },
  { name: "Books", url: "/books" },
  { name: "Inspiration Maps", url: "/map" },
  { name: "Teaching Resources", url: "/teaching" },
  // { name: "Gift Books", url: "/merchandise" },
];

const NavLink = ({ children, url }) => {
  const linkSize = useBreakpointValue({
    base: "sm",
    md: "lg",
    xl: "2xl",
    "2xl": "3xl",
  });

  return (
    <Link
      key={children}
      px={2}
      py={1}
      rounded={"md"}
      fontSize={linkSize} // Set the font size based on the breakpoint value
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.300", "gray.700"),
      }}
      href={url}
    >
      {children}
    </Link>
  );
};

const MotionImage = motion(Image);

const ProfileLink = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <>
      {Auth.loggedIn() ? (
        <Flex alignItems={"center"}>
          <MotionImage
            boxSize="80px"
            src={user.userIcon || "/assets/images/moth7.png"}
            variants={shakeVariant}
            initial="initial"
            whileInView="shake"
          />
          Profile{" "}
        </Flex>
      ) : (
        <Flex alignItems={"center"}>
          <MotionImage
            boxSize="80px"
            src={"/assets/images/moth1.png"}
            variants={shakeVariant}
            initial="initial"
            whileInView="shake"
          />
          Login{" "}
        </Flex>
      )}
    </>
  );
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Add a separate state variable to track Login modal visibility
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // create logic for logging out
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
    dispatch(logout());

    // Refresh the page after logout but remain on the same page unless the url of the page includes /reset, then redirect to homepage
    if (window.location.pathname.includes("/reset")) {
      window.location.replace("/");
    } else {
      window.location.replace(window.location.pathname);
    }
  };

  const linkSize = useBreakpointValue({
    base: "sm",
    md: "lg",
    xl: "2xl",
    "2xl": "3xl",
  });

  return (
    <>
      <Box bg="transparent" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={(event) => {
              event.stopPropagation(); // Stop event propagation
              isOpen ? onClose() : onOpen();
            }}
          />

          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} url={link.url}>
                {link.name}
              </NavLink>
            ))}
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button> */}

              <Menu>
                <MenuButton
                  as={Button}
                  variant={"link"}
                  cursor={"pointer"}
                  fontSize={linkSize}
                  fontWeight="bold"
                  color="purple.800"
                >
                  <ProfileLink />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  {Auth.loggedIn() ? (
                    <>
                      <Center>
                        <MotionImage
                          boxSize="130px"
                          src={"/assets/images/moth7.png"}
                          variants={shakeVariant}
                          initial="initial"
                          whileHover="shake"
                        />
                      </Center>
                      <br />
                      <Center
                        fontSize={linkSize}
                        fontWeight="bold"
                        color="purple.800"
                      >
                        <p>{user.username}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem
                        as={Link}
                        fontSize={linkSize}
                        href="/profile"
                        onClick={onClose}
                      >
                        Your Profile
                      </MenuItem>
                      <MenuItem fontSize={linkSize} onClick={handleLogout}>
                        Logout
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <Center>
                        {/* <Avatar
                          size={"2xl"}
                          src={"/assets/images/moth4.png"}
                        /> */}
                        <MotionImage
                          boxSize="130px"
                          src={"/assets/images/moth4.png"}
                          variants={shakeVariant}
                          initial="initial"
                          whileHover="shake"
                        />
                      </Center>

                      <Center
                        fontSize={linkSize}
                        fontWeight="bold"
                        color="purple.800"
                      >
                        <p>Login or Signup</p>
                      </Center>
                      <br />
                      <MenuDivider />

                      <MenuItem
                        as={Link}
                        fontSize={linkSize}
                        onClick={() => setLoginOpen(true)}
                      >
                        Login
                      </MenuItem>
                      <Modal
                        size={"lg"}
                        isOpen={isLoginOpen}
                        onClose={() => setLoginOpen(false)}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <Login setLoginOpen={setLoginOpen} />
                        </ModalContent>
                      </Modal>
                      <MenuItem
                        as={Link}
                        fontSize={linkSize}
                        onClick={() => setSignupOpen(true)}
                      >
                        Signup
                      </MenuItem>
                      <Modal
                        size={"lg"}
                        isOpen={isSignupOpen}
                        onClose={() => setSignupOpen(false)}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <Signup setSignupOpen={setSignupOpen} />
                        </ModalContent>
                      </Modal>
                    </>
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} url={link.url}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
