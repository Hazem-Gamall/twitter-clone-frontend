import { Spinner } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { notificationsServiceFactory } from "../services/httpServiceFactories";
import { INotification } from "../types/Notification";
import { NotificationItem } from "../components/Notifications/NotificationItem";
import { useEffect } from "react";
import { API_BASE_URL } from "../services/apiClient";

export const Notifications = () => {
  const { auth } = useAuth();
  const { data, setData, isLoading, lastElementRef } =
    useInfiniteScroll<INotification>(
      notificationsServiceFactory(auth?.username as string),
      {},
      [],
      0,
      10
    );

  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/notifications/sse/`, {
      withCredentials: true,
    });
    eventSource.onmessage = (ev) => {
      const notification = JSON.parse(ev.data);
      if (notification.ping) return;
      setData((prev) => [notification, ...prev]);
    };
    return () => eventSource.close();
  }, []);

  const viewNotification = (notification: INotification) => {
    setData(
      data.map((n) => (n.id === notification.id ? { ...n, viewed: true } : n))
    );
  };
  return (
    <>
      {data &&
        data.map((notification, ind) => (
          <NotificationItem
            key={notification.id}
            viewNotification={viewNotification}
            username={auth?.username as string}
            ref={ind === data.length - 1 ? lastElementRef : null}
            notification={notification}
          />
        ))}
      {isLoading && <Spinner alignSelf={"center"} />}
    </>
  );
};
