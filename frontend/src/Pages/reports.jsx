// import { useState } from "react";
import { useRecoilState } from "recoil";
import { dataState } from "../../state";


const Reports = () => {

  // const[chart,setChart] = useState("")

  const [data] = useRecoilState(dataState);

  const date = new Date();
  const month = date.getMonth();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


  const monthlyExpenditure = data.filter((item) => parseInt(item.date.slice(5, 7)) === month + 1)

  let spend = 0
  let earn = 0

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
  else{
    earn = 0
  }



  console.log('Total Spend:', spend);
  console.log('Total Earn:', earn);
  return (
    <h1></h1>
  )
}

export default Reports;