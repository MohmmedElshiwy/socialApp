import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthContectProvider from "./Context/AuthContect.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostContextProvider } from "./Context/PostContext.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <PostContextProvider>
      <HeroUIProvider>
        <AuthContectProvider>
          <UserContextProvider>
            
            <App />

            <Toaster position="top-center" reverseOrder={false} />
          </UserContextProvider>
        </AuthContectProvider>
      </HeroUIProvider>
    </PostContextProvider>
  </QueryClientProvider>
);
