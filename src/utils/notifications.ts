import { notification } from "antd";

export const APIErrorNotification = () => {
  notification.open({
    message: "Something went wrong with the request",
    description:
      "An unexpected error ocurred. If it persists, contact the site administrator",
  });
};
