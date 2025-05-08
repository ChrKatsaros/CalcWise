import React, { useState } from 'react';
import buttonValues from '../buttonvalues';

const Buttons = ({ onButtonClick }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false); // Αν υπάρχει σφάλμα

  const handleButtonClick = (value) => {
    console.log('Button clicked:', value);

    if (value === 'AC') {
      setInput('');
      setError(false);
    } else if (value === '=') {
      try {
        setInput(eval(input).toString());
        setError(false);
      } catch {
        setInput('🤷');
        setError(true);
      }
    } else if(value === "⇚") {
      setInput(prevInput => prevInput.slice(0, -1)); /* διαγραφει το τελευταιο ινπουτ ποθ πληκτρολογηθηκε */
    
    }else {
      // Αν είχε γίνει λάθος πριν, καθάρισε πρώτα πριν γράψει νέο input
      if (error) {
        setInput(value);
        setError(false);
      } else {
        setInput(prevInput => prevInput + value);
      }
    }

    onButtonClick(value);
  };

  return ( 
    <div> 
      <h1>{input || '0'}</h1> {/* Εδώ επιστρέφουμε απλώς το input χωρίς το format */}
      <div className='buttons-container'>
        {buttonValues.map((val, index) => (
            <button
         key={index}
         onClick={() => handleButtonClick(val)}
         style={{
           backgroundColor: val === '=' ? 'yellow' : '', // Κίτρινο για το "="
           color: ['AC', '⇚', '%', '/', '+', '-', '*'].includes(val) ? '#0f0' : '', // Πράσινο χρώμα (color: #0f0) για συγκεκριμένα κουμπιά
         }}
       >
         <span>{val}</span>
       </button>
        ))}
      </div>
    </div>
  );
};

export default Buttons;
