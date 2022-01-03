import React, { useState } from "react";
import "./Cards.css";

export default function Cards({ ...props }) {
  return (
    <div className="card">
      <h3>{props.cardDetails.id}</h3>
      <select name="Move Card To" onChange={(e)=>props.handleMoveTo(e,props.cardDetails.id)}>
      <option value={"Select Column"}>Select Column</option>
        {props.columns.map((col, index) => (
          <option value={col.id}>{col.id}</option>
        ))}
      </select>
      <input
        value={props.cardDetails.cardName}
        name={props.cardDetails.cardName}
        onChange={props.handleCardChange}
      ></input>
    </div>
  );
}
