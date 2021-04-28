import { useState, useEffect, useContext } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import View from "../../components/View";
import UserContext from "../../UserContext";
import AppHelper from "../../app-helper";
import Router from "next/router";
import { GoogleLogin } from "react-google-login";

export default function index() {
  return (
    <View title={"Login"}>
      <Row className="justify-content-center">
        <Col xs md="6">
          <LoginForm />
        </Col>
      </Row>
    </View>
  );
}

const LoginForm = () => {
  const { user, setAccessToken } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();

    fetch(`${AppHelper.API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          alert(data.err);
        } else {
          // localStorage.setItem('token', data.accessToken);
          setAccessToken(data.accessToken);
          alert("Successfully logged in!");
        }
      });
  }

  const authenticateGoogleToken = (response) => {
    // console.log(response);

    fetch(`${AppHelper.API_URL}/users/verify-google-id-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: response.tokenId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.accessToken);

        if (data.accessToken !== undefined) {
          setAccessToken(data.accessToken);
        } else {
          if (data.error === "google-auth-error") {
            alert(
              "Google Auth Error",
              "Google authentication procedure failed.",
              "error"
            );
            //3 arguments: title, text, icon(error/success)
          } else if (data.error === "login-type-error") {
            alert(
              "Login Type Error",
              "You may have registered through a different login procedure.",
              "error"
            );
          }
        }
      });
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (user !== null) {
      Router.push("/categories");
    }
  });

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3 className="text-center text-muted">Budget Buddy</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => authenticate(e)}>
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
            <Form.Group>
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {isActive ? (
              <Button variant="primary" type="submit" className="mb-2" block>
                Login
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                className="mb-2"
                block
                disabled
              >
                Login
              </Button>
            )}
            <GoogleLogin
              clientId="504512501279-8obbvng58inovbmmb3kldik1p3r4q3a2.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={authenticateGoogleToken}
              onFailure={authenticateGoogleToken}
              cookiePolicy={"single_host_origin"}
              className="w-100 text-center d-flex justify-content-center"
            />
          </Form>
          <hr />
          <Button href="/register" block variant="success">
            Create New Account
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
