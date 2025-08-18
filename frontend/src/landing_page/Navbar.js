import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
function Navbar() {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        await logout();
        navigate('/');
    };
    
    return (
        
            <nav className="navbar navbar-expand-lg  border-bottom"
            style={{backgroundColor:"#FFF"}}>
                <div className='container p-2'>
                <Link className="navbar-brand" to="/"><img src="media/images/logo.svg"
                style={{width: "25%" }}
                  alt='logo'/>
                  </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
                </button>
                

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
          <Link className="nav-link active" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
          <Link className="nav-link active" to="/product">Product</Link>
                        </li>
                        <li className="nav-item">
          <Link className="nav-link active" to="/pricing">Pricing</Link>
                        </li>
                        <li className="nav-item">
          <Link className="nav-link active" to="/support">Support</Link>
                        </li>
                        
                        {auth.isAuthenticated ? (
                            <>
                                <li className="nav-item">
            <Link className="nav-link active" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="nav-link active btn btn-link" 
                                        onClick={handleLogout}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
            <Link className="nav-link active" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
            <Link className="nav-link active" to="/signup">Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    </div>
                </div>
            </nav>
       
    );
}

export default Navbar;