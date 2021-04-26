import React, { useContext, useState, useEffect } from "react";
import Router from "next/router";
import { InputGroup, Button, Form, Card, Row, Col } from "react-bootstrap";
import RecordContext from "../../RecordContext";
import CategoryContext from "../../CategoryContext";
import moment from "moment";

export default function index() {
  const { records } = useContext(RecordContext);
  const { categories } = useContext(CategoryContext);

  return (
    <React.Fragment>
      <RecordControl />
      <Record records={records} categories={categories} />
    </React.Fragment>
  );
}

const RecordControl = () => {
  const [searchName, setSearchName] = useState("");
  console.log(searchName);

  return (
    <React.Fragment>
      <h3>Records</h3>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button
            variant="outline-secondary"
            onClick={() => Router.push("/records/new")}
          >
            Add
          </Button>
        </InputGroup.Prepend>
        <Form.Control
          type="text"
          placeholder="search"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Form.Control as="select" defaultValue="categoryType">
          <option value="categoryType" disabled>
            Category Type
          </option>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Form.Control>
      </InputGroup>
    </React.Fragment>
  );
};

const Record = ({ records, categories }) => {
  const [recordsToShow, setRecordsToShow] = useState(records);
  const [categoriesToShow, setCategoriesToShow] = useState(categories);

  useEffect(() => {
    setRecordsToShow(records);
  }, [records]);

  useEffect(() => {
    setCategoriesToShow(categories);
  }, [categories]);

  // console.log(categoriesToShow);

  //get categoryType and categoryName of the same categoryId
  const getCategory = (categoryId) => {
    return categoriesToShow.find((c) => c._id === categoryId);
  };

  return (
    <React.Fragment>
      {recordsToShow.map((record) => {
        const category = getCategory(record.categoryId);
        return (
          <Card key={record._id}>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>{record.description}</Card.Title>
                  <Card.Text>
                    {category.categoryName} ({category.categoryType})
                  </Card.Text>
                  <Card.Text>
                    {moment(record.createdOn).format("MMMM DD, YYYY")}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text className="text-right">{record.amount}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </React.Fragment>
  );
};
