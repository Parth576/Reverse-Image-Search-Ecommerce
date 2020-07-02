import React from 'react';

import { withRouter } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import { connect } from 'react-redux';
import { selectSearchString } from './../../redux/search/search.selectors';
import { createStructuredSelector } from 'reselect';
import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items, history,match, searchString }) => {
  const filteredItems = items.filter(item=>
    item.name.toLowerCase().includes(searchString.toLowerCase()));
  return(
  <div className='collection-preview'>
    <h1 className='title' onClick={() => history.push(`${match.url}/${title.toLowerCase()}`)}>{title.toUpperCase()}</h1>
    <div className='preview'>
      {filteredItems
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} title={title}/>
        ))}
    </div>
  </div>
);}

const mapStateToProps = createStructuredSelector({
  searchString: selectSearchString
})

export default withRouter(connect(mapStateToProps)(CollectionPreview));
