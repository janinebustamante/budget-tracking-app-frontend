import Router from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import moment from "moment";
import RecordContext from "../../RecordContext";
import CategoryContext from "../../CategoryContext";
import View from "../../components/View";
import Swal from "sweetalert2";

export default function index() {
  const { addRecord } = useContext(RecordContext);
  const { categories } = useContext(CategoryContext);

  const handleOnAdd = async ({ categoryId, description, amount }) => {
    try {
      await addRecord({ categoryId, description, amount });
      Router.push("/records");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <View title={"Create Record"}>
      <Row className="justify-content-center">
        <Col xs md="6">
          <Container>
            <AddRecord onAdd={handleOnAdd} categories={categories} />
          </Container>
        </Col>
      </Row>
    </View>
  );
}

const AddRecord = ({ onAdd, categories }) => {
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const [categoryType, setCategoryType] = useState("");
  const [categoryName, setCategoryName] = useState("");

  console.log(categories);
  // console.log(categoryType);

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd({ categoryId, description, amount });
  };

  //for categoryName drop-down
  const categoryBasedOnType = categories.map((element) => {
    // console.log(element.categoryType);
    // console.log(element.categoryName);
    if (element.categoryType === categoryType) {
      return <option>{element.categoryName}</option>;
    }
  });

  //set categoryId and categoryname
  useEffect(() => {
    categories.find((element) => {
      if (
        element.categoryType === categoryType &&
        element.categoryName === categoryName
      ) {
        setCategoryId(element._id);
      }
    });
  }, [categoryType, categoryName]);

  console.log(categoryId);

  return (
    <Card>
      <Card.Header>
        <h3 className="text-center text-muted">Create New Record</h3>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="categoryType">
              <Form.Label>Category Type: </Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setCategoryType(e.target.value)}
                defaultValue="choose"
              >
                <option value="choose" disabled>
                  Choose..
                </option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name: </Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setCategoryName(e.target.value)}
                defaultValue="choose"
              >
                <option value="choose" disabled>
                  Choose..
                </option>
                {categoryBasedOnType}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount: </Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              block
              onClick={() => {
                Swal.fire("Success", "New record added!", "success");
              }}
            >
              Add
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
