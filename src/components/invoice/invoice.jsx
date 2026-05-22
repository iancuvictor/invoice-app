import './style.css';

function Invoice() {
  return (
    <div id="invoiceBody">
      <div id="header">
        <div className="seller">
          <span>Furnizor:</span>
          <span>Nr. ord. reg. com/an:</span>
          <span>C.I.F</span>
          <span>Capital social:</span>
          <span>Sediul:</span>
          <span>Judetul:</span>
          <span>Cod IBAN:</span>
          <span>Banca</span>
          <span>Cota T.V.A.:</span>
        </div>
        <div className="center">
          <h1>FACTURA</h1>
          <div className='inputFields'>
          <span>Nr. facturii</span>
          <span>Data (ziua, luna, anul) </span>
          <span>Nr. aviz insotire a marfii </span>
          </div>
        </div>
        <div className="receiver">
          <span>SERIA: nr.</span>
          <span>Cumparator:</span>
          <span>(denumire, forma juridica)</span>
          <span>Nr. ord. Registru com/an:</span>
          <span>C.I.F:</span>
          <span>Sediul:</span>
          <span>Judetul:</span>
          <span>Cod IBAN:</span>
          <span>Banca:</span>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
