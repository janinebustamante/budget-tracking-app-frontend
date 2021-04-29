import { Card, Form, Row, Col, Button } from "react-bootstrap";
import View from "../../components/View";
import CategoryContext from "../../CategoryContext";
import RecordContext from "../../RecordContext";
import { useContext, useEffect } from "react";
import UserContext from "../../UserContext";
import AppHelper from "../../app-helper";

export default function index() {
  const { user } = useContext(UserContext);
  const { categories } = useContext(CategoryContext);
  const { records } = useContext(RecordContext);

  console.log(records);

  // const record = records.map(
  //   (r) =>
  //     r._id ===
  //     {
  //       params: { id: r._id },
  //     }
  // );

  // console.log(record);

  return (
    <View title={"Edit Record"}>
      <Row className="justify-content-center">
        <Col xs md="6">
          <Card>
            <Card.Header>
              <h3 className="text-center text-muted">Edit Record</h3>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Form>
                  <Form.Group>
                    <Form.Label>Category Type</Form.Label>
                    <Form.Control as="select" defaultValue="choose">
                      <option value="choose" disabled>
                        Choose..
                      </option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control as="select" defaultValue="choose">
                      <option value="choose" disabled>
                        Choose..
                      </option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Amount: </Form.Label>
                    <Form.Control type="number" placeholder="0" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description: </Form.Label>
                    <Form.Control type="text" placeholder="description" />
                  </Form.Group>
                  <Button variant="primary" type="submit" block>
                    Update
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </View>
  );
}
