import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import { changeEPICNatural } from '../../actions/changeEPICNatural';
import "./Toggle.sass";

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeNatural: changeEPICNatural
	}, dispatch);
}

class Toggle extends React.Component {
	// eslint-disable-line react/prefer-stateless-function


	constructor(props) {
		super(props);
		this.state = {
			on: this.props.active
		}
		this.toggle = this.toggle.bind(this)
	}

	toggle() {
		this.setState({
			on: !this.state.on
		})
		this.props.changeNatural()
	}

	render() {
		const classOn = this.state.on ? "on" : null;
		return (
			<div className="toggle--wrapper" style={{width: this.props.size+"%"}}>
				<p>{this.props.toggleLabel}</p>
				<div className={`toggle ${this.state.on ? "active" : ""}`} onClick={this.toggle}>
					<div className={`toggle__ball ${this.state.on ? "on": ""}`}></div>
				</div>
			</div>
		)

	}

}

Toggle.propTypes = {
	size: PropTypes.number.isRequired,
	toggleLabel: PropTypes.string,
	active: PropTypes.bool
}

export default connect(null, mapDispatchToProps)(Toggle)