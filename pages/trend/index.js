import { Container, Row, Col, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import React, { useContext, useState, useEffect } from "react";
import AppHelper from "../../app-helper";
import moment from "moment";
import RecordContext from "../../RecordContext";
import CategoryContext from "../../CategoryContext";

export default function index() {
  const { records } = useContext(RecordContext);
  console.log(records);

  const [startDate, setStartDate] = useState([]);
  console.log(startDate);
  const [endDate, setEndDate] = useState([]);
  console.log(endDate);
  // const [filteredRecord, setFilteredRecord] = useState([]);
  // console.log(filteredRecord);

  // useEffect(() => {
  //   const recordFilter = records.filter((r) => {
  //     if (
  //       moment(r.createdOn).format("YYYY-MM-DD") >= startDate &&
  //       moment(r.createdOn).format("YYYY-MM-DD") <= endDate
  //     ) {
  //       return r;
  //     }
  //   });
  //   setFilteredRecord(recordFilter);
  // }, [records, startDate, endDate]);

  return (
    <Container className="mt-5 pt-4 mb-5 container">
      <h3>Expenses</h3>
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
    </Container>
  );
}
