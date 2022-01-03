import React, { useState, useEffect } from "react";
import "./Columns.css";
import Cards from "../Cards/Cards";
import Button from "../Button/Button";

export default function Columns() {
  let initialColumns = {
    todo: {
      id: "todo",
      list: [
        { id: "todo1", cardName: "This is a card" },
        { id: "todo2", cardName: "This is 2nd card" },
      ],
    },
    done: {
      id: "done",
      list: [
        { id: "done1", cardName: "This is a card" },
        { id: "done2", cardName: "This is 2nd card" },
      ],
    },
  };
  const [columns, setColumns] = useState(initialColumns);
  const [filteredArray, setFilteredArray] = useState([]);
  const [colName , setColName] = useState("");

  useEffect(() => {
    if (initialColumns) {
      setColumns(
        JSON.parse(localStorage.getItem("initialColumns"))
          ? JSON.parse(localStorage.getItem("initialColumns"))
          : initialColumns
      );
    }
  }, []);

  useEffect(()=>{
    if (filteredArray && filteredArray.length > 0) {
      Object.values(
        columns ? columns : JSON.parse(localStorage.getItem("initialColumns"))
      ).map((item) => {
        if (item.id === colName) {
          console.log("item.list", filteredArray);
  
          item.list = [...item.list, ...filteredArray];
       }
      });
      setColumns({ ...columns });
      localStorage.setItem("initialColumns", JSON.stringify(columns));
      

      console.log("item", filteredArray);
    }
  }, [filteredArray])

  const [columnName, setColumnName] = useState("");

  const handleSave = (colId) => {
    localStorage.setItem(colId, JSON.stringify(columns[colId]));
    let datAfterSave = JSON.parse(localStorage.initialColumns);
    datAfterSave[colId].id = columnName[colId];
    setColumns({ ...datAfterSave });
    localStorage.setItem("initialColumns", JSON.stringify(datAfterSave));
  };
  const handleClearLocalStorage = () =>{
    localStorage.clear();
    if (initialColumns) {
      setColumns(
        JSON.parse(localStorage.getItem("initialColumns"))
          ? JSON.parse(localStorage.getItem("initialColumns"))
          : initialColumns
      );
    }
  }
  const handleAddColumn = (evt) => {
    let totalColumns = "column" + (Object.keys(columns).length + 1);
    console.log(columns);
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

  const handleCardChange = (item, evt) => {
    console.log("item is ===>",item);
    const value = evt.target.value;
  
    Object.values(
      columns ? columns : JSON.parse(localStorage.getItem("initialColumns"))
    ).map((col) => {
      col &&
        col.list.map((listItem) => {
          if (listItem.id === item.id) {
            listItem.cardName = value;
          }
        });
    });
    setColumns({ ...columns });
    localStorage.setItem("initialColumns", JSON.stringify(columns));
  };
  const handleMoveTo = (e, cardId) => {
    Object.values(
      columns ? columns : JSON.parse(localStorage.getItem("initialColumns"))
    ).map((item) => {
      item.list.map((card) => {
        let filteredArray2 = [];

        if (cardId === card.id) {
          if (item.id !== e.target.value) {
            const filteredArray1 = item.list.filter((a) => a.id !== cardId);
            filteredArray2 = item.list.filter((a) => a.id === cardId);
            if (filteredArray2) {
              setFilteredArray(filteredArray2);
              setColName(e.target.value)
            }
            item.list = filteredArray1;
          }
        }
     
      });
    });

    setColumns({ ...columns });
    localStorage.setItem("initialColumns", JSON.stringify(columns));
  };

  const addAcard = (col, index) => {
    Object.values(
      columns ? columns : JSON.parse(localStorage.getItem("initialColumns"))
    ).map((item) => {
      if (item.id === col.id) {
        if (item.list) {
          item.list.splice(item.list.length, 0, {
            id: `${item.id}${item.list.length + 1}`,
            cardName: "New card Description here...",
          });
        }
      }
    });
    console.log("item2222", columns);

    setColumns({ ...columns });
    localStorage.setItem("initialColumns", JSON.stringify(columns));
  };
  const deleteACol = (col) => {
   const filterCol = Object.values(columns).filter((colList) =>colList.id !== col.id)
    
    console.log("item2222", filterCol);

    setColumns({ ...filterCol });
    localStorage.setItem("initialColumns", JSON.stringify(filterCol));
  };
  const handleBlur = (e) =>{
    if(e.target.value!==""){
      Object.values(
        JSON.parse(localStorage.getItem("initialColumns"))
          ? JSON.parse(localStorage.getItem("initialColumns"))
          : columns
      ).map((col, index) => {
        col.list.map((item, index) => {
          item.cardName =  e.target.value;
        })
      })
      return true
    }
    setColumns({ ...columns });
    localStorage.setItem("initialColumns", JSON.stringify(columns));
    return false
  }

  return (
    <>
      <div onClick={(evt) => handleAddColumn(evt)} className="addAColButton">
        <Button name={"Add a column"} />
      </div>
      <div onClick={handleClearLocalStorage} className="localStorageButton">
        <Button name={"Clear Local Storage"} />
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
                <span className="deleteCol" title="Delete this column." onClick={() => deleteACol(col)}>X</span>
              </>
            ) : (
              <>
                <span className="columnName">{col && col.id}</span>
                <span className="deleteCol" title="Delete this column." onClick={() => deleteACol(col)}>X</span>

               <div className="addACard"><u onClick={() => addAcard(col)}>Add a card...</u></div> 
              </>
            )}
            {col.list.map((item, index) => (
              <Cards
                cardDetails={item}
                key={index}
                handleCardChange={(e) => handleCardChange(item, e)}
                handleMoveTo={(e, cardId) => handleMoveTo(e, cardId)}
                handleBlur={(e)=>handleBlur(e)}
                columns={
                  JSON.parse(localStorage.getItem("initialColumns"))
                    ? Object.values(
                        JSON.parse(localStorage.getItem("initialColumns"))
                      )
                    : Object.values(columns)
                }
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
