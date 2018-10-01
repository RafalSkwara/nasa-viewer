import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import { EPICVariantPlus } from '../../actions/EPICVariantPlus';
import { EPICVariantMinus } from '../../actions/EPICVariantMinus';
import { changeEPICNatural } from '../../actions/changeEPICNatural';
import Header from "../Header/Header";
import './rc-calendar.sass';
import Calendar from 'rc-calendar';
import Picture from '../Picture/Picture';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'
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
		changeNatural: changeEPICNatural
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
		this.variantPlus = this.variantPlus.bind(this)
	}

	buildUrl() {
		let url = this.state.request_base;
		url = this.props.natural ? url + `natural` : url + 'enhanced';
		url = this.state.year ? url + `/date/${this.state.year}-${this.state.month}-${this.state.day}` : url;

		return url + '?api_key=' + this.props.apiKey;;
	}

	handleChange(val) {
		let dat = val._d;
		let year = val._d.getFullYear();
		let month = val._d.getMonth() + 1;
		month = month <= 9 ? "0"+month : month
		let day = val._d.getDate();
		day = day <= 9 ? "0"+day : day;
		this.setState({
			day: day,
			month: month,
			year: year
		})
	}
	
	variantPlus() { //string: "left" or "right"
		console.log('fired');
		if (this.state.imgLength !== undefined && this.props.variant < this.state.imgLength) {
			this.props.variantPlus();
		}

	}

	handleSearch() {
		let url = this.buildUrl();
		
		axios.get(url)
			.then(res => {
				let variant = this.props.variant
				this.setState({
					picture: `https://epic.gsfc.nasa.gov/archive/
					${this.props.natural? "natural" : "enhanced"}
					/${this.state.year}/${this.state.month}/${this.state.day}
					/jpg/`+res.data[variant].image+'.jpg',
					imgLength: res.data.length
				})
			})
	}

	render() {
		const imgSrc = require('../../assets/img/bg2.jpg');
		return(
			<section className="hero fullscreen-bg epic" style={{ backgroundImage: `url(${imgSrc})` }}>
				<Header />
				<div className="hero__content flex-column-center">
					<h1>EPIC</h1>
					<h2>The EPIC API provides information on the daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument.
						Here you'll find the most beautiful images of our planet. 
				</h2>
					<div className="epic__results-wrap">
						<div className="column column-left">
							<Calendar 
							className="calendar"
							onChange={ (value) => this.handleChange(value) } 
							showDateInput={false}
						>
							{
								({ value }) => {
									return (<input type="text" name="startDate" value={value} />);
								}
							}
							</Calendar>
							<button onClick={this.handleSearch}>
								Search
							</button>
						</div>
						<div className={`column column-right ${this.state.picture?null:"shrunk"}`}>
							<CSSTransition
								// in={this.state.visible}
								key={this.state.picture}
								in={true}
								appear={true}
								exit={true}
								timeout={600}
								classNames="deshrink"
								unmountOnExit>
								<Picture url={this.state.picture} />
							</CSSTransition>
							<div className="buttons">						
								<button 
									className="rotate" 
									onClick={this.variantPlus}> 
										left 
								</button>
								<button className="rotate" onClick={this.variantPlus}> right </button>
								<button onClick={this.props.changeNatural}>Toggle</button>
							</div>
						</div>

					</div>
				</div>

			</section>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(EPIC)