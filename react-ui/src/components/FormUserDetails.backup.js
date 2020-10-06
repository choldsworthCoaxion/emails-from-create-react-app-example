import React, { Component, useState } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "material-ui/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { minHeight, border } from "@material-ui/system";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";

// YEARLY HOURS
const marks = [
	{
		value: 0,
		label: "0"
	},
	{
		value: 500,
		label: "500"
	},
	{
		value: 1000,
		label: "1000"
	},
	{
		value: 1500,
		label: "1500"
	}
];

const theme = createMuiTheme({
	palette: {
		primary: {
			// Purple and green play nicely together.
			main: "#b5212b"
		},
		secondary: {
			// This is green.A700 as hex.
			main: "#b5212b"
		}
	}
});

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),

			flexGrow: 1
		}
	}
}));

function NumberFormatCustom(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={values => {
				onChange({
					target: {
						value: values.value
					}
				});
			}}
			thousandSeparator
			prefix="$ "
		/>
	);
}

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};

class FormUserDetails extends Component {
	state = {
		numberformat: this.props.purchasePrice
	};

	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	};

	render() {
		const {
			values,
			handleChange,
			numberformat,
			handleSecurityDeposit
		} = this.props;

		return (
			<MuiThemeProvider>
				<ThemeProvider theme={theme}>
					<React.Fragment>
						<Container maxWidth="lg">
							<Grid container spacing={2}>
								<Grid item xs={12} container>
									<Grid item xs={12}>
										<h1> Coaxion Equipment Calculator</h1>
									</Grid>
								</Grid>

								<Grid item xs={12} container spacing={2}>
									<Grid item xs={6}>
										<Paper elevation={2}>
											<br />
											<Typography
												id="discrete-slider"
												gutterBottom
											>
												Purchase Price ($)
											</Typography>
											<NumberFormatCustom
												onChange={handleChange(
													"purchasePrice"
												)}
												style={styles.numberInput}
												color="primary"
												required={true}
												defaultValue={
													values.purchasePrice
												}
											/>
											<br />
											<br />
											<Typography
												id="discrete-slider"
												gutterBottom
											>
												Lease Term (In Months)
											</Typography>
											<Select
												style={styles.formControl}
												onChange={handleChange(
													"leaseTerm"
												)}
												defaultValue={values.leaseTerm}
											>
												<MenuItem value="" disabled>
													{" "}
													- Select -{" "}
												</MenuItem>
												<MenuItem value={24}>
													24
												</MenuItem>
												<MenuItem value={36}>
													36
												</MenuItem>
												<MenuItem value={48}>
													48
												</MenuItem>
											</Select>
											<br /> <br /> <br />
											<Typography
												id="discrete-slider"
												gutterBottom
											>
												Yearly Machine Hours
											</Typography>
											<Slider
												style={styles.formSlider}
												values={values}
												defaultValue={750}
												aria-labelledby="discrete-slider"
												valueLabelDisplay="auto"
												step={250}
												marks={marks}
												min={0}
												max={1500}
												onChangeCommitted={(
													event,
													value
												) =>
													handleChange("yearlyHours")(
														{
															target: { value }
														}
													)
												}
												defaultValue={
													values.yearlyHours
												}
											/>
											<br /> <br />
											<Button
												variant="contained"
												color="primary"
												label="Calculate"
												primary={true}
												style={styles.button}
												onClick={handleSecurityDeposit(
													values.purchasePrice,
													values.leaseTerm,
													"securityDeposit",
													values.yearlyHours,
													"fixed",
													"variable",
													"monthly",
													"endOfTermBuyout"
												)}
											>
												Calculate{" "}
											</Button>
										</Paper>
									</Grid>

									<Grid item xs={6}>
										<Paper elevation={2}>
											<br />
											<Grid container spacing={2}>
												<Grid item xs={12}>
													<h3> Why Choose Coaxion</h3>
												</Grid>
												<Grid item xs={2}>
													<CheckCircleSharpIcon color="primary" />
												</Grid>
												<Grid item xs={10} align="left">
													Placeholder Text Example
												</Grid>
												<Grid item xs={2}>
													<CheckCircleSharpIcon color="primary" />
												</Grid>
												<Grid
													item
													xs={9}
													align="justify"
												>
													Lorem Ipsum is simply dummy
													text of the printing and
													typesetting industry. Lorem
													Ipsum has been the
													industry's standard dummy
													text ever since the 1500s,
													when an unknown printer took
													a galley of type and
													scrambled it to make a type
													specimen book. It has
													survived not only five f the
													printing
												</Grid>
												<Grid item xs={2}>
													<CheckCircleSharpIcon color="primary" />
												</Grid>
												<Grid item xs={10} align="left">
													Placeholder Text Example
												</Grid>
												<Grid item xs={2}>
													<CheckCircleSharpIcon color="primary" />
												</Grid>
												<Grid item xs={10} align="left">
													Placeholder Text Example
												</Grid>
											</Grid>
										</Paper>
									</Grid>
								</Grid>
							</Grid>
						</Container>
					</React.Fragment>
				</ThemeProvider>
			</MuiThemeProvider>
		);
	}
}

const styles = {
	container: {
		display: flex
	},
	button: {
		margin: 20,
		minWidth: 150,
		minHeight: 40
	},
	formControl: {
		margin: 1,
		//minWidth: 200,
		align: "left",
		width: "relative"
	},
	formSlider: {
		//padding: 100,
		//border: 50,
		//width: "relative",
		position: "relative"
		//minWidth: 250,
		//maxWidth: 250
	},
	numberInput: {
		//minWidth: 250,
		//minHeight: 30,
		fontFamily: "Arial",
		position: "relative",
		borderColor: "transparent",
		fontSize: 16,
		borderBottomColor: "#9e9e9e", // Add this to specify bottom border color
		borderBottomWidth: 1 // Add this to specify bottom border thickness
	},
	selectEmpty: {
		marginTop: 2
	},
	container: {
		maxWidthXs: 1
	}
};

export default FormUserDetails;
