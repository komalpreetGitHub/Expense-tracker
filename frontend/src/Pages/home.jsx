// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import './home.css'; // Import your CSS file

// axios.defaults.baseURL = "http://localhost:4500/";

// const Home = () => {
//   const [expenses, setExpenses] = useState([]);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await axios.get('exp/allexp', {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         });

//         setExpenses(response.data.Expense);
//       } catch (error) {
//         console.error('Error fetching expenses:', error);
//       }
//     };
  
//     fetchExpenses();
//   }, []);

//   return (
//     <div className="expenses-container">
//       <h1>Expenses</h1>
//       <ul>
//         {expenses.map((expense, index) => (
//           <li key={index} className="expense-item">
//             <p>{expense.title}</p>
//             <p>{expense.money}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './home.css'; // Import your CSS file

axios.defaults.baseURL = "http://localhost:4500/";

const Home = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('exp/allexp', {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setExpenses(response.data.Expense);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
  
    fetchExpenses();
  }, []);

  return (
    <div className="expenses-table">
      <h1>Expenses</h1>
      <table>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td className="title-column">{expense.title}</td>
              <td className={`money-column ${expense.money < 0 ? 'negative' : 'positive'}`}>
                {expense.money}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

