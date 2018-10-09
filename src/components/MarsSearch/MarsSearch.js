import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { NavLink, withRouter} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//actions
import { MarsSetCamera, MarsSetSolDate, MarsGetPictures, MarsSetValidDates } from '../../actions/MarsActions';
//components
import Header from "../Header/Header";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_close } from 'react-icons-kit/md/'
//styles
import bgImage from '../../assets/img/bg2.jpg'
import "./MarsSearch.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	rover: state.MarsReducer.rover,
	solMax: state.MarsReducer.solMax,
	camera: state.MarsReducer.camera,
	photoData: state.MarsReducer.photoData,
	solDate: state.MarsReducer.solDate,
	validDates: state.MarsReducer.validDates
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setCamera: MarsSetCamera,
		setSol: MarsSetSolDate,
		getPictures: MarsGetPictures,
		setValidDates: MarsSetValidDates
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
			solInput: 1,
			validDates: []

		}
		this.handleSearch = this.handleSearch.bind(this)
		this.onEnter = this.onEnter.bind(this)
		this.camClickHandler = this.camClickHandler.bind(this)
		this.resetCamHandler = this.resetCamHandler.bind(this)
		this.solInputChange = this.solInputChange.bind(this)
		this.solIncrement = this.solIncrement.bind(this)
		this.solDecrement = this.solDecrement.bind(this)
	}

	componentDidMount () {
	//reset sol date on mount
	  this.props.setSol(1)
		let allDates = []
		this.props.photoData.forEach(element => {
			allDates.push(element.sol);
		});
		console.log(allDates);
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
		let validDatesArr = [];
		this.props.setCamera(camera);
		this.setState({cameraChosen: true, cameraName: camName})
		this.props.photoData.forEach(el => {
			if(el.cameras.includes(camera)) {
				validDatesArr.push(el.sol)
			}
		});
		this.props.setValidDates(validDatesArr);
		
	}

	solInputChange(e) {
		//change solDate in store on input change
		let event = e, val = Number(event.target.value);
		this.setState({solInput: val})
		this.props.setSol(val)
	}

	solIncrement(e) {
		// increment sol date on click, by 1 or by 10
		const event = e, target = event.target;
		if(target.dataset.ten==="yes"){
			//increment by 10 if the button has data-ten set to yes
			if (this.state.solInput < this.props.solMax-10) {
				const newSol = Number(this.state.solInput) + 10;
				this.setState({ solInput: newSol });
				this.props.setSol(newSol);
			}
		} else {
			if (this.state.solInput < this.props.solMax) {
				const newSol = Number(this.state.solInput)+1;
				this.setState({ solInput: newSol });
				this.props.setSol(newSol);
			}
		}
		console.log(this.state.solInput + 1, this.props.validDates.includes(this.state.solInput));
		
	}
	solDecrement(e) {
		// same as above but decrement
		const event = e, target = event.target;
		if(target.dataset.ten==="yes"){
			if (this.state.solInput > 11) {
				const newSol = this.state.solInput-10;
				this.setState({ solInput: newSol });
				this.props.setSol(newSol);
			}
		} else {
			const newSol = this.state.solInput - 1;
			this.setState({ solInput: newSol });
			this.props.setSol(newSol);
		}
	}

	onEnter(e) {
		// dispatch search method and reroute when Enter is pressed
		let event = e;
		if(event.which === 13){
			this.handleSearch();
			this.props.history.push(`/mars-photos/picture`)
		} 	
	}

	handleSearch() {
		let url = this.buildUrl(),
			picturesArr = [];
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
		const imgSrc = require('../../assets/img/bg2.jpg');
		// below returns class "disabled" if no photos from this camera were made on the current sol
		let inputDisabledClass = this.props.validDates.includes(this.props.solDate) ? "" : "disabled"

		return(
			<div className="container-fluid p-0 mars mars-search" style={{
				// below: "/skydelve/"" has to be changed to "/" if moved outside github pages
				backgroundImage: `url(/skydelve/${imgSrc})`, 
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
						<button onClick={this.resetCamHandler} data-cam="" className="btn button selected-camera">
	
							{this.state.cameraName}
	
						</button>
						</CSSTransition>
					</div>

					
					{
						this.state.cameraChosen ? <React.Fragment>
							<div className="col col-sm-12 d-f align-items-center">
								<p className="mars-search__sol-max">Date in sol.<br />Max sol: {this.props.solMax}</p>
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
									<button onClick={this.solDecrement} data-ten="yes">-10</button>
									<button onClick={this.solDecrement}>-</button>
									<input 
											className={`search-input ${inputDisabledClass}` }
										type="number" 
										max={this.props.solMax} 
										min={0}
										value={this.state.solInput}
										onChange={this.solInputChange}
										onKeyPress={this.onEnter}/>
									<button onClick={this.solIncrement}>+</button>
									<button onClick={this.solIncrement} data-ten="yes">+10</button>
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
							</div>
							<div className="col col-md-5 col-sm-12 align-items-center">
								<button onClick={this.camClickHandler} data-cam="RHAZ" className="btn button">Rear (RHAZ)</button>
								{this.props.rover !== 'curiosity' && <button onClick={this.camClickHandler} data-cam="PANCAM" className="btn button">Panoramic Camera (PANCAM)</button>}
								{this.props.rover === 'curiosity' && <button onClick={this.camClickHandler} data-cam="CHEMCAM" className="btn button">Chemistry Cam (CHEMCAM)</button>}
								{this.props.rover === 'curiosity' && <button onClick={this.camClickHandler} data-cam="MAHLI" className="btn button">Mars Hand Lens Imager (MAHLI)</button>}
							</div>
							<div className="col col-md-1"></div>
						</React.Fragment>
						</CSSTransition>
					}
					
				</div>
				{
					this.state.cameraChosen && <React.Fragment>
						<div className="row no-gutters spacer-small"></div>
						<div className="row no-gutters">
							<div className="col col-12 justify-content-center">
								{
									(this.props.validDates.length > 0 && this.props.validDates.includes(this.props.solDate)) ? 
										<NavLink to={`/mars-photos/picture`} onClick={this.handleSearch} 
										className="btn search-button">
										Search
										</NavLink>
									: <p>Sorry! No photos were taken from {this.props.camera} camera on this sol.</p>
								}
							</div>
						</div>
				</React.Fragment>
				}
				
			</div>
		)
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarsSearch))