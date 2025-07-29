import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import VerificationForm from "../components/VerificationForm";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify" element={<VerificationForm />} />
        <Route path="*" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;