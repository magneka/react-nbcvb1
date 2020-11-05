import React, { useState } from "react";
import axios from "axios"
import { useAxios } from './useAxios'
import "./style.css";

// Click project og du ser git knappen

export default function App() {

  const {state, getData} = useAxios();
  const {state: state2, getData} = useAxios();

  if (state.loading) return (
    <span>Laster data</span>
  )

  return (
    <div>
      <h1>Hello Ulriken consulting!</h1>
      <p>Start editing to see some magic happen :)</p>

    <button onClick={getData}>
      Klikk på meg
    </button>

    <div>
      <ul>
        {!state.loading && (<ul>
          {state.data.result.map((item, i) => 
            <li>{item.lastname}, {item.firstname}</li>)            
          }
        </ul>)}

      </ul>
    </div>

    </div>
  );
}
