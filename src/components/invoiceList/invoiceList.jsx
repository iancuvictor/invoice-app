function InvoiceList({array, setArray}){
    const deleteFacturi = () => {
        setArray([]);
    }

    return <div id='body'>
        <h1>LISTA FACTURI</h1>
        {array.map((factura) => {
            return <div className='listaFactura' key={array.indexOf(factura)}>
                <button>{factura.cumparator.denumire}</button>
            </div>
        })}
        <button onClick={deleteFacturi}>Șterge lista</button>
    </div>
}

export default InvoiceList;