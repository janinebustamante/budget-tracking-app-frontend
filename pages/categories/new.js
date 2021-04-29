import Router from "next/router";
import React, { useContext, useState } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import CategoryContext from "../../CategoryContext";
import View from "../../components/View";

export default function index() {
  const { addCategory } = useContext(CategoryContext);

  const handleOnAdd = async ({ categoryType, categoryName }) => {
    try {
      await addCategory({ categoryType, categoryName });
      Router.push("/categories");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <View title={"Create Category"}>
      <Row className="justify-content-center">
        <Col xs md="6">
          <Container>
            <AddCategory onAdd={handleOnAdd} />
          </Container>
        </Col>
      </Row>
    </View>
  );
}

const AddCategory = ({ onAdd }) => {
  const [categoryType, setCategoryType] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd({ categoryType, categoryName });
  };

  return (
    <Card>
      <Card.Header>
        <h3 className="text-center text-muted">Create New Category</h3>
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
                type="text"
                placeholder="category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Add
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
