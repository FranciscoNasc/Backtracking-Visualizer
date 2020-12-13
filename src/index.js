import ReactDOM from 'react-dom';
import React from 'react';
import SudokuSolver from './sudoku-solver/sudoku-solver'
import './index.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'


function Icon(props){
    let icon = "icon " + props.icon;
    if(props.icon === " bars"){
        return <span  ><FontAwesomeIcon className={icon} onClick={() => props.onClick(props.icon)} icon={faBars} /></span>
    }else{
        return <span><FontAwesomeIcon className={icon} onClick={() => props.onClick(props.icon)} icon={faTimes} /></span>
    }
}

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            icon: " bars",
            displayLinks: "topnav ",
        }
    };

    handleClick(icon){

        if(icon === " bars")
            this.setState({icon: " close ", displayLinks: "topnav display-links"});
        else    
            this.setState({icon: " bars", displayLinks: "topnav "});       
        console.log(this.state.displayLinks);
    }
    render(){
        return (
            <Router>
                <div className={this.state.displayLinks}>
                    <Link to={'/#'}> Home </Link>
                    <Link to={'/#'} className="algo"> 8 Queens </Link>
                    <Link to={'/sudoku'} className="algo"> Sudoku </Link>
                    <Icon icon={this.state.icon} onClick={(icon) => this.handleClick(icon)} />

                     { /*add onlick for both of tem*/}

                </div>
              <Switch>
                  {/* <Route path='/' component={Home} /> */}
                  <Route path='/sudoku' component={SudokuSolver} />
              </Switch>
          </Router>
        )
    };
}


ReactDOM.render(
    <Home/>,
    // <SudokuSolver/>,
    document.getElementById('root')
)