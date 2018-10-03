import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//actions
import { 
	EPICVariantPlus, 
	EPICVariantMinus, 
	EPICSetVariant, 
	changeEPICNatural, 
	EPICSetImage, 
	EPICSetLength,
	EPICSetDate } from '../../actions/EPICActions';
//components
import PoadPicture from '../PoadPicture/PoadPicture';
import Calendar from 'rc-calendar';
import Picker from 'rc-calendar';
import Header from "../Header/Header";
import Toggle from "../Toggle/Toggle";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_rotate_right, ic_rotate_left } from 'react-icons-kit/md/'
//styles
import '../../view_styles/rc-calendar.sass';
import "./EPICSearch.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	natural: state.EPICReducer.natural,
	imgUrl: state.EPICReducer.imgUrl,
	day: state.EPICReducer.day,
	month: state.EPICReducer.month,
	year: state.EPICReducer.year,
	variant: state.EPICReducer.variant
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		variantMinus: EPICVariantMinus,
		variantPlus: EPICVariantPlus,
		setVariant: EPICSetVariant,
		changeNatural: changeEPICNatural,
		setImage: EPICSetImage,
		setDate: EPICSetDate,
		setLength: EPICSetLength
	}, dispatch);
}

class EPIC extends React.Component {
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
			<section className="hero fullscreen-bg epic" style={{ backgroundImage: `url(${imgSrc})` }}>
				<Header goBack={true} to={"/start"}/>
				<div className="hero__content flex-column-center">
					<h1>EPIC</h1>
					<p>The EPIC API provides information on the daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument.
						Here you'll find the most beautiful images of our planet. 
					</p>
					
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
					<Toggle toggleLabel="Enhanced Mode" size={60}/>
					<NavLink to={`${this.props.match.path}/picture`} onClick={this.handleSearch} 
						className="btn">
						Search
					</NavLink>
				</div>
			</section>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(EPIC)