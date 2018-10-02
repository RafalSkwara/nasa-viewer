import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//actions
import { EPICVariantPlus, EPICVariantMinus, EPICSetVariant } from '../../actions/EPICVariantActions';
import { changeEPICNatural } from '../../actions/changeEPICNatural';
//components
import Picture from '../Picture/Picture';
import Calendar from 'rc-calendar';
import Picker from 'rc-calendar';
import Header from "../Header/Header";
import Toggle from "../Toggle/Toggle";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_rotate_right, ic_rotate_left } from 'react-icons-kit/md/'
//styles
import './rc-calendar.sass';
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
		url = this.state.year ? url + `/date/${this.state.year}-${this.state.month}-${this.state.day}` : url;

		return url + '?api_key=' + this.props.apiKey;;
	}

	handleChange(val) {
		// update state with selected date
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
		});
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
				<Header goBack={true}/>
				<div className="hero__content flex-column-center">
					<h1>EPIC</h1>
					<h2>The EPIC API provides information on the daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument.
						Here you'll find the most beautiful images of our planet. 
				</h2>
					<div className="epic__results-wrap">
						<div className="column column-left">
							<Picker 
							className="calendar"
							onChange={ (value) => this.handleChange(value) } 
							showDateInput={false}
						>
							{
								({ value }) => {
									return (<input type="text" name="startDate" value={value} />);
								}
							}
							</Picker>
							<Toggle toggleLabel="Enhanced Mode" size={60}/>
							<button onClick={this.handleSearch}>
								Search
							</button>
							<div className="buttons">
								<button className="rotate flex-center" onClick={this.rotateLeftHandler} >
									<Icon icon={ic_rotate_left} size={24}/>
								</button>
								<button className="rotate flex-center" onClick={this.rotateRightHandler}> 
									<Icon icon={ic_rotate_right} size={24}/>							
								</button>
							</div>	
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
							
						</div>

					</div>
				</div>

			</section>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(EPIC)