
import './style.css'

function InvoiceList({ array, setArray }) {
  const deleteFacturi = () => {
    setArray([]);
  };

//   useEffect(() => {
//     let data = JSON.parse(localStorage.getItem('listaFacturi'));
//     setArray([...array, data]);
//   }, [])

  return (
    <div id="body">
      <h1>LISTA FACTURI</h1>
      {array?.map((factura, index) => {
        return <div className="listaFactura" key={index}>
            <span>{index + 1}</span>
            <button>{factura?.cumparator?.denumire}</button>
          </div>
      })}
      <button onClick={() => deleteFacturi()}>Șterge lista</button>
    </div>
  );
}

export default InvoiceList;
