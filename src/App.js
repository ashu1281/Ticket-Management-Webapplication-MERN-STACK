import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login_poc from "./Components/Login_poc";
import SignUp from "./Components/SignUp";
import ForgotPass from "./Components/ForgotPass";
import Profile from "./Components/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import About from "./Components/About";
import AdminDashboard from "./Components/AdminDashboard";
import AgentDashboard from "./Components/AgentDashboard";
import TicketDetails from "./Components/TicketDetails";
import AdminLayout from "./Components/AdminLayout/AdminLayout";
import AgentLayout from "./Components/AgentLayout/AgentLayout";
import UserLayout from "./Components/UserLayout/UserLayout";
import Users from "./Components/Users";
import UserProfile from "./Components/UserProfile";
import Daily from './scenes/Daily';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    localStorage.setItem("mode", 'dark');
    const [mode, setMode] = useState(localStorage.getItem('mode'));
    let theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


    

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
  };

  return (
    //  <ThemeProvider theme={theme}>
    //  <CssBaseline />
    <div>
      {/* <Header/> */}
      <Routes>
        {/* Admin Layout */}
        <Route element={<AdminLayout onLogout={handleLogout} />}>
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <AdminDashboard onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* ticket Details */}
          <Route
            path="ticket/:ticketId"
            element={
              <PrivateRoute path="ticket/:ticketId" isLoggedIn={isLoggedIn}>
                <TicketDetails onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          {/* users details */}

          <Route
            path="user/:userId"
            element={
              <PrivateRoute path="user/:userId" isLoggedIn={isLoggedIn}>
                <UserProfile onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Users */}
          <Route
            path="users"
            element={
              <PrivateRoute path="/users" isLoggedIn={isLoggedIn}>
                <Users onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Daily */}

          <Route
            path='daily'
            element={
              <PrivateRoute path='/daily' isLoggedIn={isLoggedIn}>
                <Daily onLogout={handleLogout}/>
              </PrivateRoute>
            }
          />

        </Route>

        {/* User Layout */}
        <Route element={<UserLayout />}>
          <Route
            path="/profile"
            element={
              <PrivateRoute path="/profile" isLoggedIn={isLoggedIn}>
                <Profile onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          <Route
            path="/ticket/:ticketId"
            element={
              <PrivateRoute path="/ticket/:ticketId" isLoggedIn={isLoggedIn}>
                <TicketDetails onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Agent Layout */}
        <Route element={<AgentLayout />}>
          <Route
            path="/agent-dashboard"
            element={
              <PrivateRoute path="/agent-dashboard" isLoggedIn={isLoggedIn}>
                <AgentDashboard onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          <Route
            path="/ticket/:ticketId"
            element={
              <PrivateRoute path="/ticket/:ticketId" isLoggedIn={isLoggedIn}>
                <TicketDetails onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/" element={<Login_poc onLogin={handleLogin} />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <Footer/> */}
    </div>
    // </ThemeProvider>
  );
}
