import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import {BulkUpdateImage, bulkUpdateImage} from '../../actions/APoaDActions';
import Header from "../Header/Header";
import '../../view_styles/rc-calendar.sass';
import Calendar from 'rc-calendar';


import {
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'
import "./aPoaDSearch.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	imgUrl: state.APOADReducer.imgUrl,
	imgHDUrl: state.APOADReducer.imgHDUrl,
	mediaType: state.APOADReducer.mediaType,
	details: state.APOADReducer.details
});
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateImage: bulkUpdateImage
	}, dispatch);
}
class aPoaDSearch extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			request_base: 'https://api.nasa.gov/planetary/apod?api_key=',
			picture: ''

		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
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
		console.log(this.buildUrl())
	}

	handleSearch() {
		this.props.updateImage("");
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
		return (
			<section className="hero fullscreen-bg poad-search" style={{ backgroundImage: `url(${imgSrc})` }}>
			<Header goBack to={"/start"} />
			<div className="hero__content">
				<h1>A Picture of the Day</h1>
				<p>Welcome to Astronomy Picture of the Day image viewer. Here you can see thousands of amazing images chosen by NASA that come with detailed explanations.</p>
				<p>Just pick a date and click the Search button to begin your journey thorugh space and time. Have fun!</p>
				<div className="poad__calendar-wrap">
					<Calendar 
						className="calendar"
						onChange={ (value) => this.handleChange(value) } 
						showDateInput={false}
						showToday={false}
					>
						{
							({ value }) => {
								return (<input type="text" name="startDate" value={value} />);
							}
						}
					</Calendar>
					<NavLink 
						to={`${this.props.match.path}/picture`} 
						onClick={this.handleSearch}
						className="search-button btn"
					>
						Search
					</NavLink>
				</div>
			</div>
			</section>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(aPoaDSearch))