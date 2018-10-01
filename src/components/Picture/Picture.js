import * as React from "react";
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
import BigPicture from "../BigPicture/BigPicture";
import "./Picture.sass";


class Picture extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			transition: 5 * 100 + 'ms',
			opacity: 0,
			loading: false,
			height: 0,
			width: 0,
			error: '',
			big: false
		}
		this.toggleBigImage = this.toggleBigImage.bind(this)
		this.closeBigImage = this.closeBigImage.bind(this);
	}

	componentDidMount() {
		let arr = this.props.url.split("/")
		this.setState({
			picture: arr[arr.length-1]
		})

		if(this.props.url) {
			this.setState({loading: true})
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

	render() {
		const styles= { 
			opacity: this.state.opacity,
			transition: 'all .3s ease-in',
			height: this.state.height,
			width: this.state.width
		}
		return (
			<CSSTransition
				// in={this.state.visible}
				key={this.state.picture}
				in={true}
				appear={true}
				exit={true}
				timeout={600}
				classNames="deshrink"
				unmountOnExit>
				<React.Fragment>
				<div className="image-wrapper">
				{this.state.loading && <div className="loading-spinner"></div>}
				{ this.props.url ? 
					this.props.mediaType === 'video' ?
							<iframe id="ytplayer" type="text/html" width={this.state.width} height={this.state.height}
							src={this.props.url}
							frameborder="0" 
							onLoad={() => this.setState({ opacity: 1, loading: false, height: '100%', width: '100%' })}/>
							:
					
						<img src={this.props.url} 
							style={styles}
							onLoad={() => this.setState({ opacity: 1, loading: false, height: '100%', width: 'auto' })}
							onClick={this.toggleBigImage}	
						/> 
					
					: 
					<p>Choose a date and click the 'Search' button to see an image here.</p>
				}
				</div>
		
				<CSSTransition
					// in={this.state.visible}
					key={this.state.picture}
					in={this.state.big}
					appear={true}
					exit={true}
					timeout={300}
					classNames="photo-show"
					unmountOnExit
					>
						<BigPicture onClick={this.toggleBigImage} url={this.props.url}/>

					</CSSTransition>
				
				
				
				</React.Fragment>
			</CSSTransition>
		)

	}

}

export default Picture