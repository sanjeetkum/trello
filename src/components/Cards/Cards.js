import React, { useState } from "react";
import "./Cards.css";

export default function Cards({ ...props }) {
  return (
    <div className="card">
      <h3>{props.cardDetails.id}</h3>
      <select
        name="Move card to"
        onChange={(e) => props.handleMoveTo(e, props.cardDetails.id)}
      >
        <option value={"Move to column"}>Move to column</option>
        {props.columns.map((col, index) => (
          <option value={col.id}>{col.id}</option>
        ))}
      </select>
     
        <textarea
          rows="5"
          value={props.cardDetails.cardName}
          name={props.cardDetails.cardName}
          onChange={props.handleCardChange}
          className="cardDesc"
          onBlur={props.handleBlur}
        ></textarea>
    </div>
  );
}
