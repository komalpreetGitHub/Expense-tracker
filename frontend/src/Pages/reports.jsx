
import { useRecoilState } from "recoil";
import { dataState } from "../../state";
import Doughnutchart from "../Components/piechart";
import { useState, useEffect } from "react";
// import "home.css";


const Reports = () => {

  const [select, setSelect] = useState("month")
  const [data] = useRecoilState(dataState);
  const [expenses, setExpenses] = useState([]);

  const date = new Date();
  const month = date.getMonth();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const today = date.getDate();
  const week = today - 7;

  //filter month
  const monthlyExpenditure = data.filter((item) => parseInt(item.date.slice(5, 7)) === month + 1)

  const todayExpenditure = data.filter((item) => (parseInt(item.date.slice(5, 7)) === month + 1) && (parseInt(item.date.slice(8, 10)) === today))

  const weekExpenditure = data.filter((item) => (parseInt(item.date.slice(5, 7)) === month + 1) && (parseInt(item.date.slice(8, 10)) >= week) && (parseInt(item.date.slice(8, 10)) <= today))


  console.log(todayExpenditure)
  console.log(weekExpenditure)

  let spend = 0
  let earn = 0


  if (select === "month") {
    monthlyExpenditure.forEach((item) => {
      if (item.money > 0) {
        earn += item.money
      }
      else {
        spend += item.money
      }
    });

    if (spend < earn) {
      earn += spend
    }
    else {
      earn = 0
    }
  }
  else if (select === "today") {
    todayExpenditure.forEach((item) => {
      if (item.money > 0) {
        earn += item.money
      }
      else {
        spend += item.money
      }
    });

    if (spend < earn) {
      earn += spend
    }
    else {
      earn = 0
    }

  }
  else {
    weekExpenditure.forEach((item) => {
      if (item.money > 0) {
        earn += item.money
      }
      else {
        spend += item.money
      }
    });

    if (spend < earn) {
      earn += spend
    }
    else {
      earn = 0
    }
  }

  useEffect(() => {

    if (select === "month") {
      setExpenses(monthlyExpenditure)
    }
    else if (select === "today") {
      setExpenses(todayExpenditure)
    }
    else {
      setExpenses(weekExpenditure)
    }
  }, [select])


  //percentage
  const total = Math.abs(spend) + earn;
  const spendp = (Math.abs(spend) / total) * 100;
  const earnp = (earn / total) * 100

  const values = {
    Spend: spend,
    Earn: earn
  }




  return (
    <div className="outer">
      <div className="d">
        <div className="select">
          <ul className="selectlist">
            <li onClick={() => setSelect("today")}>Today</li>
            <li onClick={() => setSelect("week")}>Week</li>
            <li onClick={() => setSelect("month")}>Month</li>
          </ul>
        </div>

        <h2>{months[month]}</h2>
        <div>
          <Doughnutchart values={values} title="current month expenditure" />
        </div>
        <br></br>
        <div className="se"> Spend: {spendp.toFixed(0)}%
          <br></br><br></br>
          Earn: {earnp.toFixed(0)}%</div>

        <div className="tbl">
          {expenses && expenses.length > 0 ? (
            <table >
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
        </div>
      </div>
    </div>
  )
}

export default Reports;