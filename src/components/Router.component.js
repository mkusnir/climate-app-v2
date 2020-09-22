import React, {Component} from 'react';
import Graph from './Graph.component';
import List from './List.component';
import Home from './Homepage.component';

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 'list'
        }
    }
    
    render() {
        switch(this.state.index){
            
            case 'home':
                return <Home />
            case 'graph':
                return <Graph />
            case 'list':
                return <List />
            default:
                return <div><h1>An error has occured.</h1></div>;
        }
    }
}

export default Router;