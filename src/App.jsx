import { Invoice, InvoiceList } from './components';
import './App.css';
import { useState } from 'react';

function App() {
  let [dataFacturi, setDataFacturi] = useState([]);
  return (
    <>
    <Invoice dataFacturi={dataFacturi} setDataFacturi={setDataFacturi}/>
    <div id='invoiceList'>
    <InvoiceList array={dataFacturi} setArray={setDataFacturi}/>
    </div>
    </>
  )
}

export default App
