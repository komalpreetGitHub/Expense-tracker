
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil'
import './home.css';
import { dataState } from '../../state';

axios.defaults.baseURL = "http://localhost:4500/";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [data, setData] = useRecoilState(dataState);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);



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



  const date = new Date();
  const month = date.getMonth();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]



  const filterData = (dataToFilter) => {
    let filtered = dataToFilter
    if (fromDate) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(fromDate))
    }

    if (toDate) {
      filtered = filtered.filter(item => new Date(item.date) <= new Date(toDate))
    }
    setFilteredData(filtered)

    let temptotal = 0
    filtered.forEach((item) => {

      temptotal += item.money;

    })
    setTotal(temptotal)
  }





  useEffect(() => {

    if (fromDate || toDate) {
      filterData(expenses)
    } else {
      const monthlyExpenditure = expenses.filter((item) => parseInt(item.date.slice(5, 7)) === month + 1)

      setFilteredData(monthlyExpenditure)
      let temptotal = 0
      monthlyExpenditure.forEach((item) => {

        temptotal += item.money;

      })
      setTotal(temptotal)
    }
  }, [fromDate,toDate,expenses])


  return (
    <div className="expenses-table">
      <div className="date-filter-container">
        <label className="date-label">From</label>
        <input
          type="date"
          name="expenseDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="form-control date-input"
        />
        <label  className="date-label">To</label>
        <input
          type="date"
          name="expenseDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="form-control date-input"
        />
      </div>
      <h1>Expenses</h1>
      {filteredData && filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th className='exp'>Expense</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((expense, index) => (
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


