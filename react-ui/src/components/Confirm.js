import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";

export class FormUserDetails extends Component {
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
		const {
			values: { firstName, lastName, email, occupation, city, bio }
		} = this.props;

		return (
			<MuiThemeProvider>
				<React.Fragment>
					<List>
						<ListItem
							primaryText="First Name"
							secondaryText={firstName}
						/>
						<ListItem
							primaryText="Last Name"
							secondaryText={lastName}
						/>
						<ListItem primaryText="Email" secondaryText={email} />
						<ListItem
							primaryText="Occupation"
							secondaryText={occupation}
						/>
						<ListItem primaryText="city" secondaryText={city} />
						<ListItem primaryText="Bio" secondaryText={bio} />
					</List>
					<br></br>
					<RaisedButton
						label="Continue"
						primary={true}
						style={styles.button}
						onClick={this.continue}
					/>
					<RaisedButton
						label="Back"
						primary={false}
						style={styles.button}
						onClick={this.back}
					/>
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

export default FormUserDetails;
