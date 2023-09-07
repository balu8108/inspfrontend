import { useEffect, createContext, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";

const ToastContext = createContext();
export function ToastNotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, status, duration = 5000) => {
    setNotifications([]);
    const id = Date.now().toString();
    const notification = { id, message, status, duration };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <>
      <ToastContext.Provider value={{ addNotification, removeNotification }}>
        {children}
        {notifications.map((notification) => (
          <ToastNotification
            key={notification.id}
            message={notification.message}
            status={notification.status}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </ToastContext.Provider>
    </>
  );
}
export function useToastContext() {
  return useContext(ToastContext);
}

const ToastNotification = ({ message, status, duration, onClose }) => {
  const toast = useToast();

  useEffect(() => {
    const toastId = toast({
      title: message,
      status: status,
      duration: duration,
      isClosable: true,
      onClose: onClose,
      position: "top",
    });

    return () => {
      toast.close(toastId);
    };
  }, [toast, message, status, duration, onClose]);

  return null;
};
