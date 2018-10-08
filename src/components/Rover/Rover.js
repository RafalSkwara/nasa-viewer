import * as React from "react"
import { connect } from 'react-redux'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { MarsSetRover, MarsSetSolMax } from '../../actions/MarsActions'

import "./Rover.sass";
const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,

});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setRover: MarsSetRover
	}, dispatch);
}


class Rover extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.dispatchSetRover = this.dispatchSetRover.bind(this);
	}

	dispatchSetRover() {
		this.props.setRover(this.props.rover)
	}



	render() {
		const image = require(`../../assets/img/rover-${this.props.rover}.jpg`)
		let caption = this.props.rover.split('');
		caption[0] = caption[0].toUpperCase()
		caption = caption.join('')
		return(
			<NavLink to={`${this.props.match.path}/search`}>
				<div 
					className="rover" 
					style={{
						backgroundImage: `url(${image})`
					}}
					onClick={this.dispatchSetRover}
				>
					<div className="rover__image"	>
					</div>
					<div className="rover__title">
					<p>{caption}</p>
					</div>
			</div>
			</NavLink>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Rover))