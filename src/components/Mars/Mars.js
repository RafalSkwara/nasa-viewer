import * as React from "react";
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import MarsRovers from '../MarsRovers/MarsRovers'
import MarsSearch from '../MarsSearch/MarsSearch'
import MarsPicture from '../MarsPicture/MarsPicture'
//styles
import "./Mars.sass";


class Mars extends React.Component {
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

				<Route path={`${this.props.match.path}`} exact component={MarsRovers} />
				<Route path={`${this.props.match.path}/search`} component={MarsSearch} />
				<Route path={`${this.props.match.path}/picture`} component={MarsPicture} />
				/>
			</AnimatedSwitch>
		)
	}

}

export default Mars