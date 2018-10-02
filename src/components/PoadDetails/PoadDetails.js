import * as React from "react";
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'
import "./PoadDetails.sass";


class PoadDetails extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {

		}
		this.closeDetails = this.closeDetails.bind(this);
	}
	
	componentDidMount() {
		document.body.addEventListener('keypress', this.closeDetails)
	}

	componentWillUnmount() {
		document.body.removeEventListener('keypress', this.closeDetails)
	}

	closeDetails(e) {
		let event = e;
		event.keyCode === 27 ? this.props.clickHandler() : null

	}

	render() {
		return (

			<div
				className="poad-details"
				key={this.props.text.slice(0, 10)}
				onClick={this.props.clickHandler}
			>
				<h3 className="heading">Picture Details</h3>
				<p>{this.props.text}</p>
				<p className="small">Click, tap or press <em>Escape</em> to exit</p>
			</div>
		)

	}

}

export default PoadDetails