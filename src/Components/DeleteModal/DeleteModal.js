import { Modal } from "react-bootstrap";
import * as Icon from 'react-feather';

export const DeleteModal = (props) => {


    return (
        <>
        <Modal.Header className="point-title" closeButton>Delete {props.subject}</Modal.Header>
            <Modal.Body>
                <p>Delete this {props.subject}?</p>
                
            </Modal.Body>
            <Modal.Footer>
            <button className="btn btn-outline-light align-items-center" style={{ border: "0.5px solid #e5e5e5"}}
                    onClick={() => props.startDelete()}
                    >Delete <Icon.Edit size="14" /></button>
                    <button className="btn btn-outline-light align-items-center" style={{ border: "0.5px solid #e5e5e5"}}
                    onClick={() => props.handleClose()}
                    >Cancel <Icon.Edit size="14" /></button>
            </Modal.Footer>
        </>
    )
}
