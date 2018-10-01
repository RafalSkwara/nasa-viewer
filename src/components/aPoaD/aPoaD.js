import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
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
import "./aPoaD.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey
});

class aPoaD extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			transition: this.props.num * 100 + 'ms',
			value: '',
			request_base: 'https://api.nasa.gov/planetary/apod?api_key=',
			request: '',
			picture: ''

		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				transition: ''
			})
		}, 1000);
	}

	buildUrl() {
		let url = this.state.request_base + this.props.apiKey;
		return this.state.value ? url += `&date=${this.state.value}` : url
	}

	handleChange(val) {
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
		let url = this.buildUrl();
		console.log('search fired');
		
		axios.get(url)
			.then(res => {
				console.log(res.data)
				this.setState({
					picture: res.data.url ? res.data.url : res.data.hdurl,
					mediaType: res.data.media_type,
					text: res.data.explanation
				})
			})
	}

	render() {
		const imgSrc = require('../../assets/img/bg2.jpg');
		return(
			<section className="hero fullscreen-bg poad" style={{ backgroundImage: `url(${imgSrc})` }}>
				<Header />
				<div className="hero__content flex-column-center">
					<h1>A Picture of the Day</h1>
					<h2>Welcome to A Picture of the Day image viewer. Here you can browse through thousands of images
						that have been chosen by NASA. These are some of the best space-related photographs ever taken. Enjoy!
				</h2>
					<div className="poad__results-wrap">
						<div className="column column-left">
							< Calendar 
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
						<div className="column column-right">
							<CSSTransition
								// in={this.state.visible}
								key={this.state.picture}
								in={true}
								appear={true}
								exit={true}
								timeout={600}
								classNames="deshrink"
								unmountOnExit>
								<Picture url={this.state.picture} mediaType={this.state.mediaType} />
							</CSSTransition>
						</div>
					</div>
				</div>

			</section>
		)
	}

}

export default connect(mapStateToProps)(aPoaD)