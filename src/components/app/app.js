import React, { Component, useEffect, useState} from "react";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import { BookItem, BookPage, CharacterPage, HousePage } from "../pages";
import gotService from '../../services/gotService'
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {
	gotService = new gotService();

	state = {
		showRandomChar: true,
		error: false,
	};

	componentDidCatch() {
		this.setState({
			error: true,
		});
	}

	toggleRandomChar = () => {
		this.setState((state) => {
			return {
				showRandomChar: !state.showRandomChar,
			};
		});
	};

	render() {
		const char = this.state.showRandomChar ? <RandomChar interval={15000}/> : null;

		if (this.state.error) {
			return <ErrorMessage />;
		}

		return (
			<Router>
				<div className="App">
					<Container>
						<Header />
					</Container>
					<Container>
						<Row>
							<Col lg={{ size: 5, offset: 0 }}>{char}</Col>
						</Row>
						<Button
							className="btn mb-5"
							color="primary"
							onClick={this.toggleRandomChar}>
							Toggle random character
						</Button>
						<Route path='/' exact component={() => <h1>Welcome to GOT</h1>}/>
						<Route path='/characters/' component={CharacterPage}/>
						<Route path='/houses/' component={HousePage}/>
						<Route path='/books/' exact component={BookPage}/>
						<Route path='/books/:id' render={
							({match}) => {
								const {id} = match.params;
							
							return <BookItem bookId={id}/>}
						}/>

					</Container>
				</div>
			</Router>
		)
	}
}
