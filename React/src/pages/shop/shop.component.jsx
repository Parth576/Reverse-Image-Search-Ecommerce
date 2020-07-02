import React from 'react';
import { Route } from 'react-router-dom';
import ProductContainer from '../../components/product/product.container';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// import WithSpinner from './../../components/with-spinner/with-spinner.component';

// import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from './../../redux/shop/shop.selectors';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';


// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);
// const ProductWithSpinner = WithSpinner(Product);


class ShopPage extends React.Component{

  componentDidMount() {
    // const {updateCollections} = this.props;
    // const CollectionRef = firestore.collection('collections');

    //METHOD 1 ORIGINAL WAY TAUGHT
    // this.unsubscribeFromSnapshot = CollectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({loading: false});
    // })

    //METHOD 2 - USING PROMISES
    // CollectionRef.get().then(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({loading: false});
    // })

    // USING FETCH
    // fetch('https://firestore.googleapis.com/v1/projects/crown-db/databases/(default)/documents/collections')
    // .then(response => response.json())
    // .then(collections => console.log(collections))

    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }

  render(){
    const {match, isCollectionFetching, isCollectionLoaded} = this.props;
    return(
      <div className='shop-page'>
    <Route 
      exact 
      path={`${match.path}`} 
      // render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} 
      component={CollectionsOverviewContainer}
    />
    <Route 
      exact 
      path={`${match.path}/:collectionId`} 
      // render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>}
      component={CollectionPageContainer}
    />
    <Route 
      path={`${match.path}/:collectionId/:anyId`} 
      // render={(props) => <ProductWithSpinner isLoading={!isCollectionLoaded} {...props} />}   
      component={ProductContainer}
    />
  </div>
    )
  }
}

// const mapStateToProps = createStructuredSelector({
//   isCollectionFetching: selectIsCollectionFetching,
//   isCollectionLoaded: selectIsCollectionsLoaded
// })

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync : () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null,mapDispatchToProps)(ShopPage);
