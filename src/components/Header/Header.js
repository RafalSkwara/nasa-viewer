import * as React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import "./Header.sass";


class Header extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);

	}

	render() {
		return(
		<header className="hero__header">
			<div className="hero__logo column-flex-center">
				<NavLink to="/">
					<h1>SkyDelve</h1>
				</NavLink>
			</div>
		</header>
		)
	}

}

export default withRouter(Header)