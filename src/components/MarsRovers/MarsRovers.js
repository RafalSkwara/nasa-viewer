import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//actions
import { MarsSetSolMax, MarsGetPhotoData } from '../../actions/MarsActions';
//components
import Calendar from 'rc-calendar';
import Header from "../Header/Header";
import Rover from "../Rover/Rover";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_rotate_right, ic_rotate_left } from 'react-icons-kit/md/'
//styles
import '../../view_styles/rc-calendar.sass';
import "./MarsRovers.sass";

import data from '../../assets/internalData.json'

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	rover: state.MarsReducer.rover
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setSolMax: MarsSetSolMax,
		getPhotoData: MarsGetPhotoData
	}, dispatch);
}

class MarsRovers extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			photoData: []
		}

	}
	componentWillUnmount() {
		this.getManifest()
	}


	getManifest() {
		let url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${this.props.rover}/?api_key=${this.props.apiKey}`
		console.log(url);
		let allDates= []
		axios.get(url)
			.then(res => {
				if (res.status === 200) {
					let data = res.data.photo_manifest
					this.props.setSolMax(data.max_sol)
					this.props.getPhotoData(data.photos)					
				}

			})
			.catch((err) => console.log(err)
			)
	}

	render() {
		const imgSrc = require('../../assets/img/bg2.jpg');
		return(
			<div className="container-fluid p-0 mars" style={{
				// below: "/skydelve/"" has to be changed to "/" if moved outside github pages
				backgroundImage: `url(/skydelve/${imgSrc})`, 
				height: "100vh",
				width: "100vw"
			}}>
				<Header goBack={true} to={"/start"}/>
				<div className="row no-gutters">
					<div className="col-12">
						<h1 className="main-heading">Mars Rovers Photos</h1>
					</div>
					<div className="col col-12">
						<p>This page alows you to browse through image data gathered by NASA's Curiosity, Opportunity, 
							and Spirit rovers on Mars. They are organised by the sol (Martian rotation day) and come from all the cameras that 
							each rover is equipped with, each with different function and angle.
						</p>
					</div>
				</div>
				<div className="row no-gutters spacer-small"></div>
				<div className="row no-gutters">
					<div className="mars__cards">
						{data.rovers.map((rover => {
							let num = data.rovers.indexOf(rover);
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
									<Rover key={num} num={num} rover={rover}/>
								</CSSTransition>
							)
						}))}
					</div>
				</div>
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(MarsRovers)