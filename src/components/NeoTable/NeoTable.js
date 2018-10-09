import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//actions
import { NeoSetDate } from '../../actions/NeoActions';
//components
import Calendar from 'rc-calendar';
import Header from "../Header/Header";
//Icons
import { Icon } from 'react-icons-kit'
import { ic_expand_less, ic_expand_more } from 'react-icons-kit/md/'
//styles
import '../../view_styles/rc-calendar.sass';
import "./NeoTable.sass";

const mapStateToProps = state => ({
	apiKey: state.keyReducer.apiKey,
	endDate: state.NeoReducer.endDate,
	startDate: state.NeoReducer.startDate,
	dates: state.NeoReducer.dates,
	asteroids: state.NeoReducer.asteroids
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators({

	}, dispatch);
}

class NeoTable extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			visible: this.props.visible
		}

		this.toggleVisible = this.toggleVisible.bind(this)
		this.closeVisible = this.closeVisible.bind(this)
	}

	toggleVisible() {
		this.setState({visible: !this.state.visible})
	}
	closeVisible() {
		this.setState({visible: false})
	}

	render() {
		const red ="#ff3b30",
			green = "#4cd964";
			return (
				<div className="table-wrapper">
					<div className="table-wrapper__tab" onClick={this.toggleVisible}>
						<div className="button" >
							<div>{this.props.date}</div>
							<div>Asteroids: {this.props.neoData.length}</div>
						</div>
						{
							this.state.visible ? <Icon icon={ic_expand_less} size={24} style={{width: "50px"}}/>
								: <Icon icon={ic_expand_more} size={24} style={{ width: "50px" }} />
						}
				</div>
				{(this.props.neoData && this.state.visible) ? this.props.neoData.map(data => {
					const hazardous = data.is_potentially_hazardous_asteroid
					return (
					<table className="neo-table" width="100%" key={data.id}>
						<tbody>
						<tr>
							<th colSpan={2}>
								Id: {data.id}
							</th>
						</tr>
							<tr>
								<td width="60%" valign="center">Name</td>
								<td width="40%">{data.name}</td>
							</tr>
							<tr>
								<td width="60%">Estimated max diameter</td>

								<td width="40%">{(data.estimated_diameter.meters.estimated_diameter_max).toFixed(2) + ' m'}</td>
							</tr>
							{data.close_approach_data &&
							<React.Fragment> 
							<tr>
								<td width="60%">Relative velocity at close approach</td>

								<td width="40%">{Number(data.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2)+' km/s'}</td>
							</tr>
							<tr>
								<td width="60%">Miss distance</td>

								<td width="40%">{Number(data.close_approach_data[0].miss_distance.kilometers/1000000).toFixed(2)+' mln km'}</td>
							</tr>
							</React.Fragment>
								}
							<tr>
								<td width="60%">Hazardous</td>

								<td width="40%" style={{color: hazardous ? "red" : "green"}}>{hazardous ? "Yes" : "No"}</td>
							</tr>
						</tbody>
					</table>
					)}				
	) : null}
	</div>
			)

	}

}

export default connect(mapStateToProps, mapDispatchToProps)(NeoTable)