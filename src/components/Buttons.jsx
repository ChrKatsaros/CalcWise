import React, { useState } from 'react';
import buttonValues from '../buttonvalues';

const Buttons = ({ onButtonClick }) => {
  const [input, setInput] = useState('');        // κρατάει την είσοδο του χρήστη
  const [error, setError] = useState(false);     // true αν υπάρχει κάποιο σφάλμα

  const operators = ['+', '-', '*', '/', '%'];   // επιτρεπόμενοι τελεστές

  const formatNumber = (val) => Number(val).toLocaleString('de-CH');  // μορφοποίηση με απόστροφο

  const formatInput = (input) => {
    const parts = input.split(/([+\-*/%])/);      // χωρίζει αριθμούς και τελεστές
    const formatted = parts.map(part =>
      /^[0-9.]+$/.test(part)                      // αν είναι αριθμός
        ? Number(part).toLocaleString('de-CH')    // βάλε απόστροφο
        : part                                    // αλλιώς άστο ως έχει
    );
    return formatted.join('');                   // ένωση όλων σε string
  };

  const handleButtonClick = (value) => {
    console.log('Button clicked:', value);

    if (value === 'AC') {
      setInput('');       // καθαρισμός εισόδου
      setError(false);    // καθαρισμός σφάλματος
    } else if (value === '=') {
      try {
        const trimmedInput = input.trim();   // αφαιρεί κενά

        if (
          operators.includes(trimmedInput[0]) && trimmedInput[0] !== '-'
        ) {
          setInput('🤷');   // σφάλμα: ξεκινάει με τελεστή
          setError(true);
          return;
        }

        const result = eval(input);                          // υπολογισμός με eval
        const rounded = Number.isInteger(result)
          ? result
          : result.toFixed(3);                               // στρογγυλοποίηση αν δεκαδικός
        setInput(rounded.toString());                        // εμφάνιση αποτελέσματος
        setError(false);
      } catch {
        setInput('🤷');   // σφάλμα κατά τον υπολογισμό
        setError(true);
      }
    } else if (value === '⇚') {
      setInput(prevInput => prevInput.slice(0, -1));  // backspace
    } else {
      if (error) {
        setInput(value);     // επανεκκίνηση μετά από σφάλμα
        setError(false);
      } else {
        setInput(prevInput => {
          const lastChar = prevInput.slice(-1);    // τελευταίος χαρακτήρας

          if (
            operators.includes(lastChar) &&
            operators.includes(value)
          ) {
            if (
              value === '-' &&
              ['*', '/', '+'].includes(lastChar)
            ) {
              return prevInput + value;     // επιτρέπεται το 7*-7
            }
            return prevInput;               // μπλοκ διπλών τελεστών
          }

          return prevInput + value;         // προσθήκη κανονικού χαρακτήρα
        });
      }
    }

    onButtonClick(value);  // ενημέρωση γονέα (αν χρειάζεται)
  };

  return (
    <div>
      <h1>
        {input && !error
          ? formatInput(input)   // εμφάνιση με απόστροφο
          : input || '0'}        // ή 0 αν είναι κενό
      </h1>
      <div className='buttons-container'>
        {buttonValues.map((val, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(val)}  // πατάμε το κουμπί
            style={{
              backgroundColor: val === '=' ? 'yellow' : '',  // τονίζουμε το =
              color: ['AC', '⇚', '%', '/', '+', '-', '*'].includes(val) ? '#0f0' : '',  // πράσινα τα ειδικά
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
