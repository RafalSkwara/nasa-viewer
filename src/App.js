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

import aPoaD from './components/aPoaD/aPoaD';
import EPIC from './components/EPIC/EPIC';
import HomePage from './views/HomePage';
import StartPage from './views/StartPage';

import "./view_styles/theme.sass";


class App extends React.Component {
    // eslint-disable-line react/prefer-stateless-function
	;
    render() {
		
		const timeout = 1000;
		return (
			<Router basename={"/"} > 
			{/* change the string in basename to "/" for development */}
				<div className={"page-wrapper"}>
					<AnimatedSwitch

				    	atEnter={{ opacity: 0 }}
						atLeave={{ opacity: 0 }}
						atActive={{ opacity: 1 }}
      					className="switch-wrapper"
					  >
							<Route path={"/epic-earth"} exact component={EPIC}/>
							<Route path={"/picture-of-the-day"} exact component={aPoaD}/>
							<Route path={"/start"} exact component={StartPage}/>
							<Route path={"/"} exact component={HomePage}/>
							<Redirect from={"*"} to={"/"} />
						</AnimatedSwitch>

				</div>	

			</Router>
			)
	}

}

export default withRouter(hot(module)(connect(null)(App)))
