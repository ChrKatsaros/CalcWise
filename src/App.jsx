import React from 'react';
import Buttons from './components/Buttons';
import logo from "./assets/logo.gif";
import Footer from "./components/Footer"

export const App = () => {
  return (
    <>
    <div className="page-wrapper">
      <div className='logoTextAndLogo'>
        <h4 className="logo-text">
          CalcWise “<span className='smart'>Smart</span>. <span className='simple'>Simple</span>. <span className="solved">Solved</span>.”
        </h4>
        <img src={logo} alt="logo" className="logo" draggable="false" />
      </div>
        <div className="calculator-body">
          <Buttons />
        </div>
      
      
    </div>
    <Footer />
    </>
  );
};

export default App;
