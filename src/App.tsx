import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Edit from "./pages/Edit";
import Mint from "./pages/Mint";
import Faq from "./pages/Faq";
import Nft from "./pages/Nft";
import { useTheme } from "./context";
import { useTezosCollectStore } from "./store";
import ListforSale from "./pages/ListforSale";

function App() {
  const { theme } = useTheme();
  const { initializeContracts } = useTezosCollectStore();
  useEffect(() => {
    initializeContracts();
  }, [initializeContracts]);
  return (
    <div className={`${theme}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home/*" replace />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/assets/:id" element={<Buy />} />
          <Route path="/collection/:id" element={<ListforSale />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/nft" element={<Nft />} />
          <Route path="/profile/:address/*" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
