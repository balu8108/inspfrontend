import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Flex,
  Avatar,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Text,
  useTheme,
  useDisclosure,
} from "@chakra-ui/react";
import insplogo from "../../assets/images/insplogo.png";

import { clearStorageData, getStorageData } from "../../utils";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa6";

// In below links the available To is the user type
// if the same link is available to both type of user then we add 0,1
// or if for specific then it will be 0 or 1
// for example Assignments is available to students only not for teacher
// Similary Courses is available to teacher only not for student
const links = [
  { path: "/homepage", label: "Home", availableTo: [0, 1] },
  { path: "/schedule-class", label: "Calendar", availableTo: [0, 1] },
  { path: "/myCourses/PHYSICS", label: "Courses", availableTo: [1] },
  { path: "/mentor/alluploads", label: "Uploads", availableTo: [1] },

  {
    path: "/student/assignments/PHYSICS",
    label: "Assignments",
    availableTo: [0],
  },
  {
    path: "/library/PHYSICS/1",
    label: "Library",
    availableTo: [0],
  },
  { path: "/insp-website", label: "INSP Portal", availableTo: [0, 1] },
];
const NavLinks = ({ userData, type }) => {
  const location = useLocation();

  return (
    <>
      {links.map(
        (link) =>
          link.availableTo.includes(userData?.user_type) && (
            <Box key={link.path} position="relative">
              <Box mx={2} my={type === "hamburger" ? 4 : 0}>
                {link.path === "/insp-website" ? (
                  <a
                    href={`${process.env.REACT_APP_EXTERNAL_INSP_BASE_URL}/student/profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    to={link.path}
                    style={({ isActive, isPending }) => ({
                      fontWeight: isActive ? 700 : 300,
                    })}
                  >
                    {link.label}
                  </NavLink>
                )}
              </Box>
              {type === "normal" && (
                <Box
                  position="absolute"
                  width="100%"
                  height="2px"
                  bg="black"
                  borderRadius="md"
                  style={{
                    visibility: location.pathname.startsWith(link.path)
                      ? "visible"
                      : "hidden",
                  }}
                />
              )}
            </Box>
          )
      )}
    </>
  );
};

const DrawerComponent = ({
  isOpen,
  onOpen,
  onClose,
  btnRef,
  userData,
  handleLogout,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <Box py={7}>
            <Box textAlign={"center"}>
              <Center>
                <Avatar size={"lg"} name={userData?.name} objectFit={"cover"} />
              </Center>
              <Text mt={2}>{userData?.name}</Text>
            </Box>

            <NavLinks userData={userData} type="hamburger" />
            <Text mx={2} onClick={handleLogout}>
              Logout
            </Text>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default function Navbar() {
  const theme = useTheme();
  const { outerBackground } = theme.colors.pallete;
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const getUserDetails = async () => {
    try {
      const res = getStorageData("insp_user_profile");
      setUserData(res.data);
    } catch (err) {}
  };

  const handleLogout = useCallback(async () => {
    try {
      await clearStorageData();
      navigate("/");
    } catch (err) {
      // Handle errors if needed
    }
  }, [navigate]);
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <Box bg={outerBackground} py={1} px={[6, 8, 10, 20]}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <a
              href={process.env.REACT_APP_EXTERNAL_INSP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={insplogo} objectFit={"cover"} width={120} />
            </a>
          </Box>
          {/*This hamburger  button become visible in lower screen sizes  */}
          <Box display={["block", "block", "block", "none"]}>
            <IconButton
              icon={<FaBars />}
              bg="none"
              onClick={onOpen}
              ref={btnRef}
            ></IconButton>
          </Box>

          <Flex
            alignItems={"center"}
            display={["none", "none", "none", "flex"]}
          >
            <Flex mr={6} gap={6} fontSize={"0.98rem"} fontWeight={300}>
              <NavLinks userData={userData} type="normal" />
            </Flex>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    width={42}
                    height={42}
                    name={userData?.name}
                    objectFit={"cover"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"} zIndex={10}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      name={userData?.name}
                      objectFit={"cover"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{userData?.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <DrawerComponent
        isOpen={isOpen}
        onOpen={onOpen}
        btnRef={btnRef}
        onClose={onClose}
        userData={userData}
        handleLogout={handleLogout}
      />
    </>
  );
}
