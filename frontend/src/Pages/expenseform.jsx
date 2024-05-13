import React, { useState } from "react";
import "./sign.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { pageState } from "../../state";


axios.defaults.baseURL = "http://localhost:4500";

const Expenses = () => {
  const [page,setPage] = useRecoilState(pageState)
  const [title, setTitle] = useState("");
  const [tempMoney,settempMoney] = useState("")
  const [type,setType] = useState(false)
  const [errors, setErrors] = useState({});

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(type)

    let errors = {};
    if (!title) {
      errors.title = "Title is required";
    }
    if (!tempMoney) {
      errors.tempMoney = "tempMoney is required";
    } else if (isNaN(tempMoney) || parseFloat(tempMoney) <= 0) {
      errors.tempMoney = "tempMoney must be a valid positive number";
    }

    setErrors(errors);


    if (Object.keys(errors).length === 0) {
      let money = tempMoney      
      if (type === "spend") {
        money = -tempMoney
      }
      try {
        const response = await axios.post("/exp/addexp",{title,money}, {
          headers:{
            authorization:localStorage.getItem("token")
          }
        });

      setPage('home')
      } catch (error) {
        console.error("Error:", error);
        alert("Failed ");
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
            onChange={(e)=>setTitle(e.target.value)}
            className="form-control"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
        <select onChange={(e)=>setType(e.target.value)} >
          <option >Select</option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
          </select>
        </div>
        <div className="n">
          <label>TempMoney</label>
          <input
          placeholder="Expenses in ₹/-"
            type="number"
            name="tempmoney"
            value={tempMoney}
            onChange={(e)=>settempMoney(e.target.value)}
            className="form-control"
          />
          {errors.money && <span className="error">{errors.money}</span>}
        </div>

        <button type="submit" className="form_btn">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Expenses;
