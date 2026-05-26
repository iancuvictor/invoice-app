import { Invoice, InvoiceList, Alert } from "./components";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  let [dataFacturi, setDataFacturi] = useState(() => {
    const saved = localStorage.getItem("dateFacturi");
    return saved ? JSON.parse(saved) : [];
  });

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
      <div id="invoice">
        <Invoice dataFacturi={dataFacturi} setDataFacturi={setDataFacturi} />
      </div>
      <div id="invoiceList">
        <InvoiceList array={dataFacturi} setArray={setDataFacturi} />
      </div>
      <div className="respErrorDesktop">
        <Alert text="Fila este prea mică" type="error" />
      </div>
      <div className="respErrorMobile">
        <Alert
          text="Programul poate fi accesat doar de pe desktop"
          type="error"
        />
      </div>
    </>
  );
}

export default App;
