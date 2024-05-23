import { Chart, ArcElement ,Legend} from "chart.js";
import { Doughnut } from "react-chartjs-2";
// import "nav.css";


Chart.register(ArcElement,Legend)

const Doughnutchart = ({ values, title }) => {
    const data = {
        labels: [
            'Spend',
            'Earn'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: Object.values(values),
            backgroundColor: [
                '#bf0603',
                '#006400',
            ],
            hoverOffset: 4
        }]
    };


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title:{
                display: true,
                text: "Monthly Expenditure",
            },
          legend: {
            display: true, // Set to false to disable the legend
            position: 'bottom',
          },
          
          
        },
      };

    return (
        <>
       
        <div className="doughnut">
            {
                values.Earn === 0 && values.Spend === 0 ?
                    <div> NO SPEND OR EARNING TODAY</div> :
                    <Doughnut data={data}  options={options}/>
            }
        </div>

        </>
    );
}

export default Doughnutchart;