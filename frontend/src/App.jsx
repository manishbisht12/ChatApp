import Login from "./login/login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./register/Register";
import { VerifyUser } from "./utils/VerifyUser";
import Home from "./home/home";

function App() {
  return (
    <>
      <div className="p-2 w-screen h-screen flex items-center justify-center">
        <Routes>

          {/* ✅ Redirect root "/" to "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* ✅ Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Protected route under VerifyUser */}
          <Route element={<VerifyUser />}>
            <Route path="/home" element={<Home />} />
          </Route>

        </Routes>

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
