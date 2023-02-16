import Input from "../Input";
import { useEffect, useState } from "react";
import "./Chart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const months = [
  "January",
  "February",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = [{ name: "Page A", Amount: 400 }];

function Chart({ onCloseChart }) {
  const seedData = useSelector((state) => state.seedData);
  const [chartData, setChartData] = useState([]);
  const getTotal = (data) => {
    let total = 0;
    data.forEach((item) => {
      total = total + item.amount;
    });
    return total;
  };

  const getChartData = () => {
    console.log(seedData, "seedData");
    Object.keys(seedData)?.forEach((key, index) => {
      setChartData((prevData) => {
        const data = [...prevData];
        data.push({
          month: months[index],
          total: getTotal(seedData[key]),
        });
        return data;
      });
    });
  };

  useEffect(() => {
    getChartData();
  }, [seedData]);

  console.log(chartData);

  return (
    <div className="chart">
      <div className="crossButton" onClick={onCloseChart}>
        <h1>X</h1>
      </div>
      <LineChart
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default Chart;
