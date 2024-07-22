import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./useAuthContext";

const SocketContext = createContext<{
  socket: Socket | null;
}>({
  socket: null,
});

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (socket === undefined) {
    throw new Error("useSocket must be use with a provider");
  }

  return socket;
};

export const SocketManagerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const { isAuth, user } = useAuth();

  useEffect(() => {
    if (isAuth && user) {
      const socket = io("http://localhost:3000/", {
        query: {
          userId: user._id,
        },
      });
      setSocket(socket);
      return () => {
        socket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [isAuth, user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
