import { useEffect, useState } from "react";
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
  useTheme,
} from "@chakra-ui/react";
import insplogo from "../../assets/images/insplogo.png";
import { clearStorageData, getStorageData } from "../../utils";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

// In below links the available To is the user type
// if the same link is available to both type of user then we add 0,1
// or if for specific then it will be 0 or 1
// for example Assignments is available to students only not for teacher
// Similary Courses is available to teacher only not for student
const links = [
  { path: "/homepage", label: "Home", availableTo: [0, 1] },
  { path: "/schedule-class", label: "Calendar", availableTo: [0, 1] },
  { path: "/mentor/myCourses/PHYSICS", label: "Courses", availableTo: [1] },
  { path: "/mentor/alluploads", label: "Uploads", availableTo: [1] },
  { path: "/student/assignments", label: "Assignments", availableTo: [0] },
  {
    path: "/student/physics-library/:chapterName",
    label: "Library",
    availableTo: [0],
  },
  { path: "/insp-website", label: "INSP Portal", availableTo: [0, 1] },
];
const NavLinks = ({ userData }) => {
  const location = useLocation();

  return (
    <>
      {links.map(
        (link) =>
          link.availableTo.includes(userData?.user_type) && (
            <Box key={link.path} position="relative">
              <Box mx={2}>
                {link.path === "/insp-website" ? (
                  <a
                    href="https://www.inspedu.in/student/profile"
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
            </Box>
          )
      )}
    </>
  );
};
export default function Navbar() {
  const theme = useTheme();
  const { backgroundLightBlue } = theme.colors.pallete;
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const res = getStorageData("insp_user_profile");
      setUserData(res.data);
    } catch (err) {}
  };

  const handleLogout = async () => {
    try {
      await clearStorageData();
      navigate("/");
    } catch (err) {}
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <Box bg={backgroundLightBlue} py={1} px={20}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <a
              href="https://www.inspedu.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={insplogo} objectFit={"cover"} width={120} />
            </a>
          </Box>

          <Flex alignItems={"center"}>
            <Flex mr={6} gap={6} fontSize={"0.98rem"} fontWeight={300}>
              <NavLinks userData={userData} />
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
    </>
  );
}
