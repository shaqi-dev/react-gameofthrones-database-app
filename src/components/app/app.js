import React, { Component } from "react";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import { BookItem, BookPage, CharacterPage, HousePage } from "../pages";
import gotService from '../../services/gotService'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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
		const char = this.state.showRandomChar ? <RandomChar /> : null;

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
						<CharacterPage/>
						<HousePage/>
						<BookPage/>
						{/* <Routes>
							<Route path='characters' element={<CharacterPage/>}>
							
							</Route>
							<Route path='houses' element={<HousePage/>}>

							</Route>
							<Route path='books' element={<BookPage/>}>
								<Route path=':id'element={<BookItem/>}/>
							</Route>
						</Routes> */}

					</Container>
				</div>
			</Router>
		)
	}
}
