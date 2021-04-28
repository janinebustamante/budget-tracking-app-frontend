import React, { useContext } from "react";
import Link from "next/link";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import UserContext from "../UserContext";

export default function NaviBar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky>
      <Link href="/">
        <a className="navbar-brand">Budget Buddy</a>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user !== null ? (
            <React.Fragment>
              <Link href="/categories">
                <a className="nav-link" role="button">
                  Categories
                </a>
              </Link>
              <Link href="/records">
                <a className="nav-link" role="button">
                  Records
                </a>
              </Link>
              <Link href="/trend">
                <a className="nav-link" role="button">
                  Trend
                </a>
              </Link>
              <NavDropdown title="Cash Flow" id="basic-nav-dropdown">
                <NavDropdown.Item href="/monthly-income">
                  Monthly Income
                </NavDropdown.Item>
                <NavDropdown.Item href="/monthly-expense">
                  Monthly Expense
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Category Breakdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/category-breakdown">
                  Income and Expense
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/category-breakdown/income">
                  Incomes
                </NavDropdown.Item>
                <NavDropdown.Item href="/category-breakdown/expense">
                  Expense
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title={user.firstName} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link href="/login">
                <a className="nav-link" role="button">
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a className="nav-link" role="button">
                  Register
                </a>
              </Link>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
