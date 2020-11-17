import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { TrustPerson } from '../../dataTypes';
import TrustPersonItem from '../TrustPersonItem/TrustPersonItem';
import './TrustPeople.css';

type TrustPeopleProps = {
    people: Array<TrustPerson>,
    isLoadingData: boolean,
    closeTrustPeople: Function
}

enum SlideClasses {
    in = 'slideIn',
    out = 'slideOut'
}

const TrustPeople: React.FC<TrustPeopleProps> = ({ people, closeTrustPeople }) => {

    const [slideClass, setSlideClass] = useState(SlideClasses.in);
    const onCloseClick = () => {
        setSlideClass(SlideClasses.out);
        setTimeout(() => closeTrustPeople(), 150);
    }

    return (
        <div className={`trustPeopleContainer ${slideClass}`}>
            <div className='closeIcon'>
                <FontAwesomeIcon  icon={faTimesCircle} onClick={() => onCloseClick()} />
            </div>
            <div className='peopleList'>
                {people.map(p => <TrustPersonItem key={p.id} person={p} />)}
            </div>
        </div>
    )
}

export default TrustPeople;