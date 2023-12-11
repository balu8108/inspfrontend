import { Box, Center, Text, Image, Link } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";
import insplogo from "../../assets/images/insplogo.png";
import { useToastContext } from "../toastNotificationProvider/ToastNotificationProvider";
import { useEffect } from "react";
import { isAuthenticated } from "../../utils";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { addNotification } = useToastContext();
  const navigate = useNavigate();

  const tryAutoLogin = async () => {
    const isAuth = isAuthenticated();
    if (isAuth) {
      navigate("/homepage");
    } else {
      addNotification("Please login to continue", "info", 5000);
    }
  };
  useEffect(() => {
    tryAutoLogin();
  }, []);

  return (
    <Center height={"100vh"}>
      <Box px={4}>
        <Center my={6}>
          <Image src={insplogo} objectFit={"cover"} width={200} />
        </Center>
        <Center my={6}>
          <Text fontSize={"1rem"}>
            For Login into Video Portal Click on Below Link
          </Text>
        </Center>
        <Center my={6}>
          <Link
            color={"blue"}
            href={process.env.REACT_APP_EXTERNAL_INSP_BASE_URL}
            display={"inline-flex"}
            alignItems={"center"}
            fontSize={"1rem"}
          >
            Redirect To Insp Website <BiLinkExternal />
          </Link>
        </Center>
      </Box>
    </Center>
  );
};

export default Home;
