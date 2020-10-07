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
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Chart from "react-apexcharts";

const sendEmail = (
	email,
	userName = "Coaxion Equipment Finance",
	purchasePrice,
	securityDeposit,
	monthlyHours,
	leaseTerm,
	variable,
	fixed,
	monthly,
	endOfTermBuyout
) => {
	return fetch("/api/send_email", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email,
			userName,
			purchasePrice,
			securityDeposit,
			monthlyHours,
			leaseTerm,
			variable,
			fixed,
			monthly,
			endOfTermBuyout
		})
	}).then(response => response.json());
};

// MONTHLY HOURS
const marks = [
	{
		value: 0,
		label: "0"
	},
	{
		value: 60,
		label: "60"
	},
	{
		value: 120,
		label: "120"
	}
];

const ppMarks = [
	{
		value: 100000,
		label: "$ 100,000"
	},
	{
		value: 175000,
		label: "$ 175,000"
	},
	{
		value: 250000,
		label: "$ 250,000"
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

function plotTest(input) {
	var axis;
	if (input > 8000) {
		axis = 10000;
		//axis = undefined;
	} else {
		axis = 8000;
	}
	return axis;
}

function EquityText(props) {
	const equity = props.equity;
	if (equity == 100) {
		return (
			<Typography variant="body1">
				At the end of your lease, you will own {equity}% of the machine,
				and recieve some cashback
			</Typography>
		);
	} else {
		return (
			<Typography variant="body1">
				At the end of your lease, you will own {equity}% of the machine!
			</Typography>
		);
	}
}

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};

class FormUserDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasePrice: "",
			securityDeposit: "",
			monthlyHours: "",
			leaseTerm: "",
			securityDeposit: "",

			fixed: "",
			variable: "",
			monthly: "",
			endOfTermBuyout: ""
		};
	}

	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	};

	render() {
		const {
			values,
			handleChange,
			handlePurchaseInput,
			handlePurchaseSlider,
			handleBlur,
			handlePurchasePriceValues,
			handleLeaseTerm,
			numberformat,
			handleSecurityDeposit,
			handleHours,
			handleText
		} = this.props;

		const {
			values: {
				purchasePrice,
				leaseTerm,
				securityDeposit,
				monthlyHours,
				fixed,
				variable,
				monthly,
				endOfTermBuyout,
				email
			}
		} = this.props;

		var apexTest = {
			series: [
				{
					name: "Fixed Cost",
					data: [fixed]
				},
				{
					name: "Usage Cost",
					data: [variable]
				}
			],
			options: {
				chart: {
					type: "bar",
					height: 400,
					stacked: true,

					animations: {
						enabled: true,
						dynamicAnimation: {
							enabled: true
						}
					}
				},

				/* legend: {
					fontSize: 28,
					horizontalAlign: "center"
				}, */
				colors: ["#e7c64d", "#B5212B"],

				plotOptions: {
					bar: {
						horizontal: false
					},
					dataLabels: {
						position: "top",
						maxItems: 100,

						orientation: "horizontal"
					}
				},
				dataLabels: {
					enabled: true,
					//textAnchor: "left",
					style: {
						colors: ["#fff"],
						fontSize: "20px",
						fontFamily: "Helvetica, Arial, sans-serif",
						fontWeight: "bold"
					},
					formatter: function(val, opt) {
						return "$ " + val;
					},
					offsetX: 0,
					dropShadow: {
						enabled: true
					}
				},
				stroke: {
					width: 1,
					colors: ["#fff"]
				},
				title: {
					//text: "Fiction Books Sales"
				},
				xaxis: {
					categories: ["Monthly Repayments"],
					labels: {
						formatter: function(val) {
							return val;
						}
					}
				},
				yaxis: {
					title: {
						text: undefined
					},
					min: 0,
					forceNiceScale: false,

					//max: plotTest([monthly])
					max: 10000,
					labels: {
						show: true,
						align: "right",

						style: {
							colors: [],
							fontSize: "14px",
							fontFamily: "Helvetica, Arial, sans-serif",
							fontWeight: 400,
							cssClass: "apexcharts-yaxis-label"
						}
					}
				},
				tooltip: {
					y: {
						formatter: function(val) {
							return "$ " + val;
						}
					}
				},
				fill: {
					opacity: 1
				},
				legend: {
					show: true,
					position: "top",
					horizontalAlign: "center",
					fontSize: "16px",
					showForZeroSeries: false
				}
			}
		};

		var equity = Math.round(
			((purchasePrice - endOfTermBuyout) / purchasePrice) * 100
		);
		if (equity < 0) {
			equity = 0;
		}

		var radialChart = {
			series: [equity],
			options: {
				chart: {
					width: 400,
					height: 400,
					type: "radialBar",
					animations: {
						enabled: true,
						dynamicAnimation: {
							enabled: true
						}
					}
				},
				plotOptions: {
					radialBar: {
						offsetY: 0, //Offset between legend and middle of donut

						dataLabels: {
							show: true,
							name: {
								show: false,
								fontSize: "14px",
								fontFamily: undefined,
								fontWeight: 600,
								color: undefined,
								offsetY: -10
							},
							value: {
								show: true,
								fontSize: "32px",
								fontFamily: undefined,
								fontWeight: 400,
								color: undefined,
								offsetY: 12,

								formatter: function(val) {
									return val + "%";
								}
							}
						}
					}
				},

				colors: ["#B5212B"],
				labels: ["Machine Ownership"]
			}
		};

		return (
			<div style={styles.root} spacing={3}>
				<MuiThemeProvider>
					<ThemeProvider theme={theme}>
						<React.Fragment>
							<Box style={{ backgroundColor: "#dbdee0" }}>
								<Container
									maxWidth="lg"
									style={{
										backgroundColor: "#dbdee0"
									}}
								>
									<Typography variant="h4" gutterBottom>
										Equipment Finance Calculator
									</Typography>

									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<Paper style={styles.paper}>
												<Typography
													variant="h6"
													gutterBottom
													align="left"
												>
													Find out how our usage based
													leasing can work for you!
												</Typography>
												<Typography
													variant="body1"
													gutterBottom
													align="left"
												>
													Here at coaXion, we have
													designed a new Smart Lease,
													which matches your monthly
													payments to how much you
													work the machine.
													{<br />}
													{<br />}
													Slow month? Pay less. Busy
													month? Your payments rise
													when you can best afford it,
													putting you in control of
													your cashflow. It's the
													flexibility of rental
													without the high costs.
												</Typography>
												<br />
												<br />
												<Typography gutterBottom>
													Purchase Price ($)
												</Typography>
												<NumberFormatCustom
													onBlur={handleBlur(
														purchasePrice
													)}
													onChange={handlePurchaseSlider(
														monthlyHours,
														leaseTerm
													)}
													//inputRef={inputRef}
													value={purchasePrice}
													style={styles.numberInput}
													maxLength="9"
													color="primary"
													defaultValue={
														values.purchasePrice
													}

													//displayType={"text"}
												/>
												<br /> <br />
												<Slider
													style={styles.formSlider}
													values={values}
													//defaultValue={180000}
													aria-labelledby="discrete-slider"
													step={5000}
													marks={ppMarks}
													min={100000}
													max={250000}
													valueLabelDisplay="off"
													onChangeCommitted={(
														event,
														value
													) =>
														handlePurchaseSlider(
															monthlyHours,
															leaseTerm
														)({
															target: { value }
														})
													}
													defaultValue={
														values.purchasePrice
													}
												/>
												<br />
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
													onChange={handleLeaseTerm(
														purchasePrice,
														monthlyHours
													)}
													defaultValue={
														values.leaseTerm
													}
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
												<br /> <br /> <br /> <br />
												<Typography
													id="discrete-slider"
													gutterBottom
												>
													Monthly Machine Hours
												</Typography>
												<Slider
													style={styles.formSlider}
													values={values}
													//defaultValue={50}
													aria-labelledby="discrete-slider"
													valueLabelDisplay="auto"
													step={10}
													marks={marks}
													min={0}
													max={120}
													onChangeCommitted={(
														event,
														value
													) =>
														handleHours(
															"monthlyHours",
															purchasePrice,
															leaseTerm
														)({
															target: { value }
														})
													}
													defaultValue={
														values.monthlyHours
													}
												/>
												<br /> <br />
												<Typography
													variant="body1"
													gutterBottom
													align="left"
												>
													Your <b>Fixed Price</b> does
													not change month to month,
													but your <b>Usage Price </b>
													will adjust, depending on
													how many hours the machine
													is worked.{" "}
												</Typography>
												<br /> <br />
											</Paper>
										</Grid>
										<Grid item xs={12} md={6}>
											<Paper style={styles.paper}>
												<Typography
													variant="h6"
													gutterBottom
													align="left"
												>
													Repayment Breakdown
												</Typography>
												<Divider></Divider>
												<br />
												<Grid container sm={12}>
													<Grid item sm={7}>
														<Chart
															options={
																apexTest.options
															}
															series={
																apexTest.series
															}
															type="bar"
															height={350}
														/>
													</Grid>
													<Grid item sm={5}>
														<EquityText
															equity={equity}
														/>
														<Chart
															options={
																radialChart.options
															}
															series={
																radialChart.series
															}
															type="radialBar"
															height={300}
														/>
													</Grid>
												</Grid>
												<br />
												<Grid item item xs={12}>
													<Typography
														variant="h6"
														gutterBottom
														align="center"
													>
														Your average total
														monthly repayments are
														estimated to be:
													</Typography>
												</Grid>
												<Grid item item xs={12}>
													<NumberFormat
														align="right"
														style={{ fontSize: 36 }}
														value={monthly}
														displayType={"text"}
														thousandSeparator={true}
														prefix="$ "
													/>
												</Grid>
												<br /> <br />
												<Grid
													container
													item
													spacing={2}
												>
													<Grid item item xs={7}>
														<TextField
															onChange={handleText(
																"email"
															)}
															style={
																styles.formEmail
															}
															placeholder="Enter your email address"
															textalign="center"
														></TextField>
													</Grid>
													<Grid item item xs={5}>
														<Button
															variant="contained"
															color="primary"
															label="Continue"
															primary={true}
															style={
																styles.button
															}
															onClick={() => {
																if (email) {
																	sendEmail(
																		email,
																		null,
																		purchasePrice,
																		securityDeposit,
																		monthlyHours,
																		leaseTerm,
																		variable,
																		fixed,
																		monthly,
																		endOfTermBuyout
																	).then(
																		({
																			message
																		}) => {
																			alert(
																				message
																			);
																		}
																	);
																} else {
																	alert(
																		"Please add an email"
																	);
																}
															}}
														>
															Email me this quote
														</Button>

														<br />
														<br />
														<br />
														<br />
														<br />
													</Grid>
												</Grid>
											</Paper>
										</Grid>
									</Grid>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<Typography
												variant="subtitle2"
												style={{ textAlign: "center" }}
											>
												Important Information
											</Typography>
											<Typography
												variant="caption"
												gutterBottom
											>
												This Equipment Finance
												Calculator has been provided for
												illustrative purposes only and
												the results are based on the
												summary information provided.
												This does not constitute a
												quotation or an offer. As this
												is only a guide, it is suggested
												that you contact us for a more
												detailed quote. To the extent
												permitted by law, Coaxion Pty
												Ltd ABN 91 162 362 665 does not
												accept any responsibility for
												persons who rely on the
												information generated by this
												program.
											</Typography>
										</Grid>
									</Grid>
								</Container>
							</Box>
						</React.Fragment>
					</ThemeProvider>
				</MuiThemeProvider>
			</div>
		);
	}
}

const styles = {
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary
	},
	button: {
		//margin: 20
		//minWidth: 80,
	},
	formControl: {
		margin: 1,
		minWidth: 250,
		align: "left",
		width: "relative"
	},
	formEmail: {
		margin: 1,
		minWidth: 250,
		textAlign: "center",
		width: "relative"
	},
	formSlider: {
		//padding: 100,
		//border: 50,
		//width: "relative",
		position: "relative",
		width: "relative",
		minWidth: 150,
		maxWidth: 350
	},
	numberInput: {
		maxWidth: 350,
		minWidth: 250,
		justifyContent: "right",
		minHeight: 40,
		fontFamily: "Arial",
		position: "relative",
		borderColor: "transparent",
		textAlign: "left",
		fontSize: 18,
		borderBottomColor: "#9e9e9e", // Add this to specify bottom border color
		borderBottomWidth: 1 // Add this to specify bottom border thickness
	},
	selectEmpty: {
		marginTop: 2
	},
	container: {
		maxWidthXs: 1
	},
	info: {
		textAlign: "right"
	}
};

export default FormUserDetails;
