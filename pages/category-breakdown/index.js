import RecordContext from "../../RecordContext";
import CategoryContext from "../../CategoryContext";
import AppHelper from "../../app-helper";
import React, { useContext, useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Container, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import View from "../../components/View";

export default function index() {
  const { records } = useContext(RecordContext);
  const { categories } = useContext(CategoryContext);

  const [descriptions, setDescriptions] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [bgColors, setBgColors] = useState([]);

  const [filteredRecord, setFilteredRecord] = useState([]);
  console.log(filteredRecord);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  useEffect(() => {
    const recordFilter = records.filter((record) => {
      if (
        moment(record.createdOn).format("YYYY-MM-DD") >= startDate &&
        moment(record.createdOn).format("YYYY-MM-DD") <= endDate
      ) {
        return record;
      }
    });
    setFilteredRecord(recordFilter);
  }, [records, startDate, endDate]);

  useEffect(() => {
    const recordDescription = filteredRecord.map(
      (record) => record.description
    );
    // console.log(recordDescription);
    setDescriptions(recordDescription);

    const recordAmount = filteredRecord.map((record) => record.amount);
    // console.log(recordAmount);
    setAmounts(recordAmount);

    setBgColors(filteredRecord.map(() => `#${AppHelper.colorRandomizer()}`));
  }, [filteredRecord, startDate, endDate]);

  const data = {
    labels: descriptions,
    datasets: [
      {
        data: amounts,
        backgroundColor: bgColors,
        hoverBackgroundColor: bgColors,
      },
    ],
  };

  return (
    <View title={"Category Breakdown"}>
      <Row className="justify-content-center">
        <Col md="10">
          <Container className="mb-5 container">
            <h3>Category Breakdown</h3>
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
            <Pie data={data} />;
          </Container>
        </Col>
      </Row>
    </View>
  );
}
