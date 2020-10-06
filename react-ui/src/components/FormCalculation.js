import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

const sendEmail = (
	email,
	userName = "Coaxion Equipment Finance",
	purchasePrice
) => {
	return fetch("/api/send_email", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, userName, purchasePrice })
	}).then(response => response.json());
};

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

export default class FormCalculation extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	};

	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		const { values, handleText, series, options } = this.props;

		const {
			values: {
				purchasePrice,
				leaseTerm,
				securityDeposit,
				yearlyHours,
				fixed,
				variable,
				monthly,
				endOfTermBuyout,
				email
			}
		} = this.props;

		return (
			<MuiThemeProvider>
				<ThemeProvider theme={theme}>
					<React.Fragment>
						<Container maxWidth="md">
							<Grid container spacing={2}>
								<Grid item xs={12} container>
									<Grid item xs={12}>
										<h1> Coaxion Equipment Calculator</h1>
									</Grid>
								</Grid>

								<Grid item xs={12} container spacing={2}>
									<Grid item xs={6}>
										<Paper elevation={2} variant="outlined">
											<br />
											<Typography
												variant={"h6"}
												style={styles.header}
											>
												Finance Quote
											</Typography>
											<br />
											<Grid
												item
												xs={12}
												container
												spacing={1}
											>
												<Grid item xs={1}></Grid>
												<Grid item xs={8}>
													<Typography
														variant={"h6"}
														style={styles.item}
													>
														Purchase Price
													</Typography>
												</Grid>
												<Grid item sx={3}>
													<NumberFormat
														style={styles.info}
														value={purchasePrice}
														displayType={"text"}
														thousandSeparator={true}
														prefix="$ "
													/>
												</Grid>

												<Grid item xs={1}></Grid>
												<Grid item xs={8}>
													<Typography
														variant={"h6"}
														style={styles.item}
													>
														Security Deposit
													</Typography>
												</Grid>
												<Grid item sx={3}>
													<NumberFormat
														variant={"h6"}
														style={styles.info}
														value={securityDeposit}
														displayType={"text"}
														thousandSeparator={true}
														prefix="$ "
													/>
												</Grid>

												<Grid item xs={1}></Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={8}>
													<Typography
														variant={"h6"}
														style={styles.item}
													>
														Lease Term
													</Typography>
												</Grid>
												<Grid item sx={3}>
													<NumberFormat
														style={styles.info}
														value={leaseTerm}
														displayType={"text"}
														thousandSeparator={true}
														suffix=" Months"
													/>
												</Grid>

												<Grid item xs={1}></Grid>
												<Grid item xs={8}>
													<Typography
														variant={"h6"}
														style={styles.item}
													>
														Yearly Hours
													</Typography>
												</Grid>
												<Grid item sx={3}>
													<NumberFormat
														style={styles.info}
														value={yearlyHours}
														displayType={"text"}
														thousandSeparator={true}
														suffix=" Hours"
													/>
												</Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={10}>
													<Divider></Divider>
												</Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={8}>
													<Typography
														variant={"h6"}
														style={styles.item}
													>
														Fixed Monthly
													</Typography>
												</Grid>
												<Grid item sx={3}>
													<NumberFormat
														style={styles.info}
														value={fixed}
														displayType={"text"}
														thousandSeparator={true}
														prefix="$ "
													/>
												</Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={8}>
													<Typography
														variant={"h6"}
														style={styles.item}
													>
														Variable Monthly
													</Typography>
												</Grid>
												<Grid item sx={3}>
													<NumberFormat
														style={styles.info}
														value={variable}
														displayType={"text"}
														thousandSeparator={true}
														prefix="$ "
													/>
												</Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={10}>
													<Divider></Divider>
												</Grid>

												<Grid item xs={1}></Grid>

												<Grid item xs={1}></Grid>
												<Grid item xs={8}>
													<Typography
														variant={"h6"}
														style={styles.item}
													>
														Repayment Amount
													</Typography>
												</Grid>

												<Grid item sx={3}>
													<NumberFormat
														style={styles.info}
														value={monthly}
														displayType={"text"}
														thousandSeparator={true}
														prefix="$ "
													/>
													<br />
												</Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={10}>
													<Divider></Divider>
												</Grid>
												<Grid item xs={1}></Grid>
												<br />
												<Grid item xs={1}></Grid>
												<Grid item xs={8}>
													<Typography
														variant={"h6"}
														style={styles.item}
													>
														End of Term Buyout
													</Typography>
												</Grid>
												<Grid item sx={3}>
													<NumberFormat
														style={styles.info}
														value={endOfTermBuyout}
														displayType={"text"}
														thousandSeparator={true}
														prefix="$ "
													/>
												</Grid>
												<Grid item xs={1}></Grid>
												<Grid item xs={12}>
													<Button
														variant="contained"
														color="primary"
														label="Back"
														primary={false}
														style={styles.button}
														onClick={this.back}
													>
														Back
													</Button>
												</Grid>
											</Grid>

											<Grid> </Grid>
											<br></br>
											<br></br>
										</Paper>
									</Grid>
									<Grid item xs={6}>
										<Paper elevation={2} variant="outlined">
											<Grid
												item
												xs={12}
												container
												spacing={1}
											>
												<Grid item xs={12}>
													<h3>
														Get this quote delivered
														to you today!
													</h3>
													<p>
														Enter your Email address
													</p>
													<TextField
														onChange={handleText(
															"email"
														)}
														style={
															styles.formControl
														}
													></TextField>
													<br />
													<br />
													<Grid
														item
														container
														xs={12}
													>
														<Grid
															item
															xs={1}
														></Grid>
														<Grid item xs={10}>
															<p align="justify">
																We work with you
																to monitor the
																equipment using
																the latest
																technology so
																that the machine
																stays healthy,
																last longer and
																costs you less.
															</p>
															<p align="justify">
																{" "}
																Build equity as
																you go based on
																how much you
																work. We help
																you to own your
																destiny
															</p>
														</Grid>
														<Grid
															item
															xs={1}
														></Grid>
														<Grid item xs={12}>
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
																			purchasePrice
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
																Email Quote
															</Button>
														</Grid>
													</Grid>
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
	button: {
		margin: 20,
		minWidth: 150,
		minHeight: 40
	},
	formControl: {
		margin: 1,
		minWidth: 300
	},
	totalMonthly: {
		fontWeight: "bold",

		fontSize: 20
	},
	header: {
		fontWeight: "bold"
	},
	item: {
		textAlign: "left"
	},
	info: {
		textAlign: "right"
	}
};
