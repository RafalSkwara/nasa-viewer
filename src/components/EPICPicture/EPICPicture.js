import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//actions
import { EPICVariantPlus, EPICVariantMinus, EPICSetVariant, changeEPICNatural, EPICClearImage, EPICSetImage } from '../../actions/EPICActions';
//components
import Calendar from 'rc-calendar';
import Header from "../Header/Header";
import Toggle from "../Toggle/Toggle";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_rotate_right, ic_rotate_left } from 'react-icons-kit/md/'
//styles
import "./EPICPicture.sass";

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
		changeNatural: changeEPICNatural,
		setImage: EPICSetImage,
	}, dispatch);
}

class EPIC extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			request_base: 'https://api.nasa.gov/EPIC/api/',
			picture: '',
			imgLength: 2,
			opacity: 0,
			loading: true,
			height: 0,
			width: 0,

		}
		this.handleSearch = this.handleSearch.bind(this)
		this.rotateLeftHandler = this.rotateLeftHandler.bind(this)
		this.rotateRightHandler = this.rotateRightHandler.bind(this)
	}
	componentDidMount() {
		this.props.clearImage();
		if (this.props.imgUrl) {
			this.setState({ loading: true })
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
			this.props.setVariant(this.state.imgLength - 1)
		}
	}

	rotateLeftHandler() { //left or right
		this.props.variantMinus();
		this.props.clearImage();
		this.setState({loading: true});
		this.handleSearch();
	}
	rotateRightHandler() { //left or right
		this.props.variantPlus();
		this.props.clearImage();
		this.setState({ loading: true });
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

	render() {
		const imgSrc = require('../../assets/img/bg2.jpg');
		const styles = {
			opacity: this.state.opacity,
			transition: 'all .3s ease-in',
			height: this.state.height,
			width: this.state.width
		}
		return(
			<section className="hero fullscreen-bg epic" style={{ backgroundImage: `url(${imgSrc})` }}>
				<Header goBack={true} to={"/epic-earth"}/>
				<div className="hero__content flex-column-center">
					<h1>EPIC</h1>
					<div className="buttons">
						<button className="rotate flex-center" onClick={this.rotateLeftHandler} >
							<Icon icon={ic_rotate_left} size={24}/>
						</button>
						<button className="rotate flex-center" onClick={this.rotateRightHandler}> 
							<Icon icon={ic_rotate_right} size={24}/>							
						</button>
					</div>	
					<div className="image-wrapper">
						{this.state.loading && <div className="loading-spinner"></div>}

							<CSSTransition
								in={this.props.imgUrl}
								appear={true}
								exit={true}
								classNames="deshrink"
								key={this.props.imgUrl}
								timeout={300}
							>
							<img src={this.props.imgUrl}
								style={styles}
								onLoad={() => this.setState({ opacity: 1, loading: false, height: '100%', width: 'auto' })}
								onClick={this.toggleBigImage}
							/>
							</CSSTransition>
					</div>
				

				</div>

			</section>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(EPIC)