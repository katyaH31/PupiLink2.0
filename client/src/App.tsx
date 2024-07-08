import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatWindow from "./components/ChatWindow";
import Navbar from "./components/Navbar";
import PupilinkRoutes from "./enums/PupilinkRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import LodgingDetails from "./pages/LodgingDetails";
import Login from "./pages/Login";
import MyAds from "./pages/MyAds";
import MyRequests from "./pages/MyRequests";
import NotFound from "./pages/NotFound";
import PublishForm from "./pages/PublishForm";
import Register from "./pages/Register";
import AuthService from "./services/AuthService";
import DefaultTheme from "./themes/DefaultTheme";

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <ToastContainer />
        <Router>
          <Routes>
            {/* Private Routes*/}
            <Route path={PupilinkRoutes.ROOT} element={<LayoutWithNavbar><Home /></LayoutWithNavbar>} />
            <Route path={PupilinkRoutes.PUBLISH_FORM} element={<LayoutWithNavbar><PublishForm /></LayoutWithNavbar>} />
            <Route path={PupilinkRoutes.LODGING_DETAILS} element={<LayoutWithNavbar><LodgingDetails /></LayoutWithNavbar>} />
            <Route path={PupilinkRoutes.MY_REQUESTS} element={<LayoutWithNavbar><MyRequests /></LayoutWithNavbar>} />
            <Route path={PupilinkRoutes.MY_ADS} element={<LayoutWithNavbar><MyAds /></LayoutWithNavbar>} />

            {/* Public Routes*/}
            <Route path={PupilinkRoutes.REGISTER} element={<Register />} />
            <Route path={PupilinkRoutes.LOGIN} element={<Login />} />
            <Route path={PupilinkRoutes.FORGOT_PASSWORD} element={<ForgotPassword />} />

            {/*404 Route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}


const LayoutWithNavbar = ({ children }: LayoutProps) => (
  <>
    <Navbar />
    {children}
    {AuthService.isLoggedIn() && <ChatWindow />}
  </>
);

export default App;
