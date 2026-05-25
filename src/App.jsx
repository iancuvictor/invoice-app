import { Invoice, InvoiceList } from "./components";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  let [dataFacturi, setDataFacturi] = useState(() => {
    const saved = localStorage.getItem('dateFacturi');
    return saved ? JSON.parse(saved) : []});

  useEffect(() => {
    localStorage.setItem("dateFacturi", JSON.stringify(dataFacturi));
  }, [dataFacturi]);

  const loadSave = () => {
    let data = JSON.parse(localStorage.getItem("dateFacturi"));
    setDataFacturi(data);
  };

  useEffect(() => {
    loadSave();
  }, []);
  return (
    <>
      <Invoice dataFacturi={dataFacturi} setDataFacturi={setDataFacturi} />
      <div id="invoiceList">
        <InvoiceList array={dataFacturi} setArray={setDataFacturi} />
      </div>
    </>
  );
}

export default App;
