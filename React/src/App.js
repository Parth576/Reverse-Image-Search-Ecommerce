import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import Upload from './components/image-upload/upload.component';

// import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import { setSearchString } from './redux/search/search.action';
import { selectSearchString } from './redux/search/search.selectors';

import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // const { setCurrentUser, collectionsArray } = this.props;
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    // addCollectionAndDocuments('collections',collectionsArray.map(({title, items}) => ({title,items})));
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.props.setSearchString('');
  }

  handleChange = (e) => {
    // this.setState({ searchString: e.target.value },() => console.log(this.state.searchString))
    this.props.setSearchString(e.target.value);
  }



  render() {
    return (
      <div>
        <Header handleChange={this.handleChange}/>
        <Switch>
          <Route exact path='/' render={routeProps => <HomePage searchString={this.props.searchString}/>} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/upload' component={Upload} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  searchString: selectSearchString,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setSearchString: search => dispatch(setSearchString(search))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
