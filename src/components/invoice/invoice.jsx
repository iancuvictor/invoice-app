import { useEffect, useState } from "react";
import { Alert } from "../../components";
import "./style.css";

function Invoice({
  dataFacturi,
  setDataFacturi,
  dataFactura,
  setDataFactura,
  obj,
}) {
  const [error, setError] = useState({
    nrFactura: false,
    numeCumparator: false,
    facturaExistaDeja: false,
    dontAskAgain: false
  });

  const updateDateFactura = (sectie, field, newValue) => {
    setDataFactura(
      dataFactura.map((factura) => {
        return {
          ...factura,
          [sectie]: { ...factura[sectie], [field]: newValue },
        };
      }),
    );
  };

  const updateProdFactura = (id, field, newValue) => {
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
            return true;
          }
        }
        return false;
      }
    }

    let result = checkAvailability();

    if (
      +dataFactura[0].dateFactura.nrFactura !== 0 &&
      result !== true &&
      dataFactura[0].cumparator.denumire !== "" && error.dontAskAgain === false
    ) {
      setDataFacturi([dataFactura[0], ...dataFacturi]);
      //setDataFactura([obj]);
    } else if (
      dataFacturi.length !== 0 &&
      result === true &&
      dataFactura[0].cumparator.denumire !== "" && error.dontAskAgain === false
    ) {
      setError({ ...error, facturaExistaDeja: true });
    } else if (+dataFactura[0].dateFactura.nrFactura === 0 && error.dontAskAgain === false) {
      setError({ ...error, nrFactura: true });
    } else if (dataFactura[0].cumparator.denumire === "" && error.dontAskAgain === false) {
      setError({ ...error, numeCumparator: true });
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

  const calcTotal = (column) => {
    let totalSum = 0;
    if (dataFactura[0].produse.length > 0) {
      for (let produs of dataFactura[0].produse) {
        if (column === "valoareLei") {
          let valoareLei = produs.cantitate * produs.pretUnitar;
          totalSum += +valoareLei;
        } else if (column === "valoareTva") {
          let valoareTva = produs.cantitate * produs.pretUnitar * (21 / 100);
          totalSum += +valoareTva;
        }
      }
      return totalSum;
    } else {
      return 0;
    }
  };

  //listener for keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        salveazaDate();
      } else if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        adaugaProdus();
      } else if (e.ctrlKey && e.key === "x") {
        e.preventDefault();
        let nrFacturi = dataFacturi.map(
          (factura) => +factura.dateFactura.nrFactura,
        );

        if (
          nrFacturi.find(
            (nrfactura) => nrfactura === +dataFactura[0].dateFactura.nrFactura,
          )
        ) {
          setDataFactura([obj]);
        } else if (
          confirm(
            `Nu ai salvat această factură. Ești sigur că vrei sa creezi una nouă?`,
          )
        ) {
          setDataFactura([obj]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dataFactura, dataFacturi]);

  return (
    <div id="fullComponent">
      <div id="invoiceBody">
        <div className="buttons noprint">
          <button className="noprint" onClick={() => setError({...error, dontAskAgain: !error.dontAskAgain})}>
            {error.dontAskAgain === true ? 'Alertele sunt oprite' : 'Alertele sunt pornite'}
          </button>
          <button className="noprint" onClick={adaugaProdus}>
            Adaugă produs
          </button>
          <button
            className="noprint"
            onClick={() => {
              salveazaDate();
            }}
          >
            Salvează factura
          </button>
          <button className="noprint" onClick={() => window.print()}>
            Printează
          </button>
          <button
            className="noprint"
            onClick={() => {
              let nrFacturi = dataFacturi.map(
                (factura) => +factura.dateFactura.nrFactura,
              );
              console.log(nrFacturi);

              if (
                nrFacturi.find(
                  (nrfactura) =>
                    nrfactura === dataFactura[0].dateFactura.nrFactura,
                )
              ) {
                setDataFactura([obj]);
              } else if (
                confirm(
                  `Nu ai salvat această factură. Ești sigur că vrei sa creezi una nouă?`,
                )
              ) {
                setDataFactura([obj]);
              }
            }}
          >
            Factură nouă
          </button>
        </div>
        <div id="header">
          <div className="seller">
            <div className="headerRow">
              <span>Furnizor:</span>
              <input
                type="text"
                id="denumireFurnizor"
                value={dataFactura[0].furnizor.denumire}
                onChange={(e) =>
                  updateDateFactura("furnizor", "denumire", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Nr. ord. reg. com/an: </span>
              <input
                type="text"
                id="nrRegistruFurnizor"
                value={dataFactura[0].furnizor.nrRegistruCom}
                onChange={(e) =>
                  updateDateFactura("furnizor", "nrRegistruCom", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>C.I.F</span>
              <input
                type="text"
                id="cifFurnizor"
                value={dataFactura[0].furnizor.cif}
                onChange={(e) =>
                  updateDateFactura("furnizor", "cif", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Capital social:</span>
              <input
                type="text"
                id="capSocFurnizor"
                value={dataFactura[0].furnizor.capitalSocial}
                onChange={(e) =>
                  updateDateFactura("furnizor", "capitalSocial", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Sediul:</span>
              <input
                type="text"
                id="sediulFurnizor"
                value={dataFactura[0].furnizor.sediul}
                onChange={(e) =>
                  updateDateFactura("furnizor", "sediul", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Județul:</span>
              <input
                type="text"
                id="judetulFurnizor"
                value={dataFactura[0].furnizor.judetul}
                onChange={(e) =>
                  updateDateFactura("furnizor", "judetul", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Cod IBAN:</span>
              <input
                type="text"
                id="ibanFurnizor"
                value={dataFactura[0].furnizor.iban}
                onChange={(e) =>
                  updateDateFactura("furnizor", "iban", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Banca:</span>
              <input
                type="text"
                id="bancaFurnizor"
                value={dataFactura[0].furnizor.banca}
                onChange={(e) =>
                  updateDateFactura("furnizor", "banca", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Cotă T.V.A.:</span>
              <input
                type="text"
                id="cotaTva"
                value={dataFactura[0].furnizor.cotaTva}
                onChange={(e) =>
                  updateDateFactura("furnizor", "cotaTva", e.target.value)
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
                  type="number"
                  className={error.nrFactura ? "error" : ""}
                  onChange={(e) => {
                    setError({ ...error, nrFactura: false });
                    updateDateFactura(
                      "dateFactura",
                      "nrFactura",
                      e.target.value,
                    );
                  }}
                />
              </div>
              <div className="headerRow">
                <span>Data (ziua, luna, anul) </span>
                <input
                  type="date"
                  value={dataFactura[0].dateFactura.data}
                  onChange={(e) =>
                    updateDateFactura("dateFactura", "data", e.target.value)
                  }
                />
              </div>
              <div className="headerRow">
                <span>Nr. aviz însoțire a mărfii </span>
                <input
                  type="number"
                  value={dataFactura[0].dateFactura.nrAviz}
                  onChange={(e) =>
                    updateDateFactura("dateFactura", "nrAviz", e.target.value)
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
                onChange={(e) =>
                  updateDateFactura("cumparator", "seria", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Cumpărător: </span>
              <input
                type="text"
                id="numeCumparator"
                className={error.numeCumparator ? "error" : ""}
                value={dataFactura[0].cumparator.denumire}
                onChange={(e) => {
                  setError({ ...error, numeCumparator: false });
                  updateDateFactura("cumparator", "denumire", e.target.value);
                }}
              />
            </div>
            <span className="info">(denumire, formă juridică)</span>
            <div className="headerRow">
              <span>Nr. ord. Registru com/an: </span>
              <input
                type="text"
                id="nrRegistruComCumparator"
                value={dataFactura[0].cumparator.nrRegistruCom}
                onChange={(e) =>
                  updateDateFactura(
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
                id="cifCumparator"
                value={dataFactura[0].cumparator.cif}
                onChange={(e) =>
                  updateDateFactura("cumparator", "cif", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Sediul: </span>
              <input
                type="text"
                id="sediulCumparator"
                value={dataFactura[0].cumparator.sediul}
                onChange={(e) =>
                  updateDateFactura("cumparator", "sediul", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Județul: </span>
              <input
                type="text"
                id="judetulCumparator"
                value={dataFactura[0].cumparator.judetul}
                onChange={(e) =>
                  updateDateFactura("cumparator", "judetul", e.target.value)
                }
              />
            </div>
            <div className="headerRow">
              <span>Cod IBAN: </span>
              <input
                type="text"
                id="ibanCumparator"
                value={dataFactura[0].cumparator.iban}
                onChange={(e) =>
                  updateDateFactura("cumparator", "iban", e.target.value)
                }
              />
            </div>

            <div className="headerRow">
              <span>Banca: </span>
              <input
                type="text"
                id="bancaCumparator"
                value={dataFactura[0].cumparator.banca}
                onChange={(e) =>
                  updateDateFactura("cumparator", "banca", e.target.value)
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
                Prețul unitar <br />
                (fară T.V.A) <br />
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
                        updateProdFactura(produs.id, "denumire", e.target.value)
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
                      onChange={(e) => {
                        calcTotal("valoareLei");
                        updateProdFactura(
                          produs.id,
                          "cantitate",
                          +e.target.value,
                        );
                      }}
                      type="number"
                      name=""
                      id="cantitate"
                      value={produs.cantitate}
                    />
                  </span>
                  <span className="pretUnitar text">
                    <input
                      onChange={(e) => {
                        calcTotal("valoareLei");
                        updateProdFactura(
                          produs.id,
                          "pretUnitar",
                          +e.target.value,
                        );
                      }}
                      type="number"
                      name=""
                      step="0.01"
                      id="pretUnitar"
                      value={produs.pretUnitar}
                    />
                  </span>
                  <span className="valoareLei text">
                    <input
                      type="number"
                      value={produs.cantitate * produs.pretUnitar.toFixed(2)}
                      readOnly
                    />
                  </span>
                  <span className="valoareTva text">
                    <input
                      type="number"
                      value={(
                        (produs.cantitate * produs.pretUnitar * 21) /
                        100
                      ).toFixed(2)}
                      readOnly
                    />
                  </span>
                  <button
                    className="removeButton noprint"
                    onClick={() => {
                      calcTotal("valoareLei");
                      calcTotal("valoareTva");
                      scoateProdus(produs.id);
                    }}
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
                  <span>NUME:</span>
                  <input
                    type="text"
                    className="regularInput"
                    value={dataFactura[0]?.semnatura?.nume}
                    onChange={(e) =>
                      updateDateFactura("semnatura", "nume", e.target.value)
                    }
                  />
                </div>
                <div className="footerRow">
                  <span>PRENUME:</span>
                  <input
                    type="text"
                    className="regularInput"
                    value={dataFactura[0]?.semnatura?.prenume}
                    onChange={(e) =>
                      updateDateFactura("semnatura", "prenume", e.target.value)
                    }
                  />
                </div>
                <div className="footerRow">
                  <span>B.I/C.I:</span>
                  <input
                    type="text"
                    className="regularInput"
                    value={dataFactura[0]?.semnatura?.bici}
                    onChange={(e) =>
                      updateDateFactura("semnatura", "bici", e.target.value)
                    }
                  />
                </div>
                <div className="footerRow">
                  <span>C.N.P:</span>
                  <input
                    type="text"
                    className="regularInput"
                    value={dataFactura[0]?.semnatura?.cnp}
                    onChange={(e) =>
                      updateDateFactura("semnatura", "cnp", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="expeditie">
              <div className="footerRow">
                <span>Date privind expeditia:</span>
              </div>
              <div className="footerRow">
                <span>Numele delegatului:</span>
                <input
                  type="text"
                  className="regularInput"
                  value={dataFactura[0]?.dateExpeditie?.nume}
                  onChange={(e) =>
                    updateDateFactura("dateExpeditie", "nume", e.target.value)
                  }
                />
              </div>
              <div className="footerRow">
                <span>
                  B.I/C.I seria{" "}
                  <input
                    type="text"
                    className="serieCI"
                    value={dataFactura[0]?.dateExpeditie?.serie}
                    onChange={(e) =>
                      updateDateFactura(
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
                    value={dataFactura[0]?.dateExpeditie?.numar}
                    onChange={(e) =>
                      updateDateFactura(
                        "dateExpeditie",
                        "numar",
                        e.target.value,
                      )
                    }
                  />
                  , <br /> eliberat(ă) de
                  <input
                    type="text"
                    className="eliberataDe"
                    value={dataFactura[0]?.dateExpeditie?.eliberata}
                    onChange={(e) =>
                      updateDateFactura(
                        "dateExpeditie",
                        "eliberata",
                        e.target.value,
                      )
                    }
                  />
                </span>
              </div>

              <div className="footerRow">
                <span>Mijlocul de transport</span>
                <input
                  type="text"
                  className="regularInput"
                  value={dataFactura[0]?.dateExpeditie?.mijlocTransport}
                  onChange={(e) =>
                    updateDateFactura(
                      "dateExpeditie",
                      "mijlocTransport",
                      e.target.value,
                    )
                  }
                />{" "}
                nr{" "}
                <input
                  type="text"
                  className="regularInput"
                  value={dataFactura[0]?.dateExpeditie?.mijlocTransportNr}
                  onChange={(e) =>
                    updateDateFactura(
                      "dateExpeditie",
                      "mijlocTransportNr",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="footerRow">
                <span>
                  Expedierea s-a facut in prezenta noastra la, <br />
                  data de
                  <input
                    type="date"
                    className="dataExpediere"
                    value={dataFactura[0]?.dateExpeditie?.dataExpediere}
                    onChange={(e) =>
                      updateDateFactura(
                        "dateExpeditie",
                        "dataExpediere",
                        e.target.value,
                      )
                    }
                  />{" "}
                  ora{" "}
                  <input
                    type="time"
                    className="oraExpediere"
                    value={dataFactura[0]?.dateExpeditie?.oraExpediere}
                    onChange={(e) =>
                      updateDateFactura(
                        "dateExpeditie",
                        "oraExpediere",
                        e.target.value,
                      )
                    }
                  />
                </span>
              </div>
              <span>Semnaturile</span>
            </div>
            <div className="accize">
              <div className="stanga">
                <span className="totalAccize">
                  Total <br /> din care: <br /> accize
                </span>
                <span className="semnaturaPrimire">
                  Semnătura <br /> de primire
                </span>
              </div>
              <div className="dreapta">
                <div className="totaluri">
                  <input
                    className="inputTotal"
                    type="number"
                    value={calcTotal("valoareLei")?.toFixed(2)}
                    readOnly
                  />
                  <input
                    className="inputTotal"
                    type="number"
                    value={calcTotal("valoareTva")?.toFixed(2)}
                    readOnly
                  />
                  <input
                    className="inputTotal"
                    type="text"
                    value={dataFactura[0]?.accize?.totalAccize}
                    onChange={(e) =>
                      updateDateFactura("accize", "totalAccize", e.target.value)
                    }
                  />
                  <input
                    className="inputTotal"
                    type="text"
                    value={dataFactura[0]?.accize?.totalAccizeTva}
                    onChange={(e) =>
                      updateDateFactura(
                        "accize",
                        "totalAccizeTva",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <span className="totalDePlata">
                  <span>
                    Total de plată <br />
                    (col.5 + col.6)
                  </span>
                  <span className="totalDePlataNr">
                    {(
                      +calcTotal("valoareLei")?.toFixed(2) +
                      +calcTotal("valoareTva")
                    )?.toFixed(2) + " lei"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={error.facturaExistaDeja ? "facturaExistaDeja" : "hidden"}>
        <Alert
          functie={() => {
            let newArray = dataFacturi.filter(
              (facturi) =>
                facturi.dateFactura.nrFactura !==
                dataFactura[0].dateFactura.nrFactura,
            );
            newArray.splice(0, 0, dataFactura[0]);
            setDataFacturi(newArray);
            //setDataFactura([obj]);
            setError({ ...error, facturaExistaDeja: false });
          }}
          confirm="Da"
          deny="Nu"
          setError={setError}
          error={error}
          type="error"
          text={
            "Factura cu numărul [" +
            dataFactura[0].dateFactura.nrFactura +
            "] există deja, vrei sa o modifici?"
          }
        />
      </div>
    </div>
  );
}

export default Invoice;
