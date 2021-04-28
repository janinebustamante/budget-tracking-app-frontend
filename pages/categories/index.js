import Router from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { Container, Button, Table, Form } from "react-bootstrap";
import CategoryContext from "../../CategoryContext";

export default function index() {
  const { categories } = useContext(CategoryContext);

  return (
    <Container className="mt-5 pt-4 mb-5 container">
      <h3>Categories</h3>
      <Button
        variant="primary mb-3"
        onClick={() => Router.push("/categories/new")}
      >
        Add
      </Button>
      <CategoryTable categories={categories} />
    </Container>
  );
}

const CategoryTable = ({ categories }) => {
  const [categoriesToShow, setCategoriesToShow] = useState(categories);

  useEffect(() => {
    setCategoriesToShow(categories);
  }, [categories]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Category Type</th>
          <th>Category Name</th>
        </tr>
      </thead>
      <tbody>
        {categoriesToShow.map((category) => (
          <tr key={category._id}>
            <td style={{ textTransform: "capitalize" }}>
              {category.categoryType}
            </td>
            <td style={{ textTransform: "capitalize" }}>
              {category.categoryName}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
