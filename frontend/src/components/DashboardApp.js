import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const DashboardApp = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!auth.isAuthenticated && !auth.isLoading) {
      navigate('/login');
    }
  }, [auth, navigate]);

  // Show loading while checking authentication
  if (auth.isLoading) {
    return <div className="loading">Loading...</div>;
  }

  // If authenticated, render the dashboard
  return auth.isAuthenticated ? (
    <div className="dashboard-wrapper">
      <div className="topbar-container">
        <div className="indices-container">
          <div className="nifty">
            <p className="index">NIFTY 50</p>
            <p className="index-points">18,245.32</p>
            <p className="percent">+1.2%</p>
          </div>
          <div className="sensex">
            <p className="index">SENSEX</p>
            <p className="index-points">61,112.45</p>
            <p className="percent">+0.9%</p>
          </div>
        </div>
        <div className="menu-container">
          <img src="/media/images/logo.svg" alt="Zerodha" style={{ width: "50px" }} />
          <div className="menus">
            <ul>
              <li><p className="menu selected">Dashboard</p></li>
              <li><p className="menu">Orders</p></li>
              <li><p className="menu">Holdings</p></li>
              <li><p className="menu">Positions</p></li>
              <li><p className="menu">Funds</p></li>
            </ul>
          </div>
          <div className="profile">
            <div className="avatar">{auth.user ? auth.user.charAt(0).toUpperCase() : 'U'}</div>
            <div className="username">{auth.user || 'User'}</div>
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="watchlist-container">
          <div className="search-container">
            <input className="search" placeholder="Search stocks..." />
            <span className="counts">0/50</span>
          </div>
          <ul className="list">
            <li>
              <div className="item">
                <div className="item-info">
                  <span>RELIANCE</span>
                  <span>2,456.75</span>
                  <span>+1.2%</span>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <div className="item-info">
                  <span>TCS</span>
                  <span>3,245.60</span>
                  <span>+0.5%</span>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <div className="item-info">
                  <span>HDFC</span>
                  <span>1,678.90</span>
                  <span>-0.3%</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content">
          <h2>Welcome to your Dashboard, {auth.user || 'User'}!</h2>
          <p>Your portfolio summary and market updates will appear here.</p>
          <div className="row">
            <div className="col">
              <h5>₹0.00</h5>
              <p>Equity</p>
            </div>
            <div className="col">
              <h5>₹0.00</h5>
              <p>Margin available</p>
            </div>
            <div className="col">
              <h5>₹0.00</h5>
              <p>Today's P&L</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default DashboardApp;