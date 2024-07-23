import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./useAuthContext";

const SocketContext = createContext<{
  socket: Socket | null;
  setConversationId: (data: string | null) => void;
}>({
  socket: null,
  setConversationId: () => null,
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
  const [conversationId, setConversationId] = useState<string | null>(null);

  const { isAuth, user } = useAuth();

  useEffect(() => {
    if (isAuth && user && conversationId) {
      const socket = io("http://localhost:3000/", {
        query: {
          conversationId: conversationId,
        },
      });
      setSocket(socket);
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [isAuth, user, conversationId]);

  return (
    <SocketContext.Provider value={{ socket, setConversationId }}>
      {children}
    </SocketContext.Provider>
  );
};
