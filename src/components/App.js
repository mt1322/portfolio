import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Sudoku from './Sudoku';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isMainPage: false, startAnime: false};
        this.init();
    }

    init() {
        setTimeout(() => {this.showMainPage()}, 1090);
        setTimeout(() => {this.setState({startAnime: true})}, 400);
    }

    showMainPage() {
        this.setState({isMainPage: true});
    }

    render() {
        let content="";
        let anime="";
        
        if (this.state.startAnime) 
            anime = <div class="appear"></div>;
        else 
            anime = <div class="load-anime"></div>;

        if (this.state.isMainPage) {
            content = (
                <div>
                    <Router>
                        <Route exact path='/' component={Header} />
                        <Route exact path='/' component={Main} />
                        <Route exact path='/' component={Footer} />
                        <Route path='/sudoku' component={Sudoku} />
                    </Router>
                </div>
            );
        }
        else {
            content = (
                <div>
                    <div id="loading">
                        <div id="load-logo">Loading ...</div>
                    </div>
                    {anime}
                </div>
            )
        }

        return(
            <div>
                {content}
                {anime}
            </div>
        );
    }
}



export default App;