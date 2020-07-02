import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionsLoaded } from './../../redux/shop/shop.selectors';
import WithSpinner from './../../components/with-spinner/with-spinner.component';

import Product from './product.component';

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state)
});

const ProductContainer = connect(mapStateToProps)(WithSpinner(Product));

export default ProductContainer;
