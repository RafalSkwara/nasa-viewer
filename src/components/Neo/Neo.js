import * as React from "react";
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition';

//components
import NeoResults from '../NeoResults/NeoResults';
import NeoSearch from '../NeoSearch/NeoSearch';
import Calendar from 'rc-calendar';

//styles
import "./Neo.sass";



class Neo extends React.Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
	}

	render() {
		const imgSrc = require('../../assets/img/bg2.jpg');
		return(
			<AnimatedSwitch

				atEnter={{ opacity: 0 }}
				atLeave={{ opacity: 0 }}
				atActive={{ opacity: 1 }}
				className="switch-wrapper"
			>

				<Route path={`${this.props.match.path}`} exact component={NeoSearch} />
				<Route path={`${this.props.match.path}/results`} component={NeoResults} />
				/>
			</AnimatedSwitch>
		)
	}

}

export default Neo