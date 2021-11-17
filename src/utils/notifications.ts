import { notification } from "antd";

export const APIErrorNotification = (message: string, description: string) => {
  notification.open({
    message,
    description,
  });
};
