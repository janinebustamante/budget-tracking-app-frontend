import Router from "next/router";
import React, { useContext, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import CategoryContext from "../../CategoryContext";

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
    <Container>
      <h3>Add New Category</h3>
      <AddCategory onAdd={handleOnAdd} />
    </Container>
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
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};
