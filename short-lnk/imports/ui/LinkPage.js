import React from 'react';
import LinksList from '../ui/LinksList';
import AddLink from './AddLink';
import PrivateHeader from './PrivateHeader';
import LinksListFilters from './LinksListFilters';

const LinkPage = () => {
    return (
        <div>
            <PrivateHeader title="Your Links"/>
            <div className="page-content">
                <LinksListFilters/>
                <AddLink/>
                <LinksList/>
            </div>
        </div>
    )
};

export default LinkPage;





