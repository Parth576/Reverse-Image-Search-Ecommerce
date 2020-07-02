import React from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';
import { selectSearchString } from '../../redux/search/search.selectors';

import { Route } from 'react-router-dom';

import './collection.styles.scss';

const CollectionPage = ({ collection, match, searchString }) => {
  console.log(match.params);
  const { title, items } = collection;
  const newItems = items.filter(item=>
    item.name.toLowerCase().includes(searchString.toLowerCase()))
  return (
    // <Route path={`${match.path}`}>
      <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
          {newItems.map(item => (
            <CollectionItem key={item.id} item={item} title = {title}/>
          ))}
        </div>
      </div>
    // </Route>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
  searchString: selectSearchString(state)
});

export default connect(mapStateToProps)(CollectionPage);
