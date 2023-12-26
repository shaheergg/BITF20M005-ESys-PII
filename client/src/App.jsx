import { Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import { Public } from "./routes/Public";
import { Private } from "./routes/Private";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AddStudent from "./pages/AddStudent";
import Students from "./pages/Students";
import Logs from "./pages/Logs";
import UpdateStudent from "./pages/UpdateStudent";

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
            <Route path="add-student" element={<AddStudent />} />
            <Route path="students" element={<Students />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/students/:id" element={<UpdateStudent />} />
          </Route>
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
