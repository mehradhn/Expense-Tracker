import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import './Analytics.css'

const GET_EXPENSE = gql`
  query Query {
    me {
      myExpenses {
        date
        amount
      }
    }
  }
`;

const Analytics = () => {
  const [expense, setExpense] = useState("");
  const { data, loading } = useQuery(GET_EXPENSE);
  useEffect(() => {
    if (data) {
      const x = data.me.myExpenses.map((item) => {
        return {
          name: item.date,
          uv: item.amount,
          pv: 2400,
          amt: 2400,
        };
      });
      setExpense(x);
    }
  }, [data]);
  if (loading) return <h3>loading</h3>;
  console.log(expense);

  return (
    <div className="chart-container">
      <BarChart className="BarChart" width={500} height={300} data={expense}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default Analytics;
