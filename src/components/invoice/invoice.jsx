import { useEffect, useState } from "react";
import "./style.css";

function Invoice({ dataFacturi, setDataFacturi }) {
  let [indexFacturi, setIndexFacturi] = useState([]);
  let [dataFactura, setDataFactura] = useState([
    {

      furnizor: {
        denumire: "",
        nrRegistruCom: "",
        cif: "",
        capitalSocial: "",
        sediul: "",
        judetul: "",
        iban: "",
        banca: "",
      },

      cumparator: {
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
    },
  ]);

  const salveazaDateFactura = (sectie, field, newValue) => {
    setDataFactura(
      dataFactura.map((factura) => {
        return {
          ...factura,
          [sectie]: { ...factura[sectie], [field]: newValue },
        };
      }),
    );
  };

  const salveazaDate = () => {
    console.log(dataFactura);
    if (dataFacturi !== null) {
      setDataFacturi([dataFactura[0], ...dataFacturi]);
    }
  };

  const adaugaProdus = () => {
    setIndexFacturi([
      ...indexFacturi,
      {
        id: Date.now(),
        denumire: "Introdu numele produsului",
        um: "buc",
        cantitate: 0,
        pretUnitar: 0,
        valoareLei: 0,
        valoareTva: 0,
      },
    ]);
  };

  const updateFactura = (id, field, newValue) => {
    setIndexFacturi(
      indexFacturi.map((produs) => {
        if (produs.id === id) {
          return { ...produs, [field]: newValue };
        } else {
          return produs;
        }
      }),
    );
  };

  const scoateProdus = (idToRemove) => {
    setIndexFacturi(indexFacturi.filter((produs) => produs.id !== idToRemove));
  };

  // useEffect(() => {
  //   localStorage.setItem('data', JSON.stringify(indexFacturi));
  // }, [dataFacturi]);

  // const loadSave = () => {
  //   let data = JSON.parse(localStorage.getItem('data'));
  //   setIndexFacturi(data);
  // }

  useEffect(() => {
    if (indexFacturi.length !== 0) {
      localStorage.setItem("data", JSON.stringify(indexFacturi));
    }
  }, [dataFacturi]);

  const loadSave = () => {
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    setIndexFacturi(data);
  };

  useEffect(() => {
    loadSave();
  }, []);

  return (
    <div id="fullComponent">
      <div id="invoiceBody">
        <div id="header">
          <div className="seller">
            <div className="headerRow">
              <span>Furnizor:</span>
              <input
                value={dataFactura[0].furnizor.denumire}
                type="text"
                id="furnizor"
                onInput={(e) =>
                  salveazaDateFactura("furnizor", "denumire", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Nr. ord. reg. com/an: </span>
              <input type="text" id="nrRegistruFurnizor" />
            </div>
            <div className="headerRow">
              <span>C.I.F</span>
              <input type="text" id="cif" />
            </div>
            <div className="headerRow">
              <span>Capital social:</span>
              <input type="text" id="capSoc" />
            </div>
            <div className="headerRow">
              <span>Sediul:</span>
              <input type="text" id="sediulFurnizor" />
            </div>
            <div className="headerRow">
              <span>Judetul:</span>
              <input type="text" id="judetulFurnizor" />
            </div>
            <div className="headerRow">
              <span>Cod IBAN:</span>
              <input type="text" id="ibanFurnizor" />
            </div>
            <div className="headerRow">
              <span>Banca</span>
              <input type="text" id="banca" />
            </div>
            <div className="headerRow">
              <span>Cota T.V.A.:</span>
              <input type="text" id="cotaTva" />
            </div>
          </div>
          <div className="center">
            <h1>FACTURA</h1>
            <div className="inputFields">
              <div className="headerRow">
                <span>Nr. facturii</span>
                <input
                value={dataFactura[0].dateFactura.nrFactura}
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura(
                      "dateFactura",
                      "nrFactura",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="headerRow">
                <span>Data (ziua, luna, anul) </span>
                <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura("dateFactura", "data", e.target.value)
                  }
                />
              </div>
              <div className="headerRow">
                <span>Nr. aviz insotire a marfii </span>
                <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura("dateFactura", "nrAviz", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="receiver">
            <div className="headerRow">
              <span>SERIA: nr.</span>
              <input type="text" id="seria" />
            </div>
            <div className="headerRow">
              <span>Cumparator: </span>
              <input
                type="text"
                id="numeCumparator"
                onInput={(e) =>
                  salveazaDateFactura("cumparator", "denumire", e.target.value)
                }
              />
            </div>
            <span className="info">(denumire, forma juridica)</span>
            <div className="headerRow">
              <span>Nr. ord. Registru com/an: </span>
              <input
                type="text"
                id="nrRegistruCom"
                onInput={(e) =>
                  salveazaDateFactura(
                    "cumparator",
                    "nrRegistruCom",
                    e.target.value,
                  )
                }
              />
            </div>
            <div className="headerRow">
              <span>C.I.F: </span>
              <input
                type="text"
                id="cif"
                onInput={(e) =>
                  salveazaDateFactura("cumparator", "cif", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Sediul: </span>
              <input
                type="text"
                id="sediul"
                onInput={(e) =>
                  salveazaDateFactura("cumparator", "sediul", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Judetul: </span>
              <input
                type="text"
                id="judetul"
                onInput={(e) =>
                  salveazaDateFactura("cumparator", "judetul", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Cod IBAN: </span>
              <input
                type="text"
                id="iban"
                onInput={(e) =>
                  salveazaDateFactura("cumparator", "iban", e.target.value)
                }
              />
            </div>

            <div className="headerRow">
              <span>Banca: </span>
              <input
                type="text"
                id="banca"
                onInput={(e) =>
                  salveazaDateFactura("cumparator", "banca", e.target.value)
                }
              />
            </div>
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
                <div className="bodyProdus" key={produs.id}>
                  <span className="nrCrt">
                    {indexFacturi.indexOf(produs) + 1}
                  </span>
                  <span className="denumire text">
                    <textarea
                      onChange={(e) =>
                        updateFactura(produs.id, "denumire", e.target.value)
                      }
                      rows={1}
                      value={produs.denumire}
                      id="denumire"
                    />
                  </span>
                  <span className="um text">
                    <textarea rows={1} defaultValue="buc" />
                  </span>
                  <span className="cantitate text">
                    <input
                      onChange={(e) =>
                        updateFactura(produs.id, "cantitate", +e.target.value)
                      }
                      type="number"
                      name=""
                      id="cantitate"
                      value={produs.cantitate}
                    />
                  </span>
                  <span className="pretUnitar text">
                    <input
                      onChange={(e) =>
                        updateFactura(produs.id, "pretUnitar", +e.target.value)
                      }
                      type="number"
                      name=""
                      id="pretUnitar"
                      value={produs.pretUnitar}
                    />
                  </span>
                  <span className="valoareLei text">
                    {produs.cantitate * produs.pretUnitar.toFixed(2) +
                      (produs.cantitate * produs.pretUnitar * 21) / 100}
                  </span>
                  <span className="valoareTva text">
                    {(
                      (produs.cantitate * produs.pretUnitar * 21) /
                      100
                    ).toFixed(2)}
                  </span>
                  <button
                    className="removeButton noprint"
                    onClick={() => scoateProdus(produs.id)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <div className="bodyFooter">
            <div className="semnatura">
              <span>
                Semnătura și <br /> ștampila furnizorului
              </span>
              <div className='datePersoana'>
              <div className='footerRow'>
              <span>NUME</span>
              <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura("dateFactura", "nume", e.target.value)
                  }
                />
              </div>
              <div className='footerRow'>
              <span>PRENUME</span>
              <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura("dateFactura", "prenume", e.target.value)
                  }
                />
              </div>
              <div className='footerRow'>
              <span>B.I/C.I</span>
              <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura("dateFactura", "ci", e.target.value)
                  }
                />
              </div>
              <div className='footerRow'>
              <span>C.N.P</span>
              <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura("dateFactura", "cnp", e.target.value)
                  }
                />
              </div>
            </div>
            </div>
            <div className="expeditie">
              <span>Date privind expeditia:</span>
              <div className='footerRow'>
              <span>Numele delegatului:</span>
              <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura("dateExperditie", "nume", e.target.value)
                  }
                />
              </div>
              <span>B.I/C.I seria <input
                  type="text" className='serieCI'
                  onInput={(e) =>
                    salveazaDateFactura("dateExpeditie", "serie", e.target.value)
                  }
                />, nr <input
                  type="text" className='numarCI'
                  onInput={(e) =>
                    salveazaDateFactura("dateExpeditie", "numar", e.target.value)
                  }
                />
                , eliberat(ă) de<input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura("dateExpeditie", "eliberata", e.target.value)
                  }
                /></span>

                <div className='footerRow'>
              <span>Mijlocul de transport</span>
                  <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura("dateExpeditie", "mijlocTransport", e.target.value)
                  }
                /> nr <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura("dateExpeditie", "mijlocTransportNr", e.target.value)
                  }
                />
                </div>
              <span>
                Expedierea s-a facut in prezenta noastra la, <br />
                data de<input
                  type="text" className='dataExpediere'
                  onInput={(e) =>
                    salveazaDateFactura("dataExpeditie", "dataExpediere", e.target.value)
                  }
                /> ora <input
                  type="text" className='oraExpediere'
                  onInput={(e) =>
                    salveazaDateFactura("dataExpeditie", "oraExpediere", e.target.value)
                  }/>
              </span>
              <span>Semnaturile</span>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="noprint" onClick={adaugaProdus}>
          Adaugă produs
        </button>
        <button className="noprint" onClick={salveazaDate}>
          Salvează factura
        </button>
        {/* <button className="noprint" onClick={loadSave}>
          Load save
        </button> */}
        <button className="noprint" onClick={() => window.print()}>
          Printează
        </button>
      </div>
    </div>
  );
}

export default Invoice;
