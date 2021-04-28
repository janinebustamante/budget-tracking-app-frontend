import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NaviBar from "../components/NaviBar";
import { UserProvider } from "../UserContext";
import { CategoryProvider } from "../CategoryContext";
import { RecordProvider } from "../RecordContext";
import AppHelper from "../app-helper";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [records, setRecords] = useState([]);
  const [balances, setBalances] = useState([]);

  const [incomeCategoryIds, setIncomeCategoryIds] = useState([]);
  const [expenseCategoryIds, setExpenseCategoryIds] = useState([]);

  //for logout
  const unsetUser = () => {
    localStorage.removeItem("token");

    setUser(null);
    setAccessToken(null);
  };

  //get token from local storage; if none, go to log in
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      // set access token to state if found from localstorage
      setAccessToken(savedToken);
    } else {
      Router.push("/login");
    }
  }, []);

  useEffect(() => {
    let currentValue = 0;

    const newBalances = records.map((record) => {
      if (incomeCategoryIds.includes(record.categoryId)) {
        currentValue = currentValue + record.amount;
      } else {
        currentValue = currentValue - record.amount;
      }

      return {
        balanceAmount: currentValue,
        createdOn: record.createdOn,
        recordId: record._id,
      };
    });

    setBalances(newBalances);
  }, [records, incomeCategoryIds, expenseCategoryIds]);

  //save token to local storage
  useEffect(() => {
    if (accessToken !== null) {
      localStorage.setItem("token", accessToken);
    }
  }, [accessToken]);

  // set user when access token changes
  useEffect(() => {
    if (accessToken !== null) {
      fetch(`${AppHelper.API_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({ id: data._id, firstName: data.firstName });
        });
    }
  }, [accessToken]);

  // set categories when access token changes
  useEffect(() => {
    if (accessToken !== null) {
      fetch(`${AppHelper.API_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
        });
    }
  }, [accessToken]);

  //adding categories
  const addCategory = async ({ categoryType, categoryName }) => {
    const res = await fetch(`${AppHelper.API_URL}/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryType,
        categoryName,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setCategories([...categories, data]);
    } else {
      throw new Error(`Failed to create a category: ${data.err}`);
    }
  };

  //set records when access token changes
  useEffect(() => {
    if (accessToken !== null) {
      fetch(`${AppHelper.API_URL}/records`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRecords(data);
        });
    }
  }, [accessToken]);

  //adding records
  const addRecord = async ({ categoryId, description, amount }) => {
    const res = await fetch(`${AppHelper.API_URL}/records`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId,
        description,
        amount,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setRecords([...records, data]);
    } else {
      throw new Error(`Failed to create a record: ${data.err}`);
    }
  };

  //category ids with income and expense
  useEffect(() => {
    // console.log(categories);
    let incomeIds = [];
    let expenseIds = [];
    categories.map((category) => {
      if (category.categoryType === "income") {
        incomeIds.push(category._id);
      } else if (category.categoryType === "expense") {
        expenseIds.push(category._id);
      }
      setIncomeCategoryIds(incomeIds);
      setExpenseCategoryIds(expenseIds);
    });
  }, [categories]);
  // console.log(incomeCategoryIds);
  // console.log(expenseCategoryIds);

  return (
    <React.Fragment>
      <UserProvider value={{ user, unsetUser, setAccessToken }}>
        <CategoryProvider
          value={{
            categories,
            addCategory,
            incomeCategoryIds,
            expenseCategoryIds,
          }}
        >
          <RecordProvider value={{ records, addRecord, balances }}>
            <NaviBar />
            <Container>
              <Component {...pageProps} />
            </Container>
          </RecordProvider>
        </CategoryProvider>
      </UserProvider>
    </React.Fragment>
  );
}

export default MyApp;
