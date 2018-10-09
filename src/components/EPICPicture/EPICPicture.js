import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ReactSwipeEvents from 'react-swipe-events'
//actions
import { EPICVariantPlus, EPICVariantMinus, EPICSetVariant, EPICClearImage, EPICSetImage, EPICSetLength } from '../../actions/EPICActions';
//components
import Header from "../Header/Header";

//Icons
import { Icon } from 'react-icons-kit'
import { ic_rotate_right, ic_rotate_left } from 'react-icons-kit/md/'
//styles
import "./EPICPicture.sass";
//images
import bgImage from '../../assets/img/bg2.jpg'

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	natural: state.EPICReducer.natural,
	variant: state.EPICReducer.variant,
	imgUrl: state.EPICReducer.imgUrl,
	imgLength: state.EPICReducer.imgLength,
	day: state.EPICReducer.day,
	month: state.EPICReducer.month,
	year: state.EPICReducer.year
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		variantMinus: EPICVariantMinus,
		variantPlus: EPICVariantPlus,
		setVariant: EPICSetVariant,
		clearImage: EPICClearImage,
		setImage: EPICSetImage,
		setLength: EPICSetLength
	}, dispatch);
}

class EPICPicture extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			request_base: 'https://api.nasa.gov/EPIC/api/',
			opacity: 0,
			loading: true,
			height: 0,
			width: 0,

		}
		this.handleSearch = this.handleSearch.bind(this);
		this.rotateLeftHandler = this.rotateLeftHandler.bind(this);
		this.rotateRightHandler = this.rotateRightHandler.bind(this);
		this.loadHandler = this.loadHandler.bind(this);
		this.keypressHandler = this.keypressHandler.bind(this);
	}
	componentDidMount() {
		this.props.clearImage();
		this.props.setVariant(0);
		if (this.props.imgUrl) {
			this.setState({ loading: true })
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
			this.rotateLeftHandler();
		} else if (e.keyCode === 39) {
			this.rotateRightHandler();
		}

	}

	buildUrl() {
		let url = this.state.request_base;
		url = this.props.natural ? url + `natural` : url + 'enhanced';
		url = this.props.year ? url + `/date/${this.props.year}-${this.props.month}-${this.props.day}` : url;

		return url + '?api_key=' + this.props.apiKey;
	}

	
	variantPlus() {
		// add to variant number until max number reached, then start from 0
		if (this.props.imgLength !== undefined && this.props.variant < this.props.imgLength-1) {
			this.props.variantPlus();
		} else {
			this.props.setVariant(0)
		}
	}
	variantMinus() {
		// subtract from variant num until 0 reached, then loop over from end
		if (this.props.imgLength !== undefined && this.props.variant > 0) {
			this.props.variantMinus();
		} else {
			this.props.setVariant(this.props.imgLength - 1)
		}
	}

	rotateLeftHandler() { //left or right
		this.variantMinus();
		this.props.clearImage();
		this.setState({
			opacity: 0,
			loading: true,
			height: 0,
			width: 0});
		this.handleSearch();
	}
	rotateRightHandler() { //left or right
		this.variantPlus();
		this.props.clearImage();
		this.setState({
			opacity: 0,
			loading: true,
			height: 0,
			width: 0 });
		this.handleSearch();
	}

	handleSearch() {
		let url = this.buildUrl();
		
		axios.get(url)
			.then(res => {
				let variant = this.props.variant
				this.props.setImage(
					`https://epic.gsfc.nasa.gov/archive/${this.props.natural ? "natural" : "enhanced"}/${this.props.year}/${this.props.month}/${this.props.day}/jpg/` + res.data[this.props.variant].image + '.jpg')
				this.props.setLength(res.data.length)
			})
	}

	loadHandler() {
		console.log('Img loaded')
		this.setState({ opacity: 1, loading: false, height: '100%', width: 'auto' })
	}

	render() {
		const imgSrc = require('../../assets/img/bg2.jpg');
		const styles = {
			opacity: this.state.opacity,
			transition: 'all .3s ease-in',
			height: this.state.height,
			width: this.state.width
		}
		return(
			<div className="container-fluid p-0 poad poad-picture" style={{
				backgroundImage: `url(${bgImage})`,
				height: "100vh",
				width: "100vw"
			}}>
				<Header goBack={true} to={"/epic-earth"}/>
				<div className="row no-gutters">
					<div className="col-12">
						<h1 className="main-heading">EPIC</h1>
					</div>
				</div>
				<div className="row no-gutters">
					<div className="col-12 justify-content-center">
						<div className="buttons">
							<button className="rotate flex-center" onClick={this.rotateLeftHandler} >
								<Icon icon={ic_rotate_left} size={24}/>
							</button>
							<button className="rotate flex-center" onClick={this.rotateRightHandler}> 
								<Icon icon={ic_rotate_right} size={24}/>							
							</button>
						</div>	
					</div>
				</div>
				<ReactSwipeEvents onSwipedLeft={this.rotateLeftHandler} onSwipedRight={this.rotateRightHandler}>
				<div className="row no-gutters">
					<div className="col-12 justify-content-center">
							<div className="image-wrapper justify-content-center">
							{this.props.imgLength > 0 ? 
								<React.Fragment>
								{this.state.loading && <div className="spinner-wrapper"><div className="loading-spinner"></div></div>}

									<CSSTransition
										in={!this.state.loading}
										classNames="deshrink"
										key={this.props.imgUrl}
										timeout={300}
									>
									<img src={this.props.imgUrl}
									style={styles}
										onLoad={this.loadHandler}
										onClick={this.toggleBigImage}
									/>
									</CSSTransition>
								</React.Fragment>
						:	<p>Sorry, no pictures available for this date in {this.props.natural?"natural" : "enhanced"} mode.</p>
						}
						</div>
					</div>
				</div>
				</ReactSwipeEvents>

				

			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(EPICPicture)