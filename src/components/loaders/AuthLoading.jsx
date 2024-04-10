import React, { useEffect } from "react";
import { Flex, Spinner, Box, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { loginApi, loginWithUidApi } from "../../api/authapis";
import { getStorageType } from "../../utils";
import { useToastContext } from "../toastNotificationProvider/ToastNotificationProvider";
const AuthLoading = ({ message }) => {
  const { addNotification } = useToastContext();
  const { secret_token, unique_id } = useParams();
  const navigate = useNavigate();

  const login = async () => {
    try {
      let res;
      if (process.env.REACT_APP_ENVIRON === "production") {
        res = await loginWithUidApi(unique_id);
      } else {
        res = await loginApi(secret_token);
      }
      if (res.status === 200) {
        const tokenStorage = getStorageType();
        tokenStorage.setItem("insp_user_profile", res?.data?.data?.authData);
        tokenStorage.setItem("secret_token", res?.data?.data?.secret_token);
        navigate("/homepage");
      }
    } catch (err) {
      addNotification(err?.response?.data?.data, "error", 5000);
      navigate("/");
    }
  };
  useEffect(() => {
    const tokenExists =
      process.env.REACT_APP_ENVIRON === "production"
        ? !!unique_id
        : !!secret_token;

    if (!tokenExists) {
      navigate("/");
    } else {
      login();
    }
  }, [secret_token, unique_id]);

  return (
    <Flex
      position={"absolute"}
      width={"100%"}
      height={"100vh"}
      top={0}
      left={0}
      bg="rgba(0,0,0,0.5)"
      zIndex={20}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
    >
      <Spinner size="xl" />
      {message && (
        <Box mt={6}>
          <Text>{message}</Text>
        </Box>
      )}
    </Flex>
  );
};

export default AuthLoading;
