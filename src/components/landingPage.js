import React from 'react';
import './landingPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './context';
import { useEffect } from 'react';

const LandingPage = () => {
  const navigator=useNavigate()

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigator("/calculate")
    }
  }, []);
  const {userData,fullName}=useContext(AppContext)

  return (
    <div className="container">
     <Link to="/login"><button className='loginBtn' hidden={localStorage.getItem('token')?true:false}>התחבר</button></Link> 
      <h1 h>שלום </h1> 
      
      <div className="buttons">
       <Link to="/calculate">  <button className="secondary-button">השתמש מבלי להרשם</button></Link>
       <Link to="/register"> <button className="secondary-button">הרשם כאן עבור מידע מדויק </button></Link>
      </div>
    </div>
  );
};

export default LandingPage;
