import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
//actions
import { EPICVariantPlus, EPICVariantMinus, EPICSetVariant, changeEPICNatural } from '../../actions/EPICActions';
//components
import EPICPicture from '../EPICPicture/EPICPicture';
import EPICSearch from '../EPICSearch/EPICSearch';
import Calendar from 'rc-calendar';
import Header from "../Header/Header";
import Toggle from "../Toggle/Toggle";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_rotate_right, ic_rotate_left } from 'react-icons-kit/md/'
//styles
import "./EPIC.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	natural: state.EPICReducer.natural,
	variant: state.EPICReducer.variant
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		variantMinus: EPICVariantMinus,
		variantPlus: EPICVariantPlus,
		setVariant: EPICSetVariant,
		changeNatural: changeEPICNatural
	}, dispatch);
}

class EPIC extends React.Component {
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

				<Route path={`${this.props.match.path}`} exact component={EPICSearch} />
				<Route path={`${this.props.match.path}/picture`} component={EPICPicture} />
				/>
			</AnimatedSwitch>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(EPIC)