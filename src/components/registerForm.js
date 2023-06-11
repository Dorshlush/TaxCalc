import React, { useState } from 'react';
import './registerForm.css';
import { AppContext } from './context';
import { useContext } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
  const {fullName,setFullName, setTaxCreditPoints,salary,setSalary,setUserData}=useContext(AppContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(16);
  const [gender, setGender] = useState('');
  const [specialConditions, setSpecialConditions] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
    section7: false,
  });

  const [agreement, setAgreement] = useState(false);
  const navigator=useNavigate()

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!agreement) {
      alert('Please agree to the terms and conditions.');
      return;
    }
  
    // Calculate taxCreditPoints based on the provided logic and terms
    let taxCreditPoints = 2.25;
    if (age < 18) {
      taxCreditPoints += 1;
    }
    if (gender ==='female') {
      taxCreditPoints += 0.5;
    }
    if (specialConditions.section1) {
      taxCreditPoints += 2;
    }
    if (specialConditions.section2) {
      taxCreditPoints += 1;
    }
    if (specialConditions.section3) {
      taxCreditPoints += 2;
    }
    if (specialConditions.section4) {
      taxCreditPoints += 2;
    }
    if (specialConditions.section5) {
      taxCreditPoints += 2;
    }
    if (specialConditions.section6) {
      taxCreditPoints += 1;
    }
  setTaxCreditPoints(taxCreditPoints)
    // Create the object with the form data
    const formData = {
      fullName: fullName,
      email,
      password,
      age,
      gender,
      taxCreditPoints,
      salary,
      periferia: specialConditions.section7,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);
       localStorage.setItem("token",response.data)
       console.log(response.data)
       const userD=await axios.post('http://localhost:5000/api/users/userdetails',formData)
       setUserData(userD.data)
       setTaxCreditPoints(userD.data.taxCreditPoints) 
       setSalary(userD.data.salary) 
           
      
      
       navigator("/calculate")
       
      
      
    } catch (error) {
      alert(error)
      
    }
  };
  
    const handleAgreementChange = (e) => {
        setAgreement(e.target.checked);
      };
  const handleSpecialConditionsChange = (section, value) => {
    setSpecialConditions((prevConditions) => ({
      ...prevConditions,
      [section]: value,
    }));
  };

  return (
    <div className="container">
      <h1>הרשמה</h1>
      <form onSubmit={handleRegistration}>
        <label> שם מלא</label>
        <input
          type="text"
          id="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <label htmlFor="email">אימייל</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">סיסמה</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="age">גיל</label>
        <input
          type="number"
          id="age"
          value={age}
          min={16}
          max={120}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <label htmlFor="age">משכורת ברוטו</label>
        <input
          type="number"
          id="salaray"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <label htmlFor="gender">מין בתעודת הזהות</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">בחר</option>
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
          
        </select>

        <div className="special-conditions">
          <h2>תנאים מיוחדים</h2>
          <div className="condition-section">
          <input
              type="checkbox"
              id="section1"
              checked={specialConditions.section1}
              onChange={(e) =>
                handleSpecialConditionsChange('section1', e.target.checked)
              }
            />
            <label htmlFor="section1">אם בן/בת זוג שלא עובד או עיוור, או נמצא בגיל פרישה, או שנקבעה לו נכות של לפחות 90% </label>
           
          </div>

          <div className="condition-section">
          <input
              type="checkbox"
              id="section2"
              checked={specialConditions.section2}
              onChange={(e) =>
                handleSpecialConditionsChange('section2', e.target.checked)
              }
            />
            <label htmlFor="section2">הורה יחיד או שבן הזוג השני אינו משתתף בגידול הילד או גרוש משלם מזונות שנישא בשנית</label>
            
          </div>

          <div className="condition-section">
          <input
              type="checkbox"
              id="section3"
              checked={specialConditions.section3}
              onChange={(e) =>
                handleSpecialConditionsChange('section3', e.target.checked)
              }
            />
            <label htmlFor="section3">הורה לילד שנמצא על הספקטרום האוטיסטי</label>
           
          </div>

          <div className="condition-section">
          <input
              type="checkbox"
              id="section4"
              checked={specialConditions.section4}
              onChange={(e) =>
                handleSpecialConditionsChange('section4', e.target.checked)
              }
            />
            <label htmlFor="section4">חייל משוחרר עד 3 שנים</label>
           
          </div>

          <div className="condition-section">
          <input
              type="checkbox"
              id="section5"
              checked={specialConditions.section5}
              onChange={(e) =>
                handleSpecialConditionsChange('section5', e.target.checked)
              }
            />
            <label htmlFor="section5">עולה חדש</label>
           
          </div>

          <div className="condition-section">
          <input
              type="checkbox"
              id="section6"
              checked={specialConditions.section6}
              onChange={(e) =>
                handleSpecialConditionsChange('section6', e.target.checked)
              }
            />
            <label htmlFor="section6">סיימתי לימודי תואר או מקצוע</label>
            
          </div>

          <div className="condition-section">
          <input
              type="checkbox"
              id="section7"
              checked={specialConditions.section7}
              onChange={(e) =>
                handleSpecialConditionsChange('section7', e.target.checked)
              }
            />
            <label htmlFor="section7">תושב הפריפריה</label>
           
          </div>
        </div>

        <button type="submit">הרשמה</button>
        <div className="condition-section">
            <input
              type="checkbox"
              id="agreement"
              checked={agreement}
              onChange={handleAgreementChange}
            />
            <label htmlFor="agreement">
              אני מסכים לתנאי השימוש באתר וקבלת דיוור אינטרנטי
            </label>
          </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
