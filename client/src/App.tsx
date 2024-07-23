import "./app.scss";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { AuthManagerProvider } from "./util/useAuthContext";
import { SocketManagerProvider } from "./util/useSocketContext";

function App() {
  return (
    <AuthManagerProvider>
      <SocketManagerProvider>
        <RouterProvider router={router} />
      </SocketManagerProvider>
    </AuthManagerProvider>
  );
}

export default App;
