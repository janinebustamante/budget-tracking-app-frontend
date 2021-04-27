import { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import RecordContext from "../../RecordContext";
import CategoryContext from "../../CategoryContext";

export default function index() {
  const { categories, incomeCategoryIds, expenseCategoryIds } = useContext(
    CategoryContext
  );
  console.log(categories);
  console.log(incomeCategoryIds);
  console.log(expenseCategoryIds);

  const { records } = useContext(RecordContext);
  console.log(records);

  const [currentBalance, setCurrentBalance] = useState(0);
  console.log(currentBalance);

  useEffect(() => {
    let newCurrentBalance = 0;
    records.forEach((r) => {
      if (incomeCategoryIds.includes(r.categoryId)) {
        newCurrentBalance = newCurrentBalance + r.amount;
      } else {
        newCurrentBalance = newCurrentBalance - r.amount;
      }
    });
    setCurrentBalance(newCurrentBalance);
  }, [records, categories]);
  return <h3>Hello</h3>;
}
