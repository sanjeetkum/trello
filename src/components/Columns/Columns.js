import React, { useState, useEffect } from "react";
import "./Columns.css";
import Cards from "../Cards/Cards";
import Button from "../Button/Button";

export default function Columns() {
  let initialColumns = {
    todo: {
      id: "todo",
      list: [
        { id: "1", cardName: "This is a card" },
        { id: "2", cardName: "This is 2nd card" },
      ],
    },
    done: {
      id: "done",
      list: [
        { id: "1", cardName: "This is a card" },
        { id: "2", cardName: "This is 2nd card" },
      ],
    },
  };
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    if (initialColumns) {
      setColumns(JSON.parse(localStorage.getItem("initialColumns")) ? JSON.parse(localStorage.getItem("initialColumns")): initialColumns);
    }
  }, []);

  const [columnName, setColumnName] = useState("");

  const handleSave = (colId) => {
    // console.log(columnName[id]);
    localStorage.setItem(colId, JSON.stringify(columns[colId]));
    let datAfterSave = JSON.parse(localStorage.initialColumns);
    // JSON.parse(JSON.parse(datAfterSave))[colId] = columnName[colId];
    // delete Object.assign(datAfterSave, {[columnName[colId]]: datAfterSave[datAfterSave[colId]] })[datAfterSave[colId]];
    datAfterSave[colId].id = columnName[colId];
    console.log(datAfterSave);
    setColumns({ ...datAfterSave });

    localStorage.setItem("initialColumns", JSON.stringify(datAfterSave));

    //console.log(columnName[colId])

    // console.log(JSON.parse(JSON.parse(JSON.parse(localStorage.getItem("initialColumns")))))
    // datAfterSave[id].id = JSON.stringify(columns[id])
  };
  const handleAddColumn = (evt) => {
    let totalColumns = "column" + (Object.keys(columns).length + 1);
    console.log(columns)
    let newColumnData = {
      ...columns,
      [totalColumns]: { id: totalColumns, list: [] },
    };
    setColumns({ ...newColumnData });
    localStorage.setItem("initialColumns", JSON.stringify(newColumnData));
    // console.log(JSON.parse(localStorage.getItem("initialColumns")))
  };
  const handleColumnNameChange = (evt) => {
    const value = evt.target.value;
    setColumnName({
      ...columnName,
      [evt.target.name]: value,
    });
  };

  return (
    <>
      <div onClick={(evt) => handleAddColumn(evt)}>
        <Button name={"Add a column"} />
      </div>
      <div className="row">
        {Object.values(
          JSON.parse(localStorage.getItem("initialColumns"))
            ? JSON.parse(localStorage.getItem("initialColumns"))
            : columns
        ).map((col, index) => (
          <div className="column" key={col.id}>
            {col && col.id && col.id.includes("column") ? (
              <>
                <span className="columnName" key={col.id}>
                  <input
                    id={index}
                    key={col.id}
                    name={col.id}
                    placeholder={col.id}
                    value={columnName[col.id]}
                    onChange={(e) => handleColumnNameChange(e)}
                  />
                </span>
                <span>
                  <button onClick={() => handleSave(col.id)}>Save</button>
                </span>
              </>
            ) : (
              <div className="columnName">{col && col.id}</div>
            )}
            {col.list.map((item, index) => (
              <Cards cardDetails={item} key={index} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
