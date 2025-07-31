import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgentList from "../components/AgentList";
import RegisterForm from "../components/RegistrationForm";



function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/agents" element={<AgentList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<RegisterForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;