import { hot } from "react-hot-loader"
import * as React from "react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actions from './actions/actions'
import { AnimatedSwitch } from 'react-router-transition';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect } from 'react-router-dom'

import Neo from './components/Neo/Neo';
import aPoaD from './components/aPoaD/aPoaD';
import EPIC from './components/EPIC/EPIC';
import Mars from './components/Mars/Mars';
import HomePage from './views/HomePage';
import StartPage from './views/StartPage';

import "./view_styles/theme.sass";


class App extends React.Component {
    // eslint-disable-line react/prefer-stateless-function
	;
    render() {
		
		const timeout = 1000;
		return (
			<Router basename={"/skydelve"} > 
			{/* change the string in basename to "/" for development */}

					<AnimatedSwitch

				    	atEnter={{ opacity: 0 }}
						atLeave={{ opacity: 0 }}
						atActive={{ opacity: 1 }}
      					className="switch-wrapper"
					  >
							<Route path={"/"} exact component={HomePage}/>
							<Route path={"/mars-photos"} component={Mars}/>
							<Route path={"/neo"} component={Neo}/>
							<Route path={"/epic-earth"} component={EPIC}/>
							<Route path={"/picture-of-the-day"} component={aPoaD}/>
							<Route path={"/start"} component={StartPage}/>
							<Redirect from={"*"} to={"/"} />
						</AnimatedSwitch>



			</Router>
			)
	}

}

export default withRouter(hot(module)(connect(null)(App)))
