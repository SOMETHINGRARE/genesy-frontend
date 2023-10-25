import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Asset from "./pages/Asset";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Edit from "./pages/Edit";
import Mint from "./pages/Mint";
import Faq from "./pages/Faq";
import Term from "./pages/Term";
import { useTheme } from "./context";
import { useTezosCollectStore } from "./store";

function App() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { activeAddress, fetchProfile, initializeContracts, fetchProfiles } = useTezosCollectStore();
  // Define an async function to be used in useEffect
  const fetchData = async () => {
    try {
      initializeContracts();
      fetchProfiles();
      const profile = await fetchProfile(activeAddress);

      if (Object.keys(profile).length === 0) {
        // Redirect to /signup if the profile is empty
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Call the async function
    fetchData();
  }, [activeAddress, fetchProfile, initializeContracts, fetchProfiles]);

  return (
    <div className={`${theme}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home/*" replace />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/assets/:tokenId" element={<Asset />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/term" element={<Term />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/profile/:address/*" element={<Profile />} />
        </Routes>
        <Footer />
    </div>
  );
}
export default App;
