import { Invoice, InvoiceList, Alert } from "./components";
import "./App.css";
import { useState, useEffect } from "react";

let obj = {
    furnizor: {
      denumire: "",
      nrRegistruCom: "",
      cif: "",
      capitalSocial: "",
      sediul: "",
      judetul: "",
      iban: "",
      banca: "",
      cotaTva: "",
    },

    cumparator: {
      seria: "",
      denumire: "",
      nrRegistruCom: "",
      cif: "",
      sediul: "",
      judetul: "",
      iban: "",
      banca: "",
    },

    produse: [],

    dateFactura: {
      nrFactura: 0,
      data: "",
      nrAviz: 0,
    },

    semnatura: {
      nume: '',
      prenume: '',
      bici: '',
      cnp: '',
    },

    dateExpeditie: {
      nume: '',
      serie: '',
      numar: 0,
      eliberata: '',
      mijlocTransport: '',
      mijlocTransportNr: '',
      dataExpediere: '',
      oraExpediere: ''
    },

    accize: {
      totalAccize: '',
      totalAccizeTva: ''
    }
  };

function App() {

  const [dataFacturi, setDataFacturi] = useState(() => {
    const saved = localStorage.getItem("dateFacturi");
    return saved ? JSON.parse(saved) : [];
  });
  // yeah ik it's stupid to have a one object array but right now it's too late to fix. can't kick a dead horse forever
  const [dataFactura, setDataFactura] = useState(() => {
    const saved = localStorage.getItem("data");
    return saved ? JSON.parse(saved) : [obj];
  });

  useEffect(() => {
    localStorage.setItem("dateFacturi", JSON.stringify(dataFacturi));
  }, [dataFacturi]);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(dataFactura));
}, [dataFactura]);

  return (
    <>
      <div id="invoice">
        <Invoice dataFacturi={dataFacturi} setDataFacturi={setDataFacturi} dataFactura={dataFactura} setDataFactura={setDataFactura} obj={obj}/>
      </div>
      <div id="invoiceList">
        <InvoiceList array={dataFacturi} setArray={setDataFacturi} setDataFactura={setDataFactura}/>
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
