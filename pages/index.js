import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import NaviBar from "../components/NaviBar";
import Banner from "../components/Banner";
import View from "../components/View";

export default function index() {
  return (
    <View title={"Budget Buddy"}>
      <Banner />
    </View>
  );
}
