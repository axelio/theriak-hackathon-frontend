import React from 'react';
import { TrustPerson } from '../../dataTypes';
import './TrustPersonItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

type TrustPersonItemProps = {
    person: TrustPerson
}

const TrustPersonItem: React.FC<TrustPersonItemProps> = ({ person }) => {
    return (
        <div className='trustPersonItem'>
            <FontAwesomeIcon icon={faUserCircle} className='personIcon' />
            <div style={{ fontWeight: 'bolder' }}>{person.name}</div>
            <div>{person.trustRate}%</div>
        </div>
    )
}

export default TrustPersonItem;