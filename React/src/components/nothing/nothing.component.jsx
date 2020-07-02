import React from 'react';
import { Route } from 'react-router-dom';


class SomeThing extends React.Component {

    render(){

        console.log(this.props);

        return(
        <Route exact path={`${this.props.match.path}`}>
        <div>
            <h1>Hi</h1>
        </div>
        </Route>
        )
    }
};

export default SomeThing;