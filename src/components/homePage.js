import React, { useState ,useContext} from 'react';
import './homePage.css'; // External CSS file for styling
import ClipLoader from "react-spinners/ClipLoader";
import { AppContext } from './context';
import { useNavigate } from 'react-router-dom';



// Define the main component for the tax calculator page
const TaxCalculator = () => {
    const {fullName,setFullName,taxCreditPoints, setTaxCreditPoints,salary,setSalary,userData}=useContext(AppContext)
  const [educationFund, setEducationFund] = useState(null);
  const [educationFundValue, setEducationFundValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [healthTax,setHealthTax]=useState(0)
  const [nationalInsu,setNationalInsu]=useState(0)
  const [taxResult, setTaxResult] = useState(null);
  let tax=Math.round(taxResult-(taxCreditPoints*223))
  if (tax<0){
    tax=0
  }
  const navigator=useNavigate()


  // Function to handle form submission
  function calculateIncomeTax(income) {
    let taxAmount = 0;
  
    if (income <= 6790) {
      taxAmount = income * 0.1;
    } else if (income <= 9730) {
      taxAmount = 6790 * 0.1 + (income - 6790) * 0.14;
    } else if (income <= 15620) {
      taxAmount = 6790 * 0.1 + (9730 - 6790) * 0.14 + (income - 9730) * 0.2;
    } else if (income <= 21710) {
      taxAmount = 6790 * 0.1 + (9730 - 6790) * 0.14 + (15620 - 9730) * 0.2 + (income - 15620) * 0.31;
    } else if (income <= 45180) {
      taxAmount = 6790 * 0.1 + (9730 - 6790) * 0.14 + (15620 - 9730) * 0.2 + (21710 - 15620) * 0.31 + (income - 21710) * 0.35;
    } else if (income <= 58190) {
      taxAmount = 6790 * 0.1 + (9730 - 6790) * 0.14 + (15620 - 9730) * 0.2 + (21710 - 15620) * 0.31 + (45180 - 21710) * 0.35 + (income - 45180) * 0.47;
    } else {
      taxAmount = 6790 * 0.1 + (9730 - 6790) * 0.14 + (15620 - 9730) * 0.2 + (21710 - 15620) * 0.31 + (45180 - 21710) * 0.35 + (58190 - 45180) * 0.47 + (income - 58190) * 0.5;
    }
  
    setTaxResult (taxAmount);
  }

  function calculateInsurance(salary) {
    let nationalInsurance = 0;
    let healthInsurance = 0;
  
    if (salary <= 7122) {
      nationalInsurance = salary * 0.004;
      healthInsurance = salary * 0.031;
    } else if (salary <= 47465) {
      nationalInsurance = 7122 * 0.004 + (salary - 7122) * 0.07;
      healthInsurance = 7122 * 0.031 + (salary - 7122) * 0.05;
    } else {
      nationalInsurance = 7122 * 0.004 + (47465 - 7122) * 0.07;
      healthInsurance = 7122 * 0.031 + (47465 - 7122) * 0.05;
    }
  setNationalInsu(nationalInsurance)
  setHealthTax(healthInsurance)
    
  }
  
  function calculateEducationFund(salary) {
    
    let educationFund;
  
    if (salary <= 15712) {
      educationFund = salary * 0.025;
    } else {
      educationFund = 392.8;
    }
  
    setEducationFundValue( educationFund);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true); // Show the loader
  
    // Simulate a delay of 2 seconds before performing calculations
    setTimeout(() => {
      calculateIncomeTax(salary);
      calculateInsurance(salary);
      calculateEducationFund(salary);
      setIsLoading(false); // Hide the loader
    }, 2000);
  };
  

  return (
    <div className="container">

      <h1>מחשבון נטו:</h1>
     <div hidden={localStorage.getItem('token')?false:true}> <h3>
      שלום {fullName} רוצה לשפר את תנאי הפנסיה שלך?{" "}
      <a href="https://www.harel-group.co.il/Pages/default.aspx/">לחץ כאן!</a>
    </h3><button  onClick={()=>{
          localStorage.removeItem('token')
          navigator("/")
        }}>התנתק</button></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="salary">שכר בסיס:</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <label htmlFor="taxCreditPoints">נקודות זיכוי:</label>
        <input
          type="number"
          id="taxCreditPoints"
          value={taxCreditPoints}
          onChange={(e) => setTaxCreditPoints(e.target.value)}
          required
        />


        <label htmlFor="educationFund">קרן השתלמות:</label>
        <input 
          type="checkbox"
          id="educationFund"
          checked={educationFund}
          onChange={(e) => setEducationFund(e.target.checked)}
        />

        <button type="submit">חשב</button>
      </form>

      {taxResult !== null && (
        <div className="result">
          <h2>שכר נטו:</h2>
          <h3>מס הכנסה: {tax+"₪"}</h3>
          <h3>הפרשות עובד לפנסיה: {Math.round(salary*0.06)+"₪"}</h3>
          <h3>   פנסיה נצברת (כולל הפרשות מעסיק):  {Math.round(salary*0.06+salary*0.06+salary*0.065)+"₪"}</h3>
          <h3>דמי ביטוח לאומי: {Math.round(nationalInsu)+"₪"}</h3>
          <h3>דמי ביטוח בריאות: {Math.round(healthTax)+"₪"}</h3>
          {educationFund && (
          <h3>קרן השתלמות: {Math.round(educationFundValue)+"₪"}</h3>
          )}
<h3>שכר הנטו שלך יעמוד על: {Math.round(salary - tax - (salary * 0.06) - nationalInsu - healthTax - (educationFund ? educationFundValue : 0))+"₪"}</h3>

        

        </div>
      )}
       {isLoading && (
        <div className="loading-overlay">

          <ClipLoader color="#0077ff" size={100} />
        </div>
      )}
    </div>
  );
};

export default TaxCalculator;
