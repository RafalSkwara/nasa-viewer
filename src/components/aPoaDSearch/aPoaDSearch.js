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
			value: this.formatDate(new Date()),
			request_base: 'https://api.nasa.gov/planetary/apod?api_key=',
			picture: ''

		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
	}
	// helpers
	buildUrl() {
		let url = this.state.request_base + this.props.apiKey;
		return this.state.value ? url += `&date=${this.state.value}` : url
	}

	formatDate(dateObj) {
		let dat = dateObj;
		const year = dat.getFullYear();
		const month = dat.getMonth() + 1;
		const day = dat.getDate();
		return `${year}-${month}-${day}`;
	}
	// handlers
	handleChange(val) {
		//update the state with selected date

		this.setState({
			value: this.formatDate(val._d)
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
			<div className="container-fluid p-0 poad poad-search" style={{
				backgroundImage: `url(${imgSrc})`,
				height: "100vh",
				width: "100vw"
			}}>
			<Header goBack to={"/start"} />
			<div className="row no-gutters">
				<div className="col-12">
					<h1 className="main-heading">Astronomy Picture of the Day</h1>				
				</div>
				<div className="col col-12">
					<p>Welcome to Astronomy Picture of the Day image viewer. Here you can see thousands of amazing images chosen by NASA that come with detailed explanations.</p>
					<p>Just pick a date and click the Search button to begin your journey thorugh space and time. Have fun!</p>				
				</div>
			</div>
			<div className="row no-gutters spacer-small"></div>
			<div className="row no-gutters">
				<div className="col col-12 justify-content-center">
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
				</div>
			</div>
			<div className="row no-gutters">
				<div className="col col-12 justify-content-center">
					<NavLink 
						to={`${this.props.match.path}/picture`} 
						onClick={this.handleSearch}
						className="search-button btn"
					>
						Search
					</NavLink>
				
				</div>
			</div>
			
			</div>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(aPoaDSearch))