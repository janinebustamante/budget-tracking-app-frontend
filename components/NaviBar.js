import React, { useContext } from 'react';
import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import UserContext from '../UserContext';



export default function NaviBar() {

    const { user } = useContext(UserContext);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky>
            <Link href="/">
                <a className="navbar-brand">Budget Tracker</a>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {(user !== null) ?
                        <React.Fragment>
                            <Link href="/categories">
                                <a className="nav-link" role="button">Categories</a>
                            </Link>
                            <Link href="/records">
                                <a className="nav-link" role="button">Records</a>
                            </Link>
                            <Link href="/expense">
                                <a className="nav-link" role="button">Expense</a>
                            </Link>
                            <Link href="/income">
                                <a className="nav-link" role="button">Income</a>
                            </Link>
                            <Link href="/trend">
                                <a className="nav-link" role="button">Trend</a>
                            </Link>
                            <Link href="/breakdown">
                                <a className="nav-link" role="button">Breakdown</a>
                            </Link>
                            <Link href="/logout">
                                <a className="nav-link" role="button">Logout</a>
                            </Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Link href="/login">
                                <a className="nav-link" role="button">Login</a>
                            </Link>
                            <Link href="/register">
                                <a className="nav-link" role="button">Register</a>
                            </Link>
                        </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}