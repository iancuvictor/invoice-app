import "./style.css";

function Alert({ text, type, setError, error, functie, confirm, deny }) {
  return (
    <div id="alertWrapper">
      <div id="alertBody" className={type + "Alert"}>
        {text}
      </div>
      <div className="butoaneAlerta">
        <button className={confirm === undefined ? 'butonAlerta hidden' : 'butonAlerta'} onClick={functie}>
          {confirm}
        </button>
        <button
          className={confirm === undefined ? 'butonAlerta hidden' : 'butonAlerta'}
          onClick={() => setError({ ...error, facturaExistaDeja: false })}
        >
          {deny}
        </button>
      </div>
    </div>
  );
}

export default Alert;
