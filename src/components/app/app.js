import React, { Component } from "react";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import CharacterPage from "../characterPage";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import gotService from '../../services/gotService'

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
			<>
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{ size: 5, offset: 0 }}>{char}</Col>
					</Row>
					<Button
						className="mb-5"
						color="primary"
						onClick={this.toggleRandomChar}>
						Toggle random character
					</Button>
					<CharacterPage />
					<Row>
						<Col md="6">
							<ItemList 
								onItemSelected={this.onItemSelected} 
								getData={this.gotService.getAllBooks}
								renderItem={(item) => item.name}/>
						</Col>
						<Col md="6">
							<CharDetails charId={this.state.selectedChar} />
						</Col>
					</Row>
					<Row>
						<Col md="6">
							<ItemList 
								onItemSelected={this.onItemSelected} 
								getData={this.gotService.getAllHouses}
								renderItem={(item) => item.name}/>
						</Col>
						<Col md="6">
							<CharDetails charId={this.state.selectedChar} />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
