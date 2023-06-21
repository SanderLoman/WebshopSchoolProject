import React from "react";
import Navbar from "./navbar/navbar";
import Hero from "./hero/hero";
import Section from "./section/section";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Section></Section>
    </>
  );
}
