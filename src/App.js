import React, { useState } from "react";
import axios from "axios"
import { useAxios } from './useAxios'
import "./style.css";

// Click project og du ser git knappen

export default function App() {

  const {users, getData} = useAxios()

  return (
    <div>
      <h1>Hello Ulriken consulting!</h1>
      <p>Start editing to see some magic happen :)</p>

    <button onClick={getData}>
      Klikk på meg
    </button>

    <div>
      <ul>
        {users.map((item, i) => <li>{item.lastname}, {item.firstname}</li>)}
      </ul>
    </div>

    </div>
  );
}
