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
				<div className="row no-gutters">
					<div className="col col-12 justify-content-space-around">
						<header className="header p-0 pl-3">
							<div className="header__logo">
								<NavLink to="/">
									<h1>SkyDelve</h1>
								</NavLink>
							</div>
								{this.props.goBack && <NavLink to={this.props.to} className="go-back-link flex-center">
									<Icon icon={ic_arrow_back} size={34} />
								</NavLink>}
						</header>
				</div></div>
		)
	}

}

export default withRouter(Header)