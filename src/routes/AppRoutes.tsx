import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import VerificationForm from "../components/VerificationForm";
import Login from "../components/Login";
import Home from "../components/Home";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify" element={<VerificationForm />} />
        <Route path ="/login" element = {<Login />} />
        <Route path="/home/" element={<Home />} />
        <Route path="*" element={<RegisterForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;