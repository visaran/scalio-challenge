import { notification } from "antd";

interface INotification {
  message: string;
  description?: string;
}

export const openNotification = ({
  message,
  description = "",
}: INotification) => {
  notification.open({
    message,
    description,
  });
};
