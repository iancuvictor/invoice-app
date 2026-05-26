import './style.css';

function Alert({ text, type }) {
    return <div id='alertWrapper'>
    <div id='alertBody' className={type}>{text}</div>
    </div>
}

export default Alert;
