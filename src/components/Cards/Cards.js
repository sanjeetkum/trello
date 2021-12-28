import React, { useState } from "react";
import "./Cards.css";

export default function Cards({...props}) {
  return (
    <div className="card">
      <h3>{props.cardDetails.id}</h3>
      <p>{props.cardDetails.cardName}</p>
    </div>
  );
}
