import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserForm from "./components/UserForm";

const sendEmail = (email, userName = "Coaxion Equipment Finance") => {
	return fetch("/api/send_email", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, userName })
	}).then(response => response.json());
};

class App extends Component {
	//state = { email: "" };

	render() {
		return (
			<div className="App">
				<UserForm />

				{/* <p className="App-intro">
					<input
						onChange={ev => {
							this.setState({ email: ev.target.value });
						}}
						style={{ padding: "10px", fontSize: "1em" }}
					/>
					<button
						onClick={() => {
							const { email } = this.state;
							if (email) {
								sendEmail(email).then(({ message }) => {
									alert(message);
								});
							} else {
								alert("Please add an email");
							}
						}}
					>
						Send Email
					</button>
				</p> */}
			</div>
		);
	}
}

export default App;
