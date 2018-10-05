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
import PoadDetails from '../PoadDetails/PoadDetails';
import "./PoadPicture.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	imgUrl: state.APOADReducer.imgUrl,
	imgHDUrl: state.APOADReducer.imgHDUrl,
	mediaType: state.APOADReducer.mediaType,
	details: state.APOADReducer.details
});

class PoadPicture extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			opacity: 0,
			loading: true,
			height: 0,
			width: 0,
			big: false,
			showDetails: false
		}
		this.toggleShowDetails = this.toggleShowDetails.bind(this)
		this.toggleBigImage = this.toggleBigImage.bind(this)
		this.closeBigImage = this.closeBigImage.bind(this);
	}

	componentDidMount() {


		if(this.props.imgUrl) {
			this.setState({loading: true, showDetails: false})
		}

		document.body.addEventListener('keypress', this.closeBigImage)
		document.body.addEventListener('click', this.closeBigImage)

	}

	componentWillUnmount() {
		document.body.removeEventListener('keypress', this.closeBigImage)
		document.body.removeEventListener('click', this.closeBigImage)
	}

	componentDidUpdate(){
		if (this.state.big) {
			window.scrollTo({
				"behavior": "smooth",
				"left": 0,
				"top": 0
			});

		}
	}
	

	closeBigImage(e) {
		let event = e;
		event.keyCode === 27 ? this.setState ({big: false}) : null
		if(event.type ==="click" && this.state.big) {
			this.setState({ big: false })
		}

	}

	toggleBigImage() {
		this.setState({
			big: !this.state.big
		})
	}
	toggleShowDetails() {
		this.setState({
			showDetails: !this.state.showDetails
		})
	}

	render() {
		const theKey = this.props.picture || this.props.imgUrl;
		let width = screen.width;
		const styles= { 
			opacity: this.state.opacity,
			transition: 'all .3s ease-in',
			height: this.state.height,
			width: this.state.width
		}
		const imgSrc = require('../../assets/img/bg_pattern.png');
		return (
			<div className="container-fluid p-0 poad poad-picture" style={{
				backgroundImage: `url(${imgSrc})`,
				height: "100vh",
				width: "100vw"
			}}>
				<Header goBack to={"/picture-of-the-day"} />
				<div className="row no-gutters">
					<div className="col-12">
						<h1 className="main-heading">A Picture of the Day</h1>
					</div>
				</div>
				<div className="row no-gutters">
					<div className="col-12 justify-content-center">
						<CSSTransition 
							in={this.state.showDetails}
							classNames="deshrink"
							unmountOnExit={true}
							timeout={300}
							>
							<PoadDetails clickHandler={this.toggleShowDetails}/>
						</CSSTransition>
					</div>
				</div>
				<div className="row no-gutters">
					<div className="col-12 justify-content-center">
						<div className="image-wrapper justify-content-center">
						{this.state.loading && <div className="spinner-wrapper"><div className="loading-spinner"></div></div>}
						{ this.props.imgUrl ? 
							this.props.mediaType === 'video' ?
									<iframe id="ytplayer" type="text/html" width={this.state.width} height={width/2}
									src={this.props.imgUrl}
									frameBorder="0" 
									onLoad={() => this.setState({ opacity: 1, loading: false, height: '100%', width: '100%' })}/>
									:
						
								<img src={this.props.imgUrl} 
									style={styles}
									onLoad={() => this.setState({ opacity: 1, loading: false, height: '100%', width: 'auto' })}
									onClick={this.toggleBigImage}	
								/>
						
							
							: 
							null
						}
						
						</div>
					</div>
				</div>
				<div className="row no-gutters">
						<div className="col-12 justify-content-center">
							<div className="poad__info">
								{(this.props.details && !this.state.loading) && <button className="button details" onClick={this.toggleShowDetails} >Details</button>}
							</div>
						</div>
				</div>
		</div>
		)

	}

}

export default withRouter(connect(mapStateToProps)( PoadPicture ) )