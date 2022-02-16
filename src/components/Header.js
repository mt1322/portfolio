import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isMenuOpen: false, isMenuOpen2:false};
    }

    clickMenuIcon() {
        this.setState({isMenuOpen: true});
        this.setState({isMenuOpen2: false});
    }

    closeMenuIcon() {
        this.setState({isMenuOpen: false});
        this.setState({isMenuOpen2: true});
    }

    render() {
        console.log(this.state.isMenuOpen);
        let panel;
        if (this.state.isMenuOpen) {
            panel = (
                <div class="sidePanel" onMouseLeave={() => {this.closeMenuIcon()}}>
                    <div className="right-header">
                        <span className="fa fa-bars menu-icon"></span>
                    </div>
                    <div className="links">
                        <p><a href="game/game.html" className="link"> ▶ゲーム </a></p>
                        <p><Link to="/sudoku" className="link"> ▶数独 </Link></p>
                    </div>
                </div>
            );
        }
        else if (this.state.isMenuOpen2) {
            panel = (
                <div class="sidePanel2" >
                    <div className="right-header">
                        <span className="fa fa-bars menu-icon" onMouseOver={() => {this.clickMenuIcon()}}></span>
                    </div>
                    <div className="links">
                        <p><a href="game/game.html" className="link"> ▶ゲーム </a></p>
                        <p><Link to="/sudoku" className="link"> ▶数独 </Link></p>
                    </div>
                </div>
            );
        }

        return(
            <header>
                <div className="wrapper">
                    <div className="left-header">
                        <h1>TM's WebPage</h1>
                    </div>
                    <div className="right-header">
                        <span className="fa fa-bars menu-icon2" onMouseOver={() => {this.clickMenuIcon()}}></span>
                    </div>                    
                </div>
                {panel}
            </header>
        );

    }

}

export default Header;