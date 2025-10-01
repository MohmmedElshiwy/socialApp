import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtecedPrvider({ children }) {
  const [isLoggedIn] = useState(localStorage.getItem("token") !== null);

  return isLoggedIn ? children : <Navigate to="/login" />;
}
