import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import Header from "../Header/Header";
import './rc-calendar.sass';
import Calendar from 'rc-calendar';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'
import "./aPoaD.sass";


class aPoaD extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			transition: this.props.num * 100 + 'ms',
			value: ''
		}
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				transition: ''
			})
		}, 1000);
	}

	handleChange(val) {
		this.setState({
			value: val
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
							<Calendar className={"calendar"}>
								{
									({ value }) => {
										return (<input type="text" name="startDate" value={value} onChange={this.handleChange(value)} />);
									}
								}
							</Calendar>
							<button>
								Search
							</button>
						</div>
						<div className="column column-right">
							{this.state.value[0]}
						</div>
					</div>
				</div>

			</section>
		)
	}

}

export default aPoaD