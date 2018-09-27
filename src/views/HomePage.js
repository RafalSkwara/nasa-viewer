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

	componentDidMount() {
		let self = this;
		// - - commented out to stop from hitting the API unnecessary - - //
		// axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2018-09-07&end_date=2018-09-08&api_key=LqGe0BDDEOUijMSxA6encVpjHH9ETdmVNMb2tfuX`)
		// 	.then(function (response) {
		// 		// handle success
		// 		console.log("Trial call received successfully")
		// 		self.setState({
		// 			visible: true
		// 		})
		// 	})
		// 	.catch(function (error) {
		// 		// handle error
		// 		console.log(error);
		// 	});
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
			<section className="hero fullscreen-bg" 
				style={{
					backgroundImage: `url(${bg})`
				}}>
				<div className="hero__content flex-column-center">
					<CSSTransition
						// in={this.state.visible}
						in={true}
						appear={true}
						exit={true}
						timeout={1000}
						classNames="fade"
						unmountOnExit>
						<React.Fragment>
							<div className="title-box flex-column-center" >
								<div className="title-box--inner flex-column-center" >
									<h1>SkyDelve</h1>
									<h2>Powered by</h2>
									<a href="https://www.nasa.gov" title="Go to NASA"><img src={nasaLogo}></img></a>
								</div>
							</div>
							<div className="button-box flex-center" >
							<NavLink to="/start">
								<button>
									Click to begin
								</button>
							</NavLink>
							</div>
						</React.Fragment>
					</CSSTransition>
				</div>

			</section>
		)
	}

}

export default withRouter(connect(mapStateToProps)(HomePage))