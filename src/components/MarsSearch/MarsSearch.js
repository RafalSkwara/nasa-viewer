import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//actions
import { MarsSetCamera, MarsSetSolDate, MarsGetPictures } from '../../actions/MarsActions';
//components
import Calendar from 'rc-calendar';
import Header from "../Header/Header";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_rotate_right, ic_rotate_left } from 'react-icons-kit/md/'
//styles
import bgImage from '../../assets/img/bg2.jpg'
import '../../view_styles/rc-calendar.sass';
import "./MarsSearch.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	rover: state.MarsReducer.rover,
	solMax: state.MarsReducer.solMax,
	camera: state.MarsReducer.camera,
	solDate: state.MarsReducer.solDate
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setCamera: MarsSetCamera,
		setSol: MarsSetSolDate,
		getPictures: MarsGetPictures
	}, dispatch);
}

class MarsSearch extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			request_base: 'https://api.nasa.gov/mars-photos/api/v1/rovers/',
			cameraChosen: false,
			cameraName:"",
			dateTypeChosen: false,
			solInput: 1

		}
		this.handleSearch = this.handleSearch.bind(this)
		this.camClickHandler = this.camClickHandler.bind(this)
		this.resetCamHandler = this.resetCamHandler.bind(this)
		this.solInputChange = this.solInputChange.bind(this)
		this.solInc = this.solInc.bind(this)
		this.solDec = this.solDec.bind(this)
	}

	buildUrl() {
		let url = this.state.request_base;
		url = `${url}${this.props.rover}/photos/?sol=${this.props.solDate}&camera=${this.props.camera}`;
		return url + '&api_key=' + this.props.apiKey;
	}

	resetCamHandler() {
		this.setState({cameraChosen: false, cameraName: ''})
	}

	chooseDateType(e) {
		let event = e;
		let dateType = event.target.dataset.dateType
		this.setState({dateType: dateType, dateTypeChosen: true})
	}

	camClickHandler(e) {
		const event = e;
		const camera = event.target.dataset.cam;
		const camName = event.target.innerHTML;
		this.props.setCamera(camera);
		this.setState({cameraChosen: true, cameraName: camName})
	}

	solInputChange(e) {
		let event = e, val = Number(event.target.value);
		this.setState({solInput: val})
		this.props.setSol(val)
	}

	solInc() {
		if (this.state.solInput < this.props.solMax) {
			const newSol = Number(this.state.solInput)+1;
			this.setState({ solInput: newSol });
			this.props.setSol(newSol);
		}
	}
	solDec() {
		if (this.state.solInput > 1) {
			const newSol = this.state.solInput-1;
			this.setState({ solInput: newSol });
			this.props.setSol(newSol);
		}
	}


	handleSearch() {
		let url = this.buildUrl(),
			picturesArr = [];
		console.log(url);
		
		axios.get(url)
			.then(res => {
				if (res.status === 200) {
					res.data.photos.forEach(el => picturesArr.push(el.img_src));
					this.props.getPictures(picturesArr)
				}
			})
			.catch((err) => console.log(err)
			)
	}

	render() {
		let caption = this.props.rover.split('');
		caption[0] = caption[0].toUpperCase()
		caption = caption.join('');
		let show = this.state.cameraChosen ? "off" : "on";
		return(
			<div className="container-fluid p-0 mars mars-search" style={{
				backgroundImage: `url(${bgImage})`,
				height: "100vh",
				width: "100vw"
			}}>
				<Header goBack={true} to={"/mars-photos"}/>
				<div className="row no-gutters">
					<div className="col-12">
						<h1 className="main-heading">Mars Rovers Photos</h1>
						<h2 className="selected">Selected rover: <span>{caption}</span></h2>
					</div>
				</div>
				<div className="row no-gutters">
					<div className="col col-12 justify-content-center">

						<h2>{this.state.cameraChosen ? "Choose the date" : "Choose between cameras available"}</h2>
					
					</div>
				</div>
				<div className="row no-gutters">
					<div className="col col-12 align-items-center">
						<CSSTransition
							in={true}
							key={this.props.camera}
							classNames="fade"
							appear={true}
							exit={true}
							timeout={500}
						>
						<button onClick={this.resetCamHandler} data-cam="" className="btn button">{this.state.cameraName}</button>
						</CSSTransition>
					</div>

					
					{
						this.state.cameraChosen ? <React.Fragment>
							<div className="col col-sm-12 d-f align-items-center">
								<p>Date in sol. Max sol: {this.props.solMax}</p>
							</div>
							<div className="col col-sm-12 align-items-center">
								<CSSTransition
									in={true}
									key={this.props.camera}
									classNames="fade"
									appear={true}
									exit={true}
									timeout={500}
								>
								<div className="search-input__wrapper">
									<button onClick={this.solInc}>+</button>
									<input 
										className="search-input" 
										type="number" 
										max={this.props.solMax} 
										min={0}
										value={this.state.solInput}
										onChange={this.solInputChange}/>
										<button onClick={this.solDec}>-</button>
								</div>
								</CSSTransition>
							</div>
							
							<div className="col col-md-1"></div>
						</React.Fragment> : 
						<CSSTransition
									in={true}
									key={show}
									classNames="fade"
									appear={true}
									exit={true}
									timeout={500}
								>
						<React.Fragment>
							<div className="col col-md-1"></div>
							<div className="col col-md-5 col-sm-12 align-items-center">
								<button onClick={this.camClickHandler} data-cam="FHAZ" className="btn button">Front (FHAZ)</button>
								<button onClick={this.camClickHandler} data-cam="NAVCAM" className="btn button">Navigation Camera (NAVCAM)</button>
								{this.props.rover === 'curiosity' && <button onClick={this.camClickHandler} data-cam="MAST" className="btn button">Mast Camera (MAST)</button>}
								{this.props.rover === 'curiosity' && <button onClick={this.camClickHandler} data-cam="MARDI" className="btn button">Mars Descent Imager (MARDI)</button>}
								{this.props.rover !== 'curiosity' && <button onClick={this.camClickHandler} data-cam="PANCAM" className="btn button">Panoramic Camera (PANCAM)</button>}
							</div>
							<div className="col col-md-5 col-sm-12 align-items-center">
								<button onClick={this.camClickHandler} data-cam="RHAZ" className="btn button">Rear (RHAZ)</button>
								{this.props.rover !== 'curiosity' && <button onClick={this.camClickHandler} data-cam="MINI-TES" className="btn button">Thermal Spectrometer (Mini-TES)</button>}
								{this.props.rover === 'curiosity' && <button onClick={this.camClickHandler} data-cam="CHEMCAM" className="btn button">Chemistry Cam (CHEMCAM)</button>}
								{this.props.rover === 'curiosity' && <button onClick={this.camClickHandler} data-cam="MAHLI" className="btn button">Mars Hand Lens Imager (MAHLI)</button>}
							</div>
							<div className="col col-md-1"></div>
						</React.Fragment>
						</CSSTransition>
					}
					
				</div>
				<div className="row no-gutters spacer-small"></div>
				<div className="row no-gutters">
					<div className="col col-12 justify-content-center">
						<NavLink to={`/mars-photos/picture`} onClick={this.handleSearch} 
							className="btn search-button">
							Search
						</NavLink>
					</div>
				</div>
				
			</div>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarsSearch))