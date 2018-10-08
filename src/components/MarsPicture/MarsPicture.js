import * as React from "react";
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'
import Header from "../Header/Header";
import "./MarsPicture.sass";
//images
import bgImage from '../../assets/img/bg_pattern.png'
const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	pictures: state.MarsReducer.pictures,
	camera: state.MarsReducer.camera,
	rover: state.MarsReducer.rover,
	solDate: state.MarsReducer.solDate

});

class MarsPicture extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			opacity: 0,
			loading: true,
			height: 0,
			width: 0,
			picIndex: 0
		};
		this.picDec = this.picDec.bind(this)
		this.picInc = this.picInc.bind(this)
	}

	componentDidMount() {
		if (this.props.imgUrl) {
			this.setState({ loading: true})
		}

	}

	componentDidUpdate() {
		if (this.state.big) {
			window.scrollTo({
				"behavior": "smooth",
				"left": 0,
				"top": 0
			});

		}
	}

	picInc() {
		console.log(this.state.picIndex, this.props.pictures.length);
		
		if (this.state.picIndex < this.props.pictures.length-1) {
			this.setState({
				picIndex: this.state.picIndex + 1
			})
		} else {
			this.setState({
				picIndex: 0
			})
		}
	}
	picDec() {
		if (this.state.picIndex > 1 ) {
			this.setState({
				picIndex: this.state.picIndex - 1
			})
		} else {
			this.setState({
				picIndex: this.props.pictures.length - 1
			})
		}
	}

	render() {
		const theKey = this.props.picture || this.props.imgUrl;
		let width = screen.width;
		const styles = {
			opacity: this.state.opacity,
			transition: 'all .3s ease-in',
			height: this.state.height,
			width: this.state.width
		}
		const imgSrc = require('../../assets/img/bg_pattern.png');
		return (
			<div className="container-fluid p-0 poad poad-picture" style={{
				backgroundImage: `url(${bgImage})`,
				height: "100vh",
				width: "100vw"
			}}>
				<Header goBack to={"/mars-photos/search"} />
				<div className="row no-gutters">
					<div className="col-12">
						<h1 className="main-heading">Mars Rovers Photos</h1>
					</div>
				</div>
				<div className="row no-gutters">
					<div className="col-4 flex-center">
						<p>Rover:&nbsp;</p>
						<p> {this.props.rover}</p>
					</div>

					<div className="col-4 flex-center">
						<p>Camera:&nbsp;</p>
						<p> {this.props.camera}</p>
					</div>

					<div className="col-4 flex-center">
						<p>Sol:&nbsp;</p>
						<p> {this.props.solDate}</p>
					</div>
				</div>
				<div className="row no-gutters">
					<div className="col-4 flex-center">
						
						<button className="btn button" onClick={this.picDec}>Previous</button>
					</div>

					<div className="col-4 flex-center">
						<p>Picture:&nbsp;</p>
						<p> {this.state.picIndex+1}/{this.props.pictures.length}</p>
					</div>

					<div className="col-4 flex-center">
						<button className="btn button" 
							onClick={this.picInc}
							>Next</button>
					</div>
				</div>

				<div className="row no-gutters">
					<div className="col-12 justify-content-center">
						<div className="image-wrapper justify-content-center">
							{this.state.loading && <div className="spinner-wrapper"><div className="loading-spinner"></div></div>}
							{this.props.pictures ?
									<img src={this.props.pictures[this.state.picIndex]}
										style={styles}
										onLoad={() => this.setState({ opacity: 1, loading: false, height: '100%', width: 'auto' })}
										onClick={this.toggleBigImage}
									/>
								: null
							}

						</div>
					</div>
				</div>
			</div>
		)

	}

}

export default withRouter(connect(mapStateToProps)(MarsPicture))