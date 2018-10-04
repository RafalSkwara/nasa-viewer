import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//actions
import { NeoSetStartDate, NeoSetEndDate } from '../../actions/NeoActions';
//components
import Calendar from 'rc-calendar';
import Header from "../Header/Header";
import Toggle from "../Toggle/Toggle";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_rotate_right, ic_rotate_left } from 'react-icons-kit/md/'
//styles
import '../../view_styles/rc-calendar.sass';
import "./NeoSearch.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	endDate: state.NeoReducer.endDate,
	startDate: state.NeoReducer.startDate
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setStartDate: NeoSetStartDate,
		setEndDate: NeoSetEndDate
	}, dispatch);
}

class NeoSearch extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			request_base: 'https://api.nasa.gov/neo/rest/v1/feed?',
		}
		this.handleEnd = this.handleEnd.bind(this)
		this.handleStart = this.handleStart.bind(this)
		this.handleSearch = this.handleSearch.bind(this)

	}

	buildUrl() {
		let url = this.state.request_base;
		url = this.props.startDate ? url + `?start_date=${this.props.startDate}` : url;
		url = this.props.endDate ? url + `&end_date=${this.props.endDate}` : url;

		return url + '&api_key=' + this.props.apiKey;
	}
	formatDate(val) {
		let day = val._d.getDate();
		let year = val._d.getFullYear();
		let month = val._d.getMonth() + 1;
		month = month <= 9 ? "0" + month : month
		day = day <= 9 ? "0" + day : day;
		return {
			day: day,
			month: month,
			year: year,
		}
	}
	handleStart(val) {
		// update store with selected date
		const dateObj = this.formatDate(val);
		const { day, month, year } = dateObj;
		this.props.setStartDate(`${year}-${month}-${day}`)
	}
	handleEnd(val) {
		// update store with selected date
		const dateObj = this.formatDate(val);
		const {day, month, year } = dateObj;
		this.props.setEndDate(`${year}-${month}-${day}`)
	}
	

	handleSearch() {
		let url = this.buildUrl();
		console.log(url)
		axios.get(url)
			.then(res => {
				console.table(res.data.near_earth_objects)
			})
	}

	render() {
		const imgSrc = require('../../assets/img/bg2.jpg');
		return(
			<div className="container-fluid p-0 neo neo-search" style={{
				backgroundImage: `url(${imgSrc})`,
				height: "100vh",
				width: "100vw"
			}}>
				<Header goBack={true} to={"/start"}/>
				<div className="row no-gutters">
					<div className="col-12">
						<h1 className="main-heading">Neo - Asteroid Feed</h1>
					</div>
					<div className="col col-12">
						<p>Asteeroid feed provides its users woth information about every registered asteroid in given time range.
						</p>
					</div>
				</div>
				<div className="row no-gutters spacer-small"></div>
				<div className="row no-gutters">
					<div className="col col-12 justify-content-center">
						<Calendar
							className="calendar"
							onChange={(value) => this.handleStart(value)}
							showDateInput={false}
							showToday={false}
						>
							{
								({ value }) => {
									return (<input type="text" name="startDate" value={value} />);
								}
							}
						</Calendar>
						<Calendar
							className="calendar"
							onChange={(value) => this.handleEnd(value)}
							showDateInput={false}
							showToday={false}
						>
							{
								({ value }) => {
									return (<input type="text" name="endDate" value={value} />);
								}
							}
						</Calendar>
					</div>
				</div>

				<div className="row no-gutters">
					<div className="col col-12 justify-content-center">
						<a  onClick={this.handleSearch} 
							className="btn">
							Search
						</a>
						{/* <NavLink to={`${this.props.match.path}/results`} onClick={this.handleSearch} 
							className="btn">
							Search
						</NavLink> */}
					</div>
				</div>
				
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(NeoSearch)