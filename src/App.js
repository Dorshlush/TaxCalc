import './App.css';
import HomePage from "./components/homePage"
import LandingPage from './components/landingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/registerForm';
import LoginPage from './components/loginPage'


function App() {
  return (
    <div className="App">
   {/* <HomePage/> */}
   {/* <LandingPage/> */}
   <Routes>
        
        <Route path="/" element={<LandingPage />}/>
        <Route path="/calculate" element={<HomePage />}/>
        <Route path="/register" element={<RegistrationForm />}/>
        <Route path="/login" element={<LoginPage/>}/>

        
    </Routes>

    </div>
  );
}

export default App;
