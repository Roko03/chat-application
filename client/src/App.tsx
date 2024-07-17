import "./app.scss";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { AuthManagerProvider } from "./util/useAuthContext";

function App() {
  return (
    <AuthManagerProvider>
      <RouterProvider router={router} />
    </AuthManagerProvider>
  );
}

export default App;
