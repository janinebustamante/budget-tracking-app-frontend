import { Container, Row, Col, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useContext, useState, useEffect } from "react";
import AppHelper from "../../app-helper";
import moment from "moment";
import RecordContext from "../../RecordContext";
import CategoryContext from "../../CategoryContext";

export default function index() {
  const { records } = useContext(RecordContext);
  const { categories } = useContext(CategoryContext);

  console.log(records);
  console.log(categories);

  const [amount, setAmount] = useState([]);
  console.log(amount);
  const [createdOn, setCreatedOn] = useState([]);
  console.log(createdOn);
  const [bgColors, setBgColors] = useState([]);
  console.log(bgColors);

  const [filteredRecord, setFilteredRecord] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  useEffect(() => {
    const recordsAmount = records.map((r) => r.amount);
    console.log(recordsAmount);
    setAmount(recordsAmount);

    const recordsCreatedOn = records.map((r) => r.createdOn);
    console.log(recordsCreatedOn);
    setCreatedOn(recordsCreatedOn);

    setBgColors(records.map(() => `#${AppHelper.colorRandomizer()}`));
    console.log(bgColors);
  }, [records]);

  const data = {
    labels: createdOn,
    datasets: [
      {
        label: "Balance Trend",
        data: amount,
        backgroundColor: bgColors,
        hoverBackgroundColor: bgColors,
      },
    ],
  };

  return (
    <Container className="mt-5 pt-4 mb-5 container">
      <h3>Balance Trend</h3>
      <br />
      <p className="text-muted">SELECT DATE</p>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>From:</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>To:</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Line data={data} />
    </Container>
  );
}
