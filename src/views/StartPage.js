import * as React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import internalData  from '../assets/internalData.json'
import Header from '../components/Header/Header'
import Card from '../components/Card/Card'
import "../view_styles/StartPage.sass";


const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey
});


class StartPage extends React.Component {
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
	}
	componentWillMount() {
		window.scrollTo({
			"behavior": "smooth",
			"left": 0,
			"top": 0
		});

	}

	componentDidMount() {
		// let self = this;
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

	render() {
		const data = internalData;
		const imgSrc = require('../assets/img/bg2.jpg')
		return (

				<section className="hero fullscreen-bg" style={{backgroundImage: `url(${imgSrc})`}}>
					<Header />
					<div className="hero__content"  >
						<div className="cards">

							{data.services.map((service => {
								let num = data.services.indexOf(service);
								let link = data["service-urls"][num];
								return (
								<CSSTransition
									// in={this.state.visible}
									key={num}
									in={true}
									appear={true}
									exit={true}
									timeout={600}
									classNames="deshrink"
									unmountOnExit>
									<Card key={num} num={num} service={service} link={link}/> 
								</CSSTransition>
							)
							}))}
						</div>
					</div>

				</section>

		)
	}

}

export default withRouter(connect(mapStateToProps)(StartPage))