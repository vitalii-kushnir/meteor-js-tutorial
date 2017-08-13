import React from 'react';
import LinksList from '../ui/LinksList';
import AddLink from './AddLink';
import PrivateHeader from './PrivateHeader';
import LinksListFilters from './LinksListFilters';

const LinkPage = () => {
    return (
        <div>
            <PrivateHeader title="Your Links"/>
            <LinksListFilters/>
            <AddLink/>
            <LinksList/>
        </div>
    )
};

export default LinkPage;





