import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import CategoryContext from "../../CategoryContext";
import RecordContext from "../../RecordContext";
import View from "../../components/View";

export default function MonthlyIncome() {
  const { records } = useContext(RecordContext);
  // console.log(records);
  const { incomeCategoryIds } = useContext(CategoryContext);
  // console.log(incomeCategoryIds);

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
  const [monthlyIncome, setMonthlyIncome] = useState([]);

  useEffect(() => {
    const perMonthTotalIncome = months.map((month) => {
      let income = 0;
      records.forEach((record) => {
        if (incomeCategoryIds.includes(record.categoryId)) {
          if (moment(record.createdOn).format("MMMM") === month) {
            income = income + parseInt(record.amount);
          }
        }
      });
      return income;
    });
    setMonthlyIncome(perMonthTotalIncome);
    // console.log(monthlyIncome);
  }, [records, incomeCategoryIds]);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Income in Philippine Peso",
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
        data: monthlyIncome,
      },
    ],
  };

  return (
    <View title={"Cash Flow: Monthly Income"}>
      <Row className="justify-content-center">
        <Col md="10">
          <Container className="mb-5 container">
            <h3>Monthly Income</h3>
            <br />
            <Bar data={data} />
          </Container>
        </Col>
      </Row>
    </View>
  );
}
