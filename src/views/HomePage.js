import * as React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "../view_styles/HomePage.sass";


const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey
});


class HomePage extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			style: {
				animation: "mount .3s cubic-bezier(.83,.21,1,1) forwards"
			},
			data: [],
			visible: false
		}
		this.handleToggle = this.handleToggle.bind(this)
	}
	componentWillMount() {
		window.scrollTo({
			"behavior": "smooth",
			"left": 0,
			"top": 0
		});

	}
	

	handleToggle() {
		this.setState({
			visible: !this.state.visible
		})
	}
	render() {
		const bg = require('../assets/img/bg.jpg')
		const nasaLogo = require('../assets/img/logo-nasa.png')
		return (

				<div className="container-fluid p-0 main-container" style={{
					backgroundImage: `url(${bg})`,
					height: "100vh",
					width: "100vw"
				}}>
					<CSSTransition
						// in={this.state.visible}
						in={true}
						appear={true}
						exit={true}
						timeout={1000}
						classNames="fade"
						unmountOnExit>
						<React.Fragment>
						<div className="row no-gutters spacer-small"></div>
							<div className="row no-gutters">
							
								<div className="col-12">
								
								<div className="title-box flex-column-center" >
									<div className="title-box--inner flex-column-center" >
										<h1>SkyDelve</h1>
										<h2>Powered by</h2>
										<a href="https://www.nasa.gov" title="Go to NASA"><img src={nasaLogo}></img></a>
									</div>
								</div>
								<div className="row no-gutters spacer-small"></div>
								<div className="button-box flex-center" >
								<NavLink to="/start">
									<button type="button" className="button">
										Click to begin
									</button>
								
								</NavLink>
								</div>
								
								</div>	
							</div>
						</React.Fragment>
					</CSSTransition>
				</div>

		)
	}

}

export default withRouter(connect(mapStateToProps)(HomePage))