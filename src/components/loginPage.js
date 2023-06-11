import React, { useState,useContext } from 'react';
import axios from "axios"
import {  useNavigate } from 'react-router-dom';
import { AppContext } from './context';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userData,setUserData,setTaxCreditPoints,setSalary,setFullName}=useContext(AppContext)


  const navigator=useNavigate()
    
  const handleLogin = async (e) => {
    e.preventDefault();

    const confirmation = {
      email: email,
      password: password
  
    };
    

    try {
        const response = await axios.post('https://taxcalc-socx.onrender.com/api/login', confirmation);
         localStorage.setItem("token",response.data)
         console.log(response.data)
         const userD=await axios.post('https://taxcalc-socx.onrender.com/api/users/userdetails',confirmation)
         setUserData(userD.data)
         setTaxCreditPoints(userD.data.taxCreditPoints) 
         setSalary(userD.data.salary) 
         setFullName(userD.data.fullName)
         console.log(userD)
             
        
        
         navigator("/calculate")
         
        
        
      } catch (error) {
        alert(error)
        
      }
    
    };

  return (
    <div className="container">
      <h1>התחברות</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">אימייל</label>
        <input
        className='loginInp'
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">סיסמה</label>
        <input
          className='loginInp'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">התחברות</button>
      </form>
    </div>
  );
};

export default LoginForm;
