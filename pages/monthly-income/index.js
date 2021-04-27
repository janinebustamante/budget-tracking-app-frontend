import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import CategoryContext from "../../CategoryContext";
import RecordContext from "../../RecordContext";
import AppHelper from "../../app-helper";

export default function index() {
  const { records } = useContext(RecordContext);
  const { categories } = useContext(CategoryContext);
  // console.log(records);
  // console.log(categories);

  const [categoryIds, setCategoryIds] = useState([]);
  // console.log(categoryIds);
  const [incomesDescription, setIncomesDescription] = useState([]);
  // console.log(incomesDescription);
  const [incomesAmount, setIncomesAmount] = useState([]);
  // console.log(incomesAmount);
  const [bgColors, setBgColors] = useState([]);

  useEffect(() => {
    const incomeCategory = categories.filter(
      (category) => category.categoryType === "income"
    );
    // console.log(expenseCategory);
    const incomeCategoryIds = incomeCategory.map((category) => category._id);
    // console.log(expenseCategoryIds);

    setCategoryIds(incomeCategoryIds);
  }, [categories]);

  useEffect(() => {
    const recordsA = records.filter((record) =>
      categoryIds.includes(record.categoryId)
    );
    // console.log(recordsA);
    const recordC = recordsA.map((recordB) => recordB.description);
    // console.log(recordC);
    setIncomesDescription(recordC);

    const recordD = recordsA.map((recordB) => recordB.amount);
    // console.log(recordD);
    setIncomesAmount(recordD);

    setBgColors(recordsA.map(() => `#${AppHelper.colorRandomizer()}`));
  }, [records, categories]);

  const data = {
    labels: incomesDescription,
    datasets: [
      {
        data: incomesAmount,
        backgroundColor: bgColors,
        hoverBackgroundColor: bgColors,
      },
    ],
  };

  return (
    <Container className="mt-5 pt-4 mb-5 container">
      <h3>Monthly Incomes</h3>
      <Pie data={data} />
    </Container>
  );
}
