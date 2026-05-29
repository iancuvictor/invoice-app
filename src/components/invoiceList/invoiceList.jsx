import { useState } from "react";
import "./style.css";

function InvoiceList({ array, setArray, setDataFactura }) {
  const [searchWord, setSearchWord] = useState('');


  const deleteFacturi = () => {
    setArray([]);
  };

  const loadFactura = (identifier) => {
    let facturaToLoad = array.filter((factura) => identifier === factura?.cumparator?.denumire);
    console.log(facturaToLoad)
    setDataFactura(facturaToLoad);
  };

  const deleteFactura = (number) => {
    let newArr = array.filter((factura) => factura.dateFactura.nrFactura !== number);
    setArray(newArr);
  };

  //   useEffect(() => {
  //     let data = JSON.parse(localStorage.getItem('listaFacturi'));
  //     setArray([...array, data]);
  //   }, [])

  return (
    <div id="body">
      <h1>LISTA FACTURI</h1>
      <input className='searchInvoiceInp' type="text" onChange={(e) => setSearchWord(e.target.value)} placeholder="Caută o factură"/>
      {array?.filter((factura) => factura.cumparator.denumire.toLowerCase().includes(searchWord.toLowerCase())).length !== 0 ? array?.filter((factura) => factura.cumparator.denumire.toLowerCase().includes(searchWord.toLowerCase())).sort((a, b) => b.dateFactura.nrFactura - a.dateFactura.nrFactura).map((factura, index) => {
        return (
          <div id="bodyButonLista" key={index}>
            <button className="butonLista" onClick={() => loadFactura(factura?.cumparator?.denumire)}>
              <span className="nrFactura">{factura.dateFactura.nrFactura}</span>
              <span className="numeFactura">
                {factura?.cumparator?.denumire}
              </span>
            </button>
            <button
              className="stergeFactura"
              onClick={() => deleteFactura(factura.dateFactura.nrFactura)}
            >
              X
            </button>
          </div>
        );
      }) : <div>Nu există nici o factură</div>}
      <button className="stergeLista" onClick={() => deleteFacturi()}>
        Șterge întreaga listă
      </button>
    </div>
  );
}

export default InvoiceList;
