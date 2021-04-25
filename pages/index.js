import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NaviBar from '../components/NaviBar'
import Banner from '../components/Banner';

export default function Home() {
  return (
    <React.Fragment>
      <Banner />
    </React.Fragment>
  )
}
