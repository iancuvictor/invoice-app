
import './style.css'

function InvoiceList({ array, setArray }) {
  const deleteFacturi = () => {
    setArray([]);
  };

  const loadFactura = (index) => {
      let newArray = array.filter((facturi) => array.indexOf(facturi) !== index)
      newArray.splice(0, 0, array[index]);
      setArray(newArray)
    // console.log(array);
  }

//   useEffect(() => {
//     let data = JSON.parse(localStorage.getItem('listaFacturi'));
//     setArray([...array, data]);
//   }, [])

  return (
    <div id="body">
      <h1>LISTA FACTURI</h1>
      {array?.map((factura, index) => {
        return <button className='butonLista' key={index} onClick={() => loadFactura(index)}><span className='nrFactura'>{index + 1}</span><span className='numeFactura'>{factura?.cumparator?.denumire}</span></button>
      })}
      <button className='stergeLista' onClick={() => deleteFacturi()}>Șterge întreaga listă</button>
    </div>
  );
}

export default InvoiceList;
