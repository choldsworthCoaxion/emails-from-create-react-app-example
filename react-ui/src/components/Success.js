import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export class Success extends Component {
	continue = e => {
		e.preventDefault();
		//PROCESS DETAILS //
		this.props.nextStep();
	};
	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		return (
			<MuiThemeProvider>
				<React.Fragment>
					<h1> Thank you for your submission </h1>
					<p> you will get an email with further instructions</p>
				</React.Fragment>
			</MuiThemeProvider>
		);
	}
}

const styles = {
	button: {
		margin: 15
	}
};

export default Success;
