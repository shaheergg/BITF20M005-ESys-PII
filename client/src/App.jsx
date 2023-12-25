import { Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import { Public } from "./routes/Public";
import { Private } from "./routes/Private";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Public />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<Private />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
