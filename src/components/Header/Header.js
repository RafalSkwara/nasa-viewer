import * as React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//Icons
import { Icon } from 'react-icons-kit'
import { ic_arrow_back } from 'react-icons-kit/md/'
import "./Header.sass";


class Header extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);

	}

	render() {
		return(
		<header className="hero__header">
			<div className="hero__logo">
				<NavLink to="/">
					<h1>SkyDelve</h1>
				</NavLink>
			</div>
				{this.props.goBack && <NavLink to={this.props.to} className="go-back-link flex-center">
					<Icon icon={ic_arrow_back} size={34} />
				</NavLink>}
		</header>
		)
	}

}

export default withRouter(Header)