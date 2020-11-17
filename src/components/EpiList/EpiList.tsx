import React from 'react';

import { Epi } from '../../dataTypes';
import EpiItem from '../EpiItem/EpiItem';
import Spinner from '../Spinner/Spinner';
import './EpiList.css';

type EpiListProps = {
    epiList: Array<Epi>,
    isLoadingData: boolean,
    reportEpi: Function
}

const EpiList: React.FC<EpiListProps> = ({ epiList, isLoadingData, reportEpi }) => {

    const renderContent = () => {
        return (
            <>
                <div className='textHeader'>Everyday peace indicators</div>
                <div className='textSubHeader'>Community Member</div>
                {epiList.map(epi => <EpiItem key={epi.id} epi={epi} reportEpi={reportEpi} />)}
            </>
        );
    }
    return (
        <div className='epiList'>
            {isLoadingData ? <Spinner /> : renderContent()}
        </div>
    );

}

export default EpiList;

