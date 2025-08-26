import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
export const url  = 'https://zerodha-backend-ko6u.onrender.com';

const Home = () => {
  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
