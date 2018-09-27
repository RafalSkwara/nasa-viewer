import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from "../Header/Header";
import "./aPoaD.sass";


class aPoaD extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			transition: this.props.num * 100 + 'ms'
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				transition: ''
			})
		}, 1000);
	}

	render() {
		const imgSrc = require('../../assets/img/bg2.jpg');
		return(

			<section className="hero fullscreen-bg" style={{ backgroundImage: `url(${imgSrc})` }}>
				<Header />
				<div className="hero__content"  >
					<p>APOAD</p>
				</div>

			</section>
		)
	}

}

export default aPoaD