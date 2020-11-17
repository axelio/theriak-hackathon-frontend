import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Epi } from '../../dataTypes';
import './EpiItem.css';

type EpiItemProps = {
    epi: Epi,
    reportEpi: Function
}

const EpiItem: React.FC<EpiItemProps> = ({ epi, reportEpi }) => {

    const [isActive, setIsActive] = useState(true);

    const reportPositive = () => {
        if(!isActive) return;
        reportEpi(epi.id, true);
        setIsActive(false);
    }

    const reportNegative = () => {
        if (!isActive) return;
        reportEpi(epi.id, false);
        setIsActive(false);
    }

    return (
        <div className='epiItem'>
            <div className='epiText'>{epi.text}</div>
            <div className={`epiIcons ${isActive ? '' : 'nonActive'}`}>
                <FontAwesomeIcon icon={faCheckCircle} className='icon accept' onClick={() => reportPositive()} />
                <FontAwesomeIcon icon={faTimesCircle} className='icon decline' onClick={() => reportNegative()} />
            </div>
        </div>
    );

}

export default EpiItem;

