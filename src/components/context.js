import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext();
const Context = (props) => {
const { children } = props;
const [fullName,setFullName]=useState('משתמש אורח')
const [taxCreditPoints, setTaxCreditPoints] = useState(2.25);
const[salary,setSalary]=useState(0)
const[userData,setUserData]=useState({})





 return (
    <AppContext.Provider
      value={{fullName,setFullName,taxCreditPoints, setTaxCreditPoints,userData,setUserData,salary,setSalary
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;