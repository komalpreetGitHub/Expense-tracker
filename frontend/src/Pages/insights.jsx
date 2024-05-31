import { useRecoilState } from "recoil";
import { dataState } from "../../state";
import Linechart from "../Components/linechart";
// import 'home.css';
const Insights = () => {

    const date = new Date();
    const month = date.getMonth();
    const MonthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const day = date.getDate();
    const [data] = useRecoilState(dataState);

    const monthlyExpenditure = data.filter((item) => (((parseInt(item.date.slice(6, 8)) === month + 1) &&
        (parseInt(item.date.slice(8, 10)) <= day)) ||
        ((parseInt(item.date.slice(6, 8)) === month) &&
            (parseInt(item.date.slice(8, 10)) >= day))))


    console.log(monthlyExpenditure)

    let tempMonth = month + 1
    let tempDay = day
    let LineChartData = new Map()

    while(tempMonth >= month || (tempMonth === month && day >= tempDay)){
        let tempSpend = 0;
        data.forEach((item)=>{
            if((parseInt(item.date.slice(8,10)) === tempDay) && (parseInt(item.date.slice(6,8)) === tempMonth + 1) && item.money<0){
                tempSpend += item.money
            }
        })
        LineChartData.set(tempDay,Math.abs(tempSpend))
        if(tempDay === 1){
            tempDay = MonthLength[tempMonth-1]
            tempMonth--;
        }else{
            tempDay--;
        }
    }

    console.log(LineChartData)
    return (
        <div className="line1">
       <div className="line">
        <Linechart  LineChartData = {LineChartData}/>
       </div>
       </div>
    )
}

export default Insights;


