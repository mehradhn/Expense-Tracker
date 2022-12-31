import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

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


const MyExpenses = () => {
  const [expense, setExpense] = useState([]);
  const { data, loading } = useQuery(GET_EXPENSE);
  useEffect(() => {
    if (data) {
      setExpense([...data.me.myExpenses]);
    }
  }, [data]);
  
  if (loading) return <h3>loading</h3>;
  console.log('######################3')
  console.log(data);
  console.log(expense);
  console.log('######################3')

  return <div className="container">
    {
      expense.map((item) => {
        return (
          <p>{item.date.moment().format('dddd')}</p>
        )
      })
    }
  </div>;
};

export default MyExpenses;
