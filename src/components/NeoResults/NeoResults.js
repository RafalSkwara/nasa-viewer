import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//actions
import { NeoSetDate } from '../../actions/NeoActions';
//components
import Calendar from 'rc-calendar';
import Header from "../Header/Header";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_rotate_right, ic_rotate_left } from 'react-icons-kit/md/'
//styles
import '../../view_styles/rc-calendar.sass';
import "./NeoResults.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	endDate: state.NeoReducer.endDate,
	startDate: state.NeoReducer.startDate
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setDate: setDate
	}, dispatch);
}

class NeoResults extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			request_base: 'https://api.nasa.gov/EPIC/api/',
			picture: '',
			imgLength: 2

		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.rotateLeftHandler = this.rotateLeftHandler.bind(this)
		this.rotateRightHandler = this.rotateRightHandler.bind(this)
	}

	buildUrl() {
		let url = this.state.request_base;
		url = this.props.natural ? url + `natural` : url + 'enhanced';
		url = this.props.year ? url + `/date/${this.props.year}-${this.props.month}-${this.props.day}` : url;

		return url + '?api_key=' + this.props.apiKey;;
	}

	handleChange(val) {
		// update store with selected date
		let dat = val._d;
		let year = val._d.getFullYear();
		let month = val._d.getMonth() + 1;
		month = month <= 9 ? "0"+month : month
		let day = val._d.getDate();
		day = day <= 9 ? "0"+day : day;
		this.props.setDate([day, month, year])
		this.props.setVariant(0)
	}
	
	variantPlus() {
		// add to variant number until max number reached, then start from 0
		if (this.state.imgLength !== undefined && this.props.variant < this.state.imgLength-1) {
			this.props.variantPlus();
		} else {
			this.props.setVariant(0)
		}
	}
	variantMinus() {
		// subtract from variant num until 0 reached, then loop over from end
		if (this.state.imgLength !== undefined && this.props.variant > 0) {
			this.props.variantMinus();
		} else {
			this.props.setVariant(this.state.imgLength - 1)
		}
	}

	rotateLeftHandler() { //left or right
		this.variantMinus();
		this.handleSearch();
	}
	rotateRightHandler() { //left or right
		this.variantPlus();
		this.handleSearch();
	}

	handleSearch() {
		let url = this.buildUrl();
		
		axios.get(url)
			.then(res => {
				let variant = this.props.variant
				this.props.setImage(
					 `https://epic.gsfc.nasa.gov/archive/${this.props.natural? "natural" : "enhanced"}/${this.props.year}/${this.props.month}/${this.props.day}/jpg/`+res.data[variant].image+'.jpg')
				this.props.setLength(res.data.length)
			})
	}

	render() {
		const imgSrc = require('../../assets/img/bg2.jpg');
		return(
			<div className="container-fluid p-0 epic epic-search" style={{
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
							onChange={(value) => this.handleChange(value)}
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
						<NavLink to={`${this.props.match.path}/results`} onClick={this.handleSearch} 
							className="btn">
							Search
						</NavLink>
					</div>
				</div>
				
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(NeoResults)