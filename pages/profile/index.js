import UserContext from "../../UserContext";
import { Card, Row, Col, FormControl } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import AppHelper from "../../app-helper";

export default function index() {
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState([]);
  console.log(userDetails);

  useEffect(() => {
    fetch(`${AppHelper.API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data);
      });
  }, [user]);

  console.log(userDetails.firstName);
  console.log(userDetails.lastName);

  return (
    <Card>
      <Card.Header>Hello, {userDetails.firstName}!</Card.Header>
      <Card.Body>
        <label>Name:</label>
        <Card.Text>
          {userDetails.firstName} {userDetails.lastName}
        </Card.Text>
        <label>Email:</label>
        <Card.Text>{userDetails.email}</Card.Text>
        <label>Mobile Number: </label>
        <FormControl type="text" placeholder="mobile number" />
      </Card.Body>
    </Card>
  );
}
