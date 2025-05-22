import React, { useState } from 'react';
import buttonValues from '../buttonvalues';

function Buttons() {
  const [value, setValue] = useState("");
  const operators = ["+", "-", "*", "/", "%", "."];

  function handleClick(event) {
    const whichButtonIsClicked = event.target.value;

    if (whichButtonIsClicked === "AC") {
      setValue(""); // Καθαρισμός
    } else if (whichButtonIsClicked === "⇚") {
      setValue(prev => prev.slice(0, -1)); // Διαγραφή τελευταίου χαρακτήρα
    } else if (whichButtonIsClicked === "=") {
      setValue(prev => {
        try {
          const result = eval(prev);
          return Number(result).toLocaleString("el-GR")
        } catch {
          return "🤷‍♀️";
        }
      });
    } else if (operators.includes(whichButtonIsClicked)) {
      setValue(prev => {
        const lastChar = prev.slice(-1);
        

        // Αν το τελευταίο είναι τελεστής
        if (operators.includes(lastChar)) {
          // Επιτρέπουμε μόνο περίπτωση π.χ. 7 + -5
          if (whichButtonIsClicked === "-" && !["-", "+"].includes(lastChar)) {
            return prev + whichButtonIsClicked;
          }
          // Διαφορετικά μπλοκάρουμε
          return prev;
        }

        // Προσθήκη τελεστή (αν όλα εντάξει)
        return prev + whichButtonIsClicked;
      });
    } else {
      // Αν δεν είναι τελεστής, απλά πρόσθεσέ το
      setValue(prev => prev + whichButtonIsClicked);
    }
  }

  return (
    <div>
      <h1>{value || "0"}</h1>
      <div className="buttons-container">
        {buttonValues.map((btn, index) => (
          <button
            key={index}
            value={btn}
            onClick={handleClick}
            className={
              btn==="=" ?
              "yellow"
             : (operators.includes(btn) || btn === "AC" || btn === "⇚")
             ? "green"
             : " "
            }
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Buttons;
