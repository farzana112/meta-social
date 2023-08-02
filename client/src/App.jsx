// import './App.css'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Auth from "./components/Auth/Auth.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminHome from "./pages/AdminHome/AdminHome"
import Profile from "./pages/Profile/Profile.jsx"
import OtpInput from "./pages/OTPInput/OtpInput.jsx"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx"
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import Conversation from "./components/Chat/Conversation.jsx";
import ChatPage from "./pages/Chat/Chat.jsx"
import CallPage from "./pages/Call/Call.jsx";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = useSelector((state) => state.token);
  const adminToken = useSelector((state) => state.adminToken);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* <Route path="/" element={<Login/>}/> */}
            {/* <Route
              path='/'
              element={token ? <Navigate to='home' /> : <Navigate to='auth' />}
            />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/> */}
            <Route
              path="/"
              element={token ? <Navigate to="home" /> : <Navigate to="auth" />}
            />
           

            <Route
              path="/home"
              element={token ? <Home /> : <Navigate to="../auth" />}
            />
            <Route
              path="/auth"
              element={token ? <Navigate to="../home" /> : <Auth />}
            />

<Route
              path='/profile/:userId'
              element={token ? <Profile/> : <Navigate to='/' />}
            />

            <Route
              path="/admin"
              element={
                adminToken ? <Navigate to="/admin/home" /> : <AdminLogin />
              }
            />

<Route
              path='/admin/home'
              element={adminToken ? <AdminHome /> : <Navigate to='/admin' />}
            />
            {/* <Route path="/admin"   element={<AdminLogin/>}/> */}

            <Route
              path='/chat/'
              element={token ? <ChatPage /> : <Navigate to='/' />}
            />

<Route
            path='/room/:roomId'
            element={token ? <CallPage /> : <Navigate to='/' />}
          />

            <Route
             path="/forgot-password"
             element={<ForgotPassword/>}
             />

<Route
             path="/reset-password/:id/:token"
             element={<ResetPassword/>}
             />



          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
