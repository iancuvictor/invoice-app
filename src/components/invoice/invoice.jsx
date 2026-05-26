import { useEffect, useState } from "react";
import { Alert } from "../../components";
import "./style.css";

function Invoice({ dataFacturi, setDataFacturi }) {
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
  };
  let [dataFactura, setDataFactura] = useState(() => {
    const saved = localStorage.getItem("data");
    return saved ? JSON.parse(saved) : [obj];
  });

  const salveazaDateFactura = (sectie, field, newValue) => {
    setDataFactura(
      dataFactura.map((factura) => {
        return {
          ...factura,
          [sectie]: { ...factura[sectie], [field]: newValue },
        };
      }),
    );
    console.log(dataFactura);
  };

  const updateFactura = (id, field, newValue) => {
    setDataFactura([
      {
        ...dataFactura[0],
        produse: dataFactura[0].produse.map((produs) => {
          if (produs.id === id) {
            return { ...produs, [field]: newValue };
          } else {
            return produs;
          }
        }),
      },
    ]);
  };

  const salveazaDate = () => {
    function checkAvailability() {
      if (dataFacturi.length > 0) {
        for (let facturi of dataFacturi) {
          if (
            facturi.dateFactura.nrFactura ===
            dataFactura[0].dateFactura.nrFactura
          ) {
            console.log(true);
            return true;
          } else {
            return false;
          }
        }
      }
    }

    let result = checkAvailability();

    if (dataFactura[0].dateFactura.nrFactura !== 0 && result !== true) {
      setDataFacturi([dataFactura[0], ...dataFacturi]);
    } else if (dataFacturi.length !== 0 && result === true) {
      if (
        confirm(
          `Factura cu numărul ${dataFactura[0].dateFactura.nrFactura} există deja, vrei sa o modifici?`,
        )
      ) {
        let newArray = dataFacturi.filter(
          (facturi) => dataFacturi.indexOf(facturi) !== 0,
        );
        newArray.splice(0, 0, dataFactura[0]);
        setDataFacturi(newArray);
      }
    } else if (dataFactura[0].dateFactura.nrFactura === 0) {
      alert("Trebuie să introduci numărul facturii.");
    }
  };

  const adaugaProdus = () => {
    setDataFactura([
      {
        ...dataFactura[0],
        produse: [
          ...dataFactura[0].produse,
          {
            id: Date.now(),
            denumire: "Introdu numele produsului",
            um: "buc",
            cantitate: 0,
            pretUnitar: 0,
            valoareLei: 0,
            valoareTva: 0,
          },
        ],
      },
    ]);
  };

  const scoateProdus = (idToRemove) => {
    setDataFactura([
      {
        ...dataFactura[0],
        produse: [
          ...dataFactura[0].produse.filter(
            (produs) => produs.id !== idToRemove,
          ),
        ],
      },
    ]);
  };

  useEffect(() => {
    if (dataFactura[0] !== null) {
      localStorage.setItem("data", JSON.stringify(dataFactura));
      localStorage.setItem("dateFacturi", JSON.stringify(dataFacturi));
    }
  }, [dataFactura]);

  useEffect(() => {
    if (dataFacturi.length !== 0) {
      setDataFactura([dataFacturi[0]]);
    }
  }, [dataFacturi]);

  const loadSave = () => {
    let data = JSON.parse(localStorage.getItem("data"));
    setDataFactura(data);
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
                type="text"
                id="furnizor"
                value={dataFactura[0].furnizor.denumire}
                onInput={(e) =>
                  salveazaDateFactura("furnizor", "denumire", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Nr. ord. reg. com/an: </span>
              <input
                type="text"
                id="nrRegistruFurnizor"
                value={dataFactura[0].furnizor.nrRegistruCom}
                onInput={(e) =>
                  salveazaDateFactura(
                    "furnizor",
                    "nrRegistruCom",
                    e.target.value,
                  )
                }
              />
            </div>
            <div className="headerRow">
              <span>C.I.F</span>
              <input
                type="text"
                id="cif"
                value={dataFactura[0].furnizor.cif}
                onInput={(e) =>
                  salveazaDateFactura("furnizor", "cif", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Capital social:</span>
              <input
                type="text"
                id="capSoc"
                value={dataFactura[0].furnizor.capitalSocial}
                onInput={(e) =>
                  salveazaDateFactura(
                    "furnizor",
                    "capitalSocial",
                    e.target.value,
                  )
                }
              />
            </div>
            <div className="headerRow">
              <span>Sediul:</span>
              <input
                type="text"
                id="sediulFurnizor"
                value={dataFactura[0].furnizor.sediul}
                onInput={(e) =>
                  salveazaDateFactura("furnizor", "sediul", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Judetul:</span>
              <input
                type="text"
                id="judetulFurnizor"
                value={dataFactura[0].furnizor.judetul}
                onInput={(e) =>
                  salveazaDateFactura("furnizor", "judetul", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Cod IBAN:</span>
              <input
                type="text"
                id="ibanFurnizor"
                value={dataFactura[0].furnizor.iban}
                onInput={(e) =>
                  salveazaDateFactura("furnizor", "iban", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Banca</span>
              <input
                type="text"
                id="banca"
                value={dataFactura[0].furnizor.banca}
                onInput={(e) =>
                  salveazaDateFactura("furnizor", "banca", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Cota T.V.A.:</span>
              <input
                type="text"
                id="cotaTva"
                value={dataFactura[0].furnizor.cotaTva}
                onInput={(e) =>
                  salveazaDateFactura("furnizor", "cotaTva", e.target.value)
                }
              />
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
              <input
                type="text"
                id="seria"
                value={dataFactura[0].cumparator.seria}
                onInput={(e) =>
                  salveazaDateFactura("cumparator", "seria", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Cumparator: </span>
              <input
                type="text"
                id="numeCumparator"
                value={dataFactura[0].cumparator.denumire}
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
                value={dataFactura[0].cumparator.nrRegistruCom}
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
                value={dataFactura[0].cumparator.cif}
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
                value={dataFactura[0].cumparator.sediul}
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
                value={dataFactura[0].cumparator.judetul}
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
                value={dataFactura[0].cumparator.iban}
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
                value={dataFactura[0].cumparator.banca}
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
            {dataFactura[0].produse.map((produs, index) => {
              return (
                <div className="bodyProdus" key={produs.id}>
                  <span className="nrCrt">{index + 1}</span>
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
              <div className="datePersoana">
                <div className="footerRow">
                  <span>NUME</span>
                  <input
                    type="text"
                    onInput={(e) =>
                      salveazaDateFactura("dateFactura", "nume", e.target.value)
                    }
                  />
                </div>
                <div className="footerRow">
                  <span>PRENUME</span>
                  <input
                    type="text"
                    onInput={(e) =>
                      salveazaDateFactura(
                        "dateFactura",
                        "prenume",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="footerRow">
                  <span>B.I/C.I</span>
                  <input
                    type="text"
                    onInput={(e) =>
                      salveazaDateFactura("dateFactura", "ci", e.target.value)
                    }
                  />
                </div>
                <div className="footerRow">
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
              <div className="footerRow">
                <span>Numele delegatului:</span>
                <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura(
                      "dateExperditie",
                      "nume",
                      e.target.value,
                    )
                  }
                />
              </div>
              <span>
                B.I/C.I seria{" "}
                <input
                  type="text"
                  className="serieCI"
                  onInput={(e) =>
                    salveazaDateFactura(
                      "dateExpeditie",
                      "serie",
                      e.target.value,
                    )
                  }
                />
                , nr{" "}
                <input
                  type="text"
                  className="numarCI"
                  onInput={(e) =>
                    salveazaDateFactura(
                      "dateExpeditie",
                      "numar",
                      e.target.value,
                    )
                  }
                />
                , eliberat(ă) de
                <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura(
                      "dateExpeditie",
                      "eliberata",
                      e.target.value,
                    )
                  }
                />
              </span>

              <div className="footerRow">
                <span>Mijlocul de transport</span>
                <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura(
                      "dateExpeditie",
                      "mijlocTransport",
                      e.target.value,
                    )
                  }
                />{" "}
                nr{" "}
                <input
                  type="text"
                  onInput={(e) =>
                    salveazaDateFactura(
                      "dateExpeditie",
                      "mijlocTransportNr",
                      e.target.value,
                    )
                  }
                />
              </div>
              <span>
                Expedierea s-a facut in prezenta noastra la, <br />
                data de
                <input
                  type="text"
                  className="dataExpediere"
                  onInput={(e) =>
                    salveazaDateFactura(
                      "dataExpeditie",
                      "dataExpediere",
                      e.target.value,
                    )
                  }
                />{" "}
                ora{" "}
                <input
                  type="text"
                  className="oraExpediere"
                  onInput={(e) =>
                    salveazaDateFactura(
                      "dataExpeditie",
                      "oraExpediere",
                      e.target.value,
                    )
                  }
                />
              </span>
              <span>Semnaturile</span>
            </div>
            <div className="accize">
              <div className='stanga'>
              <span className='totalAccize'>Total <br /> din care: <br /> accize</span>
              <span className='semnaturaPrimire'>Semnătura <br /> de primire</span>
              </div>
              <div className='dreapta'>
                <div className='totaluri'>
                <input className='inputTotal' type="text" name="" id="" />
                <input className='inputTotal' type="text" name="" id="" />
                <input className='inputTotal' type="text" name="" id="" />
                <input className='inputTotal' type="text" name="" id="" />
                </div>
                <span className="totalDePlata">Total de plată <br />(col.5 + col.6)</span>
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
          <button className="noprint" onClick={() => window.print()}>
            Printează
          </button>
          <button className="noprint" onClick={() => setDataFactura([obj])}>
            Factură nouă
          </button>
        </div>
      </div>
      {/* <Alert /> */}
    </div>
  );
}

export default Invoice;
