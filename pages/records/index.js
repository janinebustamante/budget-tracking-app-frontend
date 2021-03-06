import React, { useContext, useState, useEffect } from "react";
import Router from "next/router";
import {
  Container,
  InputGroup,
  Button,
  Form,
  Card,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import RecordContext from "../../RecordContext";
import CategoryContext from "../../CategoryContext";
import moment from "moment";
import View from "../../components/View";
import Swal from "sweetalert2";

export default function index() {
  const { records, balances, deleteRecord } = useContext(RecordContext);
  const { categories, incomeCategoryIds, expenseCategoryIds } = useContext(
    CategoryContext
  );

  return (
    <View title={"Records"}>
      <Row className="justify-content-center">
        <Col md="10">
          <Container className="mb-5 container">
            <h3>Records</h3>
            <Record
              records={records}
              balances={balances}
              categories={categories}
              deleteRecord={deleteRecord}
              incomeCategoryIds={incomeCategoryIds}
              expenseCategoryIds={expenseCategoryIds}
            />
          </Container>
        </Col>
      </Row>
    </View>
  );
}

const Record = ({
  records,
  balances,
  categories,
  deleteRecord,
  incomeCategoryIds,
  expenseCategoryIds,
}) => {
  const [recordsToShow, setRecordsToShow] = useState(records);

  const [searchName, setSearchName] = useState("");
  // console.log(searchName);
  const [typeSelected, setTypeSelected] = useState("all");

  //total balance
  const [currentBalance, setCurrentBalance] = useState(0);
  // console.log(currentBalance);

  //get categoryType and categoryName of the same categoryId
  const getCategory = (categoryId) => {
    return categories.find((c) => c._id === categoryId);
  };

  const getBalance = (recordId) => {
    return balances.find((b) => b.recordId === recordId);
  };

  //filter search
  useEffect(() => {
    let categoryIds = [];

    if (typeSelected === "all") {
      categoryIds = categories.map((category) => category._id);
    } else if (typeSelected === "income") {
      categoryIds = categories
        .filter((category) => category.categoryType === "income")
        .map((category) => category._id);
    } else if (typeSelected === "expense") {
      categoryIds = categories
        .filter((category) => category.categoryType === "expense")
        .map((category) => category._id);
    }

    console.log(categoryIds);
    let newRecordsToShow = records.filter((record) => {
      return categoryIds.includes(record.categoryId);
    });

    if (searchName !== "") {
      newRecordsToShow = newRecordsToShow.filter((record) => {
        return record.description
          .toLowerCase()
          .includes(searchName.toLowerCase());
      });
    }
    // console.log(newRecordsToShow);

    //function to sort records by createdOn (date)
    function compare(a, b) {
      if (a.createdOn < b.createdOn) {
        return 1;
      }
      if (a.createdOn > b.createdOn) {
        return -1;
      }
      return 0;
    }
    //sort newRecordsToShow
    newRecordsToShow = newRecordsToShow.sort(compare);

    setRecordsToShow(newRecordsToShow);
  }, [records, categories, typeSelected, searchName]);

  //get the balance
  useEffect(() => {
    let newCurrentBalance = 0;
    records.forEach((r) => {
      if (incomeCategoryIds.includes(r.categoryId)) {
        newCurrentBalance = newCurrentBalance + r.amount;
      } else {
        newCurrentBalance = newCurrentBalance - r.amount;
      }
    });
    setCurrentBalance(newCurrentBalance);
  }, [records, categories]);

  //delete record
  const onDeleteHandler = async (record) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRecord({ recordId: record._id });
        Swal.fire(
          "Deleted!",
          `${record.description} has been deleted.`,
          "success"
        );
      } catch (e) {
        Swal.fire("Failed", `${e.message}`, "warning");
      }
    }
  };

  return (
    <React.Fragment>
      <h5 className="text-right">
        Current Wallet Balance:{" "}
        <Badge variant="success justify-content-right">
          &#8369;{currentBalance}
        </Badge>
      </h5>
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
        <Form.Control
          as="select"
          onChange={(e) => setTypeSelected(e.target.value)}
        >
          <option disabled>Category Type</option>
          <option
            value="all"
            onChange={(e) => setTypeSelected(e.target.value)}
            default
          >
            All
          </option>
          <option
            value="income"
            onChange={(e) => setTypeSelected(e.target.value)}
          >
            Income
          </option>
          <option
            value="expense"
            onChange={(e) => setTypeSelected(e.target.value)}
          >
            Expense
          </option>
        </Form.Control>
      </InputGroup>
      {recordsToShow.map((record) => {
        const category = getCategory(record.categoryId);
        const balance = getBalance(record._id);
        return (
          <Card className="mt-3" key={record._id}>
            <Card.Header style={{ textTransform: "capitalize" }}>
              {category.categoryType}
              <Button
                variant="outline-danger"
                size="sm"
                className="float-right ml-2"
                onClick={() => onDeleteHandler(record)}
              >
                Delete
              </Button>
              <Button
                variant="outline-info"
                href={`/records/${record._id}`}
                size="sm"
                className="float-right"
              >
                Update
              </Button>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title style={{ textTransform: "capitalize" }}>
                    {record.description}
                  </Card.Title>
                  <Card.Text style={{ textTransform: "capitalize" }}>
                    {category.categoryName}
                  </Card.Text>
                  <Card.Text>
                    {moment(record.createdOn).format("MMMM DD, YYYY")}
                  </Card.Text>
                </Col>
                <Col className="text-right">
                  {category.categoryType === "income" ? (
                    <Card.Text style={{ color: "green" }}>
                      +{record.amount}
                    </Card.Text>
                  ) : (
                    <Card.Text style={{ color: "red" }}>
                      -{record.amount}
                    </Card.Text>
                  )}
                  <Card.Text>{balance.balanceAmount}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </React.Fragment>
  );
};
