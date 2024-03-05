import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DebtList from './DebtTracker/DebtList'
import DebtForm from './DebtTracker/DebtForm'
import axios from 'axios';





function App() {
  const [debtData, setDebtData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/debt-trackers/');
        console.log(response);
        setDebtData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode ? JSON.parse(storedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.className = isDarkMode ? 'dark-mode' : 'normal-mode';
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <div className={isDarkMode ? 'dark-mode' : 'normal-mode'}>
      <button onClick={toggleMode} className='btn-hover'>{isDarkMode ? 'Light': 'Dark'}</button>
      <div>
        <h3 className='text-center'>Debt Tracker</h3>
        <hr />
        <div className='container-fluid debt-main-container'>
          <div className="container-fluid">
            <div className='p-3'>
              <div className="row">
                <div className="form-container col-xl-3 col-lg-4 col-12">
                  <div className="form col-12">
                    <DebtForm 
                    debtData={debtData}
                    setDebtData={setDebtData}
                    fetchData={fetchData}
                    />
                  </div>
                </div>
                <div className="form-data-container col-xl-9 col-lg-8 col-12">
                  <div className="form-data col-12">
                    <DebtList 
                    debtData={debtData}
                    setDebtData={setDebtData}
                    isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default App
