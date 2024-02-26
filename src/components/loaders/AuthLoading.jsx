import React, { useEffect } from "react";
import { Flex, Spinner, Box, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { loginApi, loginApiWithIP, loginWithUidApi } from "../../api/authapis";
import { getStorageType } from "../../utils";
import { useToastContext } from "../toastNotificationProvider/ToastNotificationProvider";
const AuthLoading = ({ message }) => {
  const { addNotification } = useToastContext();
  const { secret_token } = useParams(); // later on remove this as no secret token will be passed
  const { unique_id } = useParams();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await loginApi(secret_token);
      // const res = await loginApiWithIP();
      // const res = await loginWithUidApi(unique_id);

      if (res.status === 200) {
        // set session storage if local env as it is required to test multiple peers in live class room with different logins
        // else set local storage

        const tokenStorage = getStorageType();
        tokenStorage.setItem("insp_user_profile", res?.data?.data?.authData);
        tokenStorage.setItem("secret_token", res?.data?.data?.secret_token);

        navigate("/homepage");
      }
    } catch (err) {
      // some error occurs then redirect to auth
      addNotification(err?.response?.data?.data, "error", 5000);
      navigate("/");
    }
  };
  useEffect(() => {
    if (!secret_token) {
      navigate("/");
    } else {
      // Try to login
      login(secret_token);
    }
  }, [secret_token]);
  // useEffect(() => {
  //   if (!unique_id) {
  //     navigate("/");
  //   } else {
  //     login();
  //   }
  // }, [unique_id]);
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
