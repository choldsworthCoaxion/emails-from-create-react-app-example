import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormCalculation from "./FormCalculation";
import Confirm from "./Confirm";
import Success from "./Success";

export class UserForm extends Component {
	state = {
		step: 1,
		purchasePrice: 175000,
		leaseTerm: 48,
		securityDeposit: 35000,
		monthlyHours: 40,
		fixed: 2625,
		variable: 1260,
		monthly: 3885,
		endOfTermBuyout: 93616,
		email: "",
		data: null
	};

	componentDidMount() {
		// Call our fetch function below once the component mounts
		this.callBackendAPI()
			.then(res => this.setState({ data: res.express }))
			.catch(err => console.log(err));
	}
	// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
	callBackendAPI = async () => {
		const response = await fetch("/express_backend");
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};

	//Proceed to next step
	nextStep = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1
		});
	};

	//Go Back to Previous Step
	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1
		});
	};

	handlePurchasePriceValues = input => e => {
		var temp = e.target.value;
		console.log(temp);
		this.setState({ purchasePrice: temp });
	};

	// Handle Fields Change
	handleChange = input => e => {
		var temp = parseInt(e.target.value);
		this.setState({ [input]: temp });
	};

	handleText = input => e => {
		this.setState({ [input]: e.target.value });
	};

	handlePurchaseInput = (monthlyHours, leaseTerm) => e => {
		var temp = parseInt(e.target.value);
		if (e.target.value > 250000) {
			temp = 250000;
		}
		var endOftermTemp = Math.round(
			temp +
				2000 -
				0.2 * temp -
				0.8 * 0.00018 * temp * monthlyHours * leaseTerm
		);

		if (endOftermTemp > 0) {
			//console.log(endOftermTemp);
		} else {
			endOftermTemp = 0;
		}
		this.setState({
			purchasePrice: temp,
			securityDeposit: Math.round(temp * 0.2),
			fixed: Math.round(temp * 0.015),
			variable: Math.round(0.00018 * temp * monthlyHours),
			monthly: Math.round(temp * 0.015 + 0.00018 * temp * monthlyHours),
			endOfTermBuyout: endOftermTemp
		});
	};

	handlePurchaseSlider = (monthlyHours, leaseTerm) => e => {
		var temp = parseInt(e.target.value);

		var endOftermTemp = Math.round(
			temp +
				2000 -
				0.2 * temp -
				0.8 * 0.00018 * temp * monthlyHours * leaseTerm
		);

		if (endOftermTemp > 0) {
			//console.log(endOftermTemp);
		} else {
			endOftermTemp = 0;
		}
		this.setState({
			purchasePrice: temp,
			securityDeposit: Math.round(temp * 0.2),
			fixed: Math.round(temp * 0.015),
			variable: Math.round(0.00018 * temp * monthlyHours),
			monthly: Math.round(temp * 0.015 + 0.00018 * temp * monthlyHours),
			endOfTermBuyout: endOftermTemp
		});
	};

	handleBlur = purchasePrice => e => {
		//console.log("blur: " + e.target.value);

		//console.log(purchasePrice);

		var temp = purchasePrice;
		if (purchasePrice > 250000) {
			temp = 250000;
		} else if (purchasePrice < 100000) {
			temp = 100000;
		}

		//console.log("temp " + [purchasePrice]);

		this.setState({ purchasePrice: temp });
		//console.log("blur: " + e.target.value);
	};

	handleLeaseTerm = (purchasePrice, monthlyHours) => e => {
		var endOftermTemp = Math.round(
			purchasePrice +
				2000 -
				0.2 * purchasePrice -
				0.8 * 0.00018 * purchasePrice * monthlyHours * e.target.value
		);

		if (endOftermTemp > 0) {
			//console.log(endOftermTemp);
		} else {
			endOftermTemp = 0;
		}
		this.setState({
			leaseTerm: e.target.value,
			endOfTermBuyout: endOftermTemp
		});
	};

	handleHours = (monthlyHours, purchasePrice, leaseTerm) => e => {
		var endOftermTemp = Math.round(
			purchasePrice +
				2000 -
				0.2 * purchasePrice -
				0.8 * 0.00018 * purchasePrice * e.target.value * leaseTerm
		);
		if (endOftermTemp > 0) {
			//console.log(endOftermTemp);
		} else {
			endOftermTemp = 0;
		}

		this.setState({
			[monthlyHours]: e.target.value,
			variable: Math.round(0.00018 * purchasePrice * e.target.value),
			monthly: Math.round(
				purchasePrice * 0.015 + 0.00018 * purchasePrice * e.target.value
			),
			endOfTermBuyout: endOftermTemp
		});
	};

	handleSecurityDeposit = (
		purchasePrice,
		leaseTerm,
		securityDeposit,
		monthlyHours,
		fixed,
		variable,
		monthly,
		endOfTermBuyout
	) => e => {
		this.setState({ [securityDeposit]: Math.round(purchasePrice * 0.2) });
		this.setState({ [fixed]: Math.round(purchasePrice * 0.015) });
		this.setState({
			[variable]: Math.round(0.00018 * purchasePrice * monthlyHours)
		});
		this.setState({
			[monthly]: Math.round(
				purchasePrice * 0.015 + 0.00018 * purchasePrice * monthlyHours
			)
		});

		var temp =
			purchasePrice +
			2000 -
			0.2 * purchasePrice -
			0.8 * 0.00018 * purchasePrice * monthlyHours * leaseTerm;

		if (temp > 0) {
			//console.log(temp);
		} else {
			temp = 0;
		}

		this.setState({
			[endOfTermBuyout]: Math.round(temp)
		});
		const { step } = this.state;
		this.setState({
			step: step
		});
	};

	render() {
		const { step } = this.state;
		const {
			purchasePrice,
			leaseTerm,
			securityDeposit,
			monthlyHours,
			fixed,
			variable,
			monthly,
			endOfTermBuyout,
			email
		} = this.state;

		const values = {
			purchasePrice,
			leaseTerm,
			securityDeposit,
			monthlyHours,
			fixed,
			variable,
			monthly,
			endOfTermBuyout,
			email
		};

		switch (step) {
			case 1:
				return (
					<div className="App">
						<FormUserDetails
							nextStep={this.nextStep}
							handleChange={this.handleChange}
							handlePurchasePriceValues={
								this.handlePurchasePriceValues
							}
							handlePurchaseInput={this.handlePurchaseInput}
							handlePurchaseSlider={this.handlePurchaseSlider}
							handleLeaseTerm={this.handleLeaseTerm}
							handleBlur={this.handleBlur}
							handleHours={this.handleHours}
							values={values}
							handleSecurityDeposit={this.handleSecurityDeposit}
							handleText={this.handleText}
						/>
					</div>
				);
			case 2:
				return (
					<FormCalculation
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						values={values}
						handleText={this.handleText}
					/>
				);
			case 3:
				return (
					<Confirm
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						values={values}
					/>
				);
			case 4:
				return <Success />;
		}

		return <div></div>;
	}
}

export default UserForm;
