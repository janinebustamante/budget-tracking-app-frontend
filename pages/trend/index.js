import { Container, Row, Col, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useContext, useState, useEffect } from "react";
// import AppHelper from "../../app-helper";
import moment from "moment";
import RecordContext from "../../RecordContext";
import { groupBy } from "lodash";

export default function index() {
  const { balances } = useContext(RecordContext);
  const [filteredBalances, setFilteredBalances] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dateFmt = "YYYY-MM-DD";

  useEffect(() => {
    const groupedBalancesPerDay = groupBy(balances, (balance) => {
      return moment(balance.createdOn).format(dateFmt);
    });

    const lastBalancePerDay = Object.values(groupedBalancesPerDay).map(
      (balances) => balances[balances.length - 1]
    );

    const newFilteredBalances = lastBalancePerDay.filter((balance) => {
      if (
        startDate !== null &&
        moment(startDate).format(dateFmt) >
          moment(balance.createdOn).format(dateFmt)
      ) {
        return false;
      }
      if (
        endDate !== null &&
        moment(endDate).format(dateFmt) <
          moment(balance.createdOn).format(dateFmt)
      ) {
        return false;
      }

      return true;
    });

    setFilteredBalances(newFilteredBalances);
  }, [balances, startDate, endDate]);

  const values = filteredBalances.map((b) => b.balanceAmount);
  const labels = filteredBalances.map((b) =>
    moment(b.createdOn).format(dateFmt)
  );

  // const bgColors = filteredBalances.map(
  //   () => `#${AppHelper.colorRandomizer()}`
  // );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Balance Trend",
        data: values,
        fill: true,
        borderColor: "rgba(153, 102, 255, 0.5)",
        backgroundColor: "rgba(153, 102, 255, 0.1)",
        tension: 0.1,
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
