import * as React from "react";
import { withRouter } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition';
import Header from "../Header/Header";
import APoaDSearch from "../APoaDSearch/APoaDSearch";
import Calendar from 'rc-calendar';
import PoadPicture from '../PoadPicture/PoadPicture';

import { Route } from 'react-router-dom'

class aPoaD extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
	}

	render() {
		const imgSrc = require('../../assets/img/bg2.jpg');
		return(
			<AnimatedSwitch

				atEnter={{ opacity: 0 }}
				atLeave={{ opacity: 0 }}
				atActive={{ opacity: 1 }}
				className="switch-wrapper"
			>
				
				<Route path={`${this.props.match.path}`} exact component={APoaDSearch}/>
				<Route path={`${this.props.match.path}/picture`} component={PoadPicture}/>
				/>
			</AnimatedSwitch>
		)
	}

}

export default withRouter(aPoaD)