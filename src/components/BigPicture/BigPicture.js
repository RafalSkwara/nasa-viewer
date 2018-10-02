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
import "./BigPicture.sass";


class BigPicture extends React.Component {
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
			loading: true
		}
		this.toggleBigImage = this.toggleBigImage.bind(this)
	}

	componentDidMount() {
		let arr = this.props.url.split("/")
		this.setState({
			picture: arr[arr.length - 1]
		})

		if (this.props.url) {
			this.setState({ loading: true })
		}
	}

	toggleBigImage() {
		this.setState({
			big: !this.state.big
		})
	}

	render() {
		const styles = {
			opacity: this.state.opacity,
			transition: 'all .3s ease-in',
			height: this.state.height,
			width: this.state.width
		}
		return (

			<div 
				className="big-picture"
				key={this.state.picture}
				>
				{this.state.loading && <div className="loading-spinner"></div>}
				<img src={this.props.url}
					style={styles}
					onLoad={() => this.setState({ opacity: 1, loading: false, height: '100%', width: 'auto' })}
					onMouseOver={() => this.setState({ hover: true })}
					onMouseOut={() => this.setState({ hover: false })}
				/>
			</div>
		)

	}

}

export default BigPicture