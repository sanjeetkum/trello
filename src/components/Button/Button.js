import React, { useState } from "react";
import "./Button.css";
import "../Columns/Columns.css";

export default function Button(props) {
  return (
    <div className="row">
     <button className="button"><span>{props.name}</span></button>
    </div>
  );
}
