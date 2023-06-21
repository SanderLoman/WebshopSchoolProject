"use client";

import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="z-10 navbar absolute w-full p-4 text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
      <div className="wrapper flex w-full">
        <div className="w-1/2">
          <ul className="flex space-x-2 md:space-x-4 lg:space-x-8 xl:space-x-16">
            <li>HOME</li>
            <li>TEST</li>
            <li>TEST</li>
          </ul>
        </div>
        <div className="flex justify-end w-1/2">
          <a href="">LOGIN</a>
        </div>
      </div>
    </nav>
  );
}
