import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, ReactNode } from "react";
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
import Earn from "./pages/Earn"
import { useTheme } from "./context";
import { useTezosCollectStore } from "./store";

interface PlainPageLayoutProps {
  children: ReactNode;
}

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

  // Create a new component for pages without header and footer
  const PlainPageLayout: React.FC<PlainPageLayoutProps> = ({ children }) => {
    const { theme } = useTheme();
    return <div className={`${theme}`}>{children}</div>;
  };

  useEffect(() => {
    // Call the async function
    fetchData();
  }, [activeAddress, fetchProfile, initializeContracts, fetchProfiles]);

  return (
    <div className={`${theme}`}>
        <Routes>
          <Route path="/" element={
            <Navigate to="/home/*" replace />} 
          />
          <Route
          path="/home/*"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <SignUp />
              <Footer />
            </>
          }
        />
        <Route
          path="/edit"
          element={
            <>
              <Navbar />
              <Edit />
              <Footer />
            </>
          }
        />
        <Route
          path="/assets/:tokenId"
          element={
            <>
              <Navbar />
              <Asset />
              <Footer />
            </>
          }
        />
        <Route
          path="/faq"
          element={
            <>
              <Navbar />
              <Faq />
              <Footer />
            </>
          }
        />
          <Route
          path="/term"
          element={
            <>
              <Navbar />
              <Term />
              <Footer />
            </>
          }
        />
          <Route
          path="/mint"
          element={
            <>
              <Navbar />
              <Mint />
              <Footer />
            </>
          }
        />
           <Route
          path="/profile/:address/*"
          element={
            <>
              <Navbar />
              <Profile />
              <Footer />
            </>
          }
        />
          <Route
            path="/earn"
            element={
              <PlainPageLayout>
                <Earn />
              </PlainPageLayout>
            }
          />
        </Routes>
    </div>
  );
}
export default App;
