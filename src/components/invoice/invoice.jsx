import { useEffect, useState } from "react";
import "./style.css";

function Invoice() {
  let [indexFacturi, setIndexFacturi] = useState([]);

  const adaugaProdus = () => {
    setIndexFacturi([...indexFacturi, {
        id: Date.now(),
        denumire: 'placeholder',
        um: 'buc',
        cantitate: '',
        pretUnitar: '',
        valoareLei: '',
        valoareTva: ''
    }]);
  };

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(indexFacturi));
  }, [indexFacturi]);

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
          <div className="inputFields">
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
      <div className="body">
        <div className="bodyHeader">
          <div className="row nrCrt">
            <span className="text">Nr. crt</span>
            <span className="number">0</span>
          </div>
          <div className="row denumire">
            <span className="text">
              Denumirea produselor <br />
              sau a serviciilor
            </span>
            <span className="number">1</span>
          </div>
          <div className="row um">
            <span className="text">U.M</span>
            <span className="number">2</span>
          </div>
          <div className="row cantitate">
            <span className="text">Cantitatea</span>
            <span className="number">3</span>
          </div>
          <div className="row pretUnitar">
            <span className="text">
              Pretul unitar <br />
              (fara T.V.A) <br />
              -lei-
            </span>
            <span className="number">4</span>
          </div>
          <div className="row valoareLei">
            <span className="text">
              Valoarea <br />
              -lei-
            </span>
            <span className="number">5 (3x4)</span>
          </div>
          <div className="row valoareTva">
            <span className="text">
              Valoarea <br />
              T.V.A <br />
              -lei-
            </span>
            <span className="number">6</span>
          </div>
        </div>
        <div className="contents">
          {indexFacturi.map((produs) => {
            return (
                <div className="bodyProdus" key={indexFacturi.indexOf(produs) + 1}>
                  <span className="nrCrt">
                    {indexFacturi.indexOf(produs) + 1}
                  </span>
                  <span className="denumire text">
                    <textarea rows={1} />
                  </span>
                  <span className="um text">buc</span>
                  <span className="cantitate text">
                    <textarea rows={1} />
                  </span>
                  <span className="pretUnitar text">
                    <textarea rows={1} />
                  </span>
                  <span className="valoareLei text">
                    <textarea rows={1} />
                  </span>
                  <span className="valoareTva text">
                    <textarea rows={1} />
                  </span>
                </div>
            );
          })}
        </div>
        <div className="bodyFooter">
          <div className="semnatura">
            <span>Semnatura si stampila furnizorului</span>
            <span>NUME</span>
            <span>PRENUME</span>
            <span>B.I/C.I</span>
            <span>C.N.P</span>
          </div>
          <div className="expeditie">
            <span>Date privind expeditia:</span>
            <span>Numele delegatului:</span>
            <span>B.I/C.I seria nr eliberat(ă)</span>
            <span>Mijlocul de transport nr</span>
            <span>
              Expedierea s-a facut in prezenta noastra la, <br />
              data de ora
            </span>
            <span>Semnaturile</span>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={adaugaProdus}>Adaugă produs</button>
      </div>
    </div>
  );
}

export default Invoice;
