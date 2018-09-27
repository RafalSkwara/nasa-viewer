import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import "./Card.sass";


class Card extends React.Component {
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
		const image = require(`../../assets/img/service-${this.props.num}.jpg`)
		return(
			<NavLink to={this.props.link} state={{transitionDelay: this.state.transition}}>
			<div className="card" style={{
				backgroundImage: `url(${image})`				
			}}>
				<div className="card__image"	>
				</div>
				<div className="card__title flex-center">
				<p>{this.props.service}</p>
				</div>
		</div>
		</NavLink>
		)
	}

}

export default Card