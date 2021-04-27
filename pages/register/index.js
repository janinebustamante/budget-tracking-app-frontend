import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import Router from "next/router";
import AppHelper from "../../app-helper";
import View from "../../components/View";

export default function index() {
  return (
    <View title={"Register"}>
      <Row className="justify-content-center">
        <Col xs md="6">
          <RegisterForm />
        </Col>
      </Row>
    </View>
  );
}

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch(`${AppHelper.API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.err) {
          alert(data.err);
        } else {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword1("");
          setPassword2("");

          alert("Thank you for registering with us!");

          Router.push("/login");
        }
      });
  }

  useEffect(() => {
    if (
      email !== "" &&
      password1 !== "" &&
      password2 !== "" &&
      password1 === password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password1, password2]);

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3 className="text-center text-muted">Register</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => registerUser(e)}>
            <Form.Group>
              <Form.Label>First Name: </Form.Label>
              <Form.Control
                type="text"
                placeholder="enter firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name: </Form.Label>
              <Form.Control
                type="text"
                placeholder="enter lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password1">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password2">
              <Form.Label>Verify Password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </Form.Group>
            {isActive ? (
              <Button variant="primary" type="submit" id="submitBtn" block>
                Submit
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                id="submitBtn"
                block
                disabled
              >
                Submit
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
