import React, { useState } from "react";
import "./Cards.css";

export default function Cards({...props}) {


  return (
    <div className="card">
      <h3>{props.cardDetails.id}</h3>
      <input value={props.cardDetails.cardName} name={props.cardDetails.cardName} onChange={props.handleCardChange}></input>
    </div>
  );
}
