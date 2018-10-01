import * as React from "react";
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';

import "./Toggle.sass";


class Toggle extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			on: false
		}
		this.toggle = this.toggle.bind(this)
	}

	toggle() {
		this.setState({
			on: !this.state.on
		})
	}

	render() {
		return (
			<CSSTransition
				// in={this.state.visible}
				key={this.state.value}
				in={true}
				appear={true}
				exit={true}
				timeout={600}
				classNames="deshrink"
				unmountOnExit>
			<div className="toggle">
				<div className="toggle__ball"></div>
			</div>
			</CSSTransition>
		)

	}

}

export default Toggle