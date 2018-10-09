import * as React from "react";
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import ReactSwipeEvents from 'react-swipe-events'
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'
import Header from "../Header/Header";
import "./MarsPicture.sass";

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
		this.picDec = this.picDec.bind(this);
		this.picInc = this.picInc.bind(this);
		this.keypressHandler = this.keypressHandler.bind(this);
	}

	componentDidMount() {
		if (this.props.imgUrl) {
			this.setState({ loading: true})
		}
		document.addEventListener('keypress', this.keypressHandler)
	}
	componentWillUnmount() {
		document.removeEventListener('keypress', this.keypressHandler)
	}
	

	keypressHandler(e) {
		// change pictures on arrow press
		const event = e;
		if (e.keyCode === 37) {
			this.picDec();
		} else if (e.keyCode === 39) {
			this.picInc();
		}
			
	}

	picInc() {		
		if (this.state.picIndex < this.props.pictures.length-1) {
			this.setState({
				picIndex: this.state.picIndex + 1,
				loading: true,
				opacity: 0,
				loading: true,
				height: 0,
				width: 0,
			})
		} else {
			this.setState({
				picIndex: 0
			})
		}
	}
	picDec() {
		if (this.state.picIndex > 0 ) {
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
			<div className="container-fluid p-0 mars mars-picture" style={{
				// below: "/skydelve/"" has to be changed to "/" if moved outside github pages
				backgroundImage: `url(/skydelve/${imgSrc})`, 
				height: "100vh",
				width: "100vw"
			}}>
				<Header goBack to={"/mars-photos/search"} />
				<div className="row no-gutters">
					<div className="col-12">
						<h1 className="main-heading">Mars Rovers Photos</h1>
					</div>
				</div>
				<div className="row no-gutters mars__info">
					<div className="col-4 flex-center">
						<p>Rover:</p>
						<p> {this.props.rover}</p>
					</div>

					<div className="col-4 flex-center">
						<p>Camera:</p>
						<p> {this.props.camera}</p>
					</div>

					<div className="col-4 flex-center">
						<p>Sol:</p>
						<p> {this.props.solDate}</p>
					</div>
				</div>
				<div className="row no-gutters">
					<div className="col-4 col-md-3 flex-center">
						
						<button className="mars__button" onClick={this.picDec}>Previous</button>
					</div>

					<div className="col-4 col-md-6 flex-center">
						<p>Picture:&nbsp;</p>
						<p> {this.props.pictures.length>0 ?
								`${this.state.picIndex+1} of ${this.props.pictures.length}`
								: '0 of 0'
							}</p>
					</div>

					<div className="col-4 col-md-3 flex-center">
						<button className="mars__button" 
							onClick={this.picInc}
							>Next</button>
					</div>
				</div>
				<ReactSwipeEvents onSwipedLeft={this.picInc} onSwipedRight={this.picDec}>
				<div className="row no-gutters">
					<div className="col-12 justify-content-center">
						<div className="image-wrapper justify-content-center">

									{this.state.loading && <div className="spinner-wrapper"><div className="loading-spinner"></div></div>}
									<img src={this.props.pictures[this.state.picIndex]}
										style={styles}
										onLoad={() => this.setState({ opacity: 1, loading: false, height: '100%', width: 'auto' })}
										onClick={this.toggleBigImage}
									/>
						</div>
					</div>
				</div>
				</ReactSwipeEvents>
			</div>
		)

	}

}

export default withRouter(connect(mapStateToProps)(MarsPicture))