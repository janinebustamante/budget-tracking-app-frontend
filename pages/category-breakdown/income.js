import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import CategoryContext from "../../CategoryContext";
import RecordContext from "../../RecordContext";
import moment from "moment";
import AppHelper from "../../app-helper";
import View from "../../components/View";

export default function Income() {
  const { records } = useContext(RecordContext);
  const { categories } = useContext(CategoryContext);
  console.log(records);
  console.log(categories);

  const [categoryIds, setCategoryIds] = useState([]);
  //   console.log(categoryIds);
  const [incomesDescription, setIncomesDescription] = useState([]);
  //   console.log(incomesDescription);
  const [incomesAmount, setIncomesAmount] = useState([]);
  //   console.log(incomesAmount);
  const [bgColors, setBgColors] = useState([]);

  const [filteredRecord, setFilteredRecord] = useState([]);
  const [startDate, setStartDate] = useState([]);
  // console.log(startDate);
  const [endDate, setEndDate] = useState([]);
  // console.log(endDate);

  useEffect(() => {
    const incomeCategory = categories.filter(
      (category) => category.categoryType === "income"
    );
    // console.log(incomeCategory);
    const incomeCategoryIds = incomeCategory.map((category) => category._id);
    // console.log(incomeCategoryIds);

    setCategoryIds(incomeCategoryIds);
  }, [categories]);

  useEffect(() => {
    const recordsA = records.filter((record) =>
      categoryIds.includes(record.categoryId)
    );
    // console.log(recordsA);

    const recordB = recordsA.filter((record) => {
      if (
        moment(record.createdOn).format("YYYY-MM-DD") >= startDate &&
        moment(record.createdOn).format("YYYY-MM-DD") <= endDate
      ) {
        return record;
      }
    });
    setFilteredRecord(recordB);
    // console.log(recordB);
  }, [records, categories, startDate, endDate]);

  useEffect(() => {
    const recordC = filteredRecord.map((record) => record.description);
    // console.log(recordC);
    setIncomesDescription(recordC);

    const recordD = filteredRecord.map((record) => record.amount);
    // console.log(recordD);
    setIncomesAmount(recordD);

    setBgColors(filteredRecord.map(() => `#${AppHelper.colorRandomizer()}`));
  }, [filteredRecord, startDate, endDate]);

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
    <View title={"Category Breakdown: Income"}>
      <Row className="justify-content-center">
        <Col md="10">
          <Container className="mb-5 container">
            <h3>Incomes</h3>
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
            <Pie data={data} />
          </Container>
        </Col>
      </Row>
    </View>
  );
}
