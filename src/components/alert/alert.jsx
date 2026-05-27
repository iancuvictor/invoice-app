import './style.css';

function Alert({ text, type , setError, error, adaugaFactura}) {
    return <div id='alertWrapper'>
    <div id='alertBody' className={type + 'Alert'}>{text}</div>
    <div className='butoaneAlerta'>
    <button className='butonAlerta' onClick={adaugaFactura}>Da</button>
    <button className='butonAlerta' onClick={() => setError({...error, facturaExistaDeja: false})}>Nu</button>
    </div>
    </div>
}

export default Alert;
