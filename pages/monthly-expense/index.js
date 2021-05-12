import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import CategoryContext from "../../CategoryContext";
import RecordContext from "../../RecordContext";
import View from "../../components/View";

export default function index() {
  const { records } = useContext(RecordContext);
  // console.log(records);
  const { expenseCategoryIds } = useContext(CategoryContext);
  // console.log(expenseCategoryIds);

  const months = [
    "January",
    "February",
    "March",
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
  const [monthlyExpense, setMonthlyExpense] = useState([]);

  useEffect(() => {
    const perMonthTotalExpense = months.map((month) => {
      let expense = 0;
      records.forEach((record) => {
        if (expenseCategoryIds.includes(record.categoryId)) {
          if (moment(record.createdOn).format("MMMM") === month) {
            expense = expense + parseInt(record.amount);
          }
        }
      });
      return expense;
    });
    setMonthlyExpense(perMonthTotalExpense);
    // console.log(monthlyExpense);
  }, [records, expenseCategoryIds]);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expense in Philippine Peso",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        hoverBorderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        data: monthlyExpense,
      },
    ],
  };

  return (
    <View title={"Cash Flow: Monthly Expense"}>
      <Row className="justify-content-center">
        <Col md="10">
          <Container className="mb-5 container">
            <h3>Monthly Expense</h3>
            <br />
            <Bar data={data} />
          </Container>
        </Col>
      </Row>
    </View>
  );
}
