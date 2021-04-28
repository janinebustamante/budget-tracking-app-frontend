import UserContext from "../../UserContext";
import { Card, Row, Col } from "react-bootstrap";
import { useContext, useEffect } from "react";

export default function index() {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <Card>
      <Card.Header>Hello!</Card.Header>
      <Card.Body></Card.Body>
    </Card>
  );
}
