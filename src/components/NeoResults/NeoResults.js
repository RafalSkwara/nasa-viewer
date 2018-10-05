import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//actions

import { NeoClearNeo } from '../../actions/NeoActions';
//components
import Header from "../Header/Header";
import NeoTable from "../NeoTable/NeoTable";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_rotate_right, ic_rotate_left } from 'react-icons-kit/md/'
//styles
import '../../view_styles/rc-calendar.sass';
import "./NeoResults.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	endDate: state.NeoReducer.endDate,
	startDate: state.NeoReducer.startDate,
	dates: state.NeoReducer.dates,
	asteroids: state.NeoReducer.asteroids
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		clearNeo: NeoClearNeo
	}, dispatch);
}

class NeoResults extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		}
	}

	componentDidMount() {
		this.props.clearNeo();
	}

	
	render() {
		const imgSrc = require('../../assets/img/bg_pattern.png');
		return(
			<div className="container-fluid p-0 neo neo-results" style={{
				backgroundImage: `url(${imgSrc})`,
				width: "100vw",
				mimnHeight: "100vh"
			}}>
				<Header goBack={true} to={"/neo"}/>
				<div className="row no-gutters">
					<div className="col-12">
						<h1 className="main-heading">Neo - Asteroid Feed</h1>
					</div>
				</div>

				<div className="row no-gutters result-row ">
					<div className="col col-12 flex-column">
						{this.props.asteroids ? this.props.asteroids.map(el => {
							const date = this.props.dates[this.props.asteroids.indexOf(el)]
							return ( <NeoTable 
									neoData={el}
									date={date}
									key={date}
									visible={this.state.visible}
									/>
								)
						}) : <p>No asteroids found</p>}
							
								
					</div>
				</div>
				
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(NeoResults)