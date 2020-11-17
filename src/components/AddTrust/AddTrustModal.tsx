import React, { useState } from 'react';
import { faPlusCircle, faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddTrustModal.css';
import { submitIssueTrust, submitRevokeTrust } from '../../common/apiFunctions';

type AddtrustModalProps = {
    closeModal: () => void;
}

const AddtrustModal: React.FC<AddtrustModalProps> = ({ closeModal }) => {
    const [trust, setTrust] = useState("");

    const inputChanged = (e: any) => {
        setTrust(e.target.value);
    };

    const sendNewIssueTrust = async () => {
        submitIssueTrust(trust);
        closeModal();
    }

    const sendNewRevokeTrust = async () => {
        submitRevokeTrust(trust);
        closeModal();
    }

    return (
        <div className='trustModal'>
            <div className='modalContentTrust'>
                <FontAwesomeIcon className='modalCloseIcon' icon={faTimesCircle} onClick={() => closeModal()} />
                <div className='trustModalInput'>
                    <textarea placeholder="Trust" id="newtrust" className='newTrustInput' onChange={inputChanged} value={trust}></textarea>
                </div>
                <div className='trustModalIcons'>
                    <FontAwesomeIcon className='sendIssueTrustBtn' icon={faPlusCircle} onClick={() => sendNewIssueTrust()} />
                    <FontAwesomeIcon className='sendRevokeTrustBtn' icon={faMinusCircle} onClick={() => sendNewRevokeTrust()} />
                </div>
            </div>
        </div>
    )
}

export default AddtrustModal;