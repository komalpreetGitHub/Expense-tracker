
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil'
import './home.css';
import { dataState } from '../../state';

axios.defaults.baseURL = "http://localhost:4500/";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [data ,setData] = useRecoilState(dataState);


  const date = new Date();
  const month = date.getMonth();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  useEffect(() => {
    const fetchExpenses = async () => {

      const response = await axios.get('exp/allexp', {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const sortedData = response.data.Expense.sort((a, b) => {

        const date_a = new Date(a.date)
        const date_b = new Date(b.date)
        return date_b.getTime() - date_a.getTime()
      })
      setExpenses(sortedData);
      setData(sortedData)
    }


  fetchExpenses();
}, []);



useEffect(() => {
  let temptotal = 0
  expenses.forEach((item) => {
    if (parseInt(item.date.slice(5, 7)) === month + 1) {
      temptotal += item.money;
    }
  })
  setTotal(temptotal)
}, [expenses])


return (
  <div className="expenses-table">
    <h1>Expenses</h1>
    {expenses && expenses.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th className='exp'>Expense</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td className="title-column">{expense.title}</td>
              <td>{expense.date}</td>
              <td className={`money-column ${expense.money < 0 ? 'negative' : 'positive'}`}>
                {expense.money}
              </td>
            </tr>
          ))}
        </tbody>
      </table>)
      :
      (<h3 className="nodata">No data found</h3>)
    }
    <h1>{months[month]}:{total}</h1>
  </div>
);
};

export default Home;
