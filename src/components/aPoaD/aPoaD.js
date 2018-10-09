import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import { BulkUpdateImage, bulkUpdateImage, clearImageData} from '../../actions/APoaDActions';
import Header from "../Header/Header";
import APoaDSearch from "../APoaDSearch/APoaDSearch";
import Calendar from 'rc-calendar';
import PoadPicture from '../PoadPicture/PoadPicture';

import {
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'
import "./aPoaD.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	imgUrl: state.APOADReducer.imgUrl,
	imgHDUrl: state.APOADReducer.imgHDUrl,
	mediaType: state.APOADReducer.mediaType,
	details: state.APOADReducer.details
});
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateImage: bulkUpdateImage,
		clearImageData: clearImageData
	}, dispatch);
}
class aPoaD extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			value: '2018-10-01',
			request_base: 'https://api.nasa.gov/planetary/apod?api_key=',
			picture: ''

		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
	}

	componentDidMount() {
		this.props.clearImageData();
	}
	

	buildUrl() {
		let url = this.state.request_base + this.props.apiKey;
		return this.state.value ? url += `&date=${this.state.value}` : url
	}

	handleChange(val) {
		//update the state with selected date
		let dat = val._d;
		const year = val._d.getFullYear();
		const month = val._d.getMonth() + 1;
		const day = val._d.getDate();
		this.setState({
			value: `${year}-${month}-${day}`
		})
	}

	handleSearch() {
		//method that fetches the data and distributes it in the state
		let url = this.buildUrl();		
		axios.get(url)
			.then(res => {
				this.props.updateImage({
					imgUrl: res.data.url ? res.data.url : res.data.hdurl,
					imgHDUrl: res.data.hdurl,
					mediaType: res.data.media_type,
					details: res.data.explanation
				})
			})
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
				
				<Route path={`${this.props.match.path}`} exact component={APoaDSearch}/>
				<Route path={`${this.props.match.path}/picture`} component={PoadPicture}/>
				/>
			</AnimatedSwitch>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(aPoaD))