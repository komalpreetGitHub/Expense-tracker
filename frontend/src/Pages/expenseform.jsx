import React, { useState } from "react";
import "./sign.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { pageState } from "../../state";

axios.defaults.baseURL = "http://localhost:4500";

const Expenses = () => {
  const [page, setPage] = useRecoilState(pageState);
  const [title, setTitle] = useState("");
  const [tempMoney, setTempMoney] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [type, setType] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!title) {
      errors.title = "Title is required";
    }
    if (!tempMoney) {
      errors.tempMoney = "Expenses is required";
    } else if (isNaN(tempMoney) || parseFloat(tempMoney) <= 0) {
      errors.tempMoney = "Expenses must be a valid positive number";
    }
    if (!expenseDate) {
      errors.expenseDate = "Date is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      let money = tempMoney;
      if (type === "spend") {
        money = -tempMoney;
      }
      try {
        const response = await axios.post(
          "/exp/addexp",
          { title, money, date: expenseDate },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );

        setPage("home");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed");
      }
    }
  };

  return (
    <div className="expense-container">
      <h2>Add Expenses</h2>
      <br></br>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Spend/Earn</label>
          <select onChange={(e) => setType(e.target.value)}>
            <option>Select</option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
          </select>
          {errors.type && <span className="error">{errors.type}</span>}
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="expenseDate"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            className="form-control"
          />
          {errors.expenseDate && (
            <span className="error">{errors.expenseDate}</span>
          )}
        </div>

        <div className="n">
          <label>Expenses</label>
          <input
            placeholder="Expenses in ₹/-"
            type="number"
            name="tempmoney"
            value={tempMoney}
            onChange={(e) => setTempMoney(e.target.value)}
            className="form-control"
          />
          {errors.tempMoney && (
            <span className="error">{errors.tempMoney}</span>
          )}
        </div>

        <button type="submit" className="form_btn">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Expenses;
