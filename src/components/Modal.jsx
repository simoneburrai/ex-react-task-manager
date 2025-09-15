import ReactDOM from "react-dom";

export default function Modal(props){
    const {title, content, show, onClose, onConfirm} = props;


    if(!show){
        return null
    }
    const modalContent = <div className="modal-overlay">
    <div className="modal-content">
        <h3>{title}</h3>
        {content}
        <div>
            <button onClick={onClose}>Annulla</button>
            <button onClick={onConfirm}>Conferma</button>
        </div>
    </div>
    </div>

   

    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"))
}