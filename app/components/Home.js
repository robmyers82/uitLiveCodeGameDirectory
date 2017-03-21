var React = require('react');
var PropTypes = React.PropTypes;
var helpers = require('../gameUtils');

var GamePicture = React.createClass({
	render: function() {
		return (
			<img className="card-img-top img-responsive" src={this.props.photo} alt={this.props.title}/>
		);
	}
});

var GameDescriptor = React.createClass({
	propTypes: {
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
	},
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	showGame: function(gameId) {
		console.log(gameId);
		this.context.router.push('/game/' + gameId);
	},
	render: function() {
		return (
			<div>
				<h4 className="card-title">{this.props.title}</h4>
			    <p className="card-text">{this.props.text}</p>
			    <a onClick={() => this.showGame(this.props.id)} className="btn btn-primary">More Info</a>
			</div>
		);
	}
});

var GameCard = React.createClass({
	render: function() {
		return (
			<div className="col-sm-4">
				<div className="card">
				  <GamePicture photo={this.props.data.photo} title={this.props.data.title} />
				  <div className="card-block">
				  	<GameDescriptor id={this.props.data.id} title={this.props.data.title} text={this.props.data.description} />
				  </div>
				</div>
			</div>
		);
	}
});

var GamesDirectory = React.createClass({
	render: function() {
		console.log(this.props.games);
		var allGameData = this.props.games.map(function(theData) {
			return (
				<div>
					<GameCard data={theData} key={theData.id} />
				</div>
			);
		});
		return (
			<div className="row">
				{allGameData}
			</div>
		);
	}
});

var Home = React.createClass({
	getInitialState: function() {
		return {
			gamesList: [],
			loadingText: ""
		};
	},
	componentWillMount: function() {
		this.setState({
			loadingText: "Loading, please wait, this shouldn't take too long..."
		});
	},
	componentDidMount: function() {

		console.log("componentDidMount");

		setTimeout(function() {
			helpers.getGames()
				.then((function(response) {
					console.log('response = ', response);
					this.setState({
						loadingText: '',
						gamesList: response.games
					});
				}).bind(this));
			}.bind(this), 3000);

		// var gamesList = [
		// 	{
		// 		id: 1,
		// 		title: "Final Fantasy XV",
		// 		description: "Final Fantasy XV is an open world action role-playing video game developed and published by Square Enix for the PlayStation 4 and Xbox One home consoles.",
		// 		photo: "http://cdn.wegotthiscovered.com/wp-content/uploads/2016/08/Final-Fantasy-XV-Wallpaper-Pictures.jpg",
		// 		comments: []
		// 	},
		// 	{
		// 		id: 2,
		// 		title: "Doom",
		// 		description: "Doom is a first-person shooter video game developed by id Software and published by Bethesda Softworks.",
		// 		photo: "http://www.roadtovr.com/wp-content/uploads/2016/06/doom-2016-vr.jpg",
		// 		comments: ["Awesome Game!", "This game sucks"]
		// 	},
		// 	{
		// 		id: 3,
		// 		title: "Street Fighter V",
		// 		description: "Street Fighter V is a fighting video game developed by Capcom and Dimps. It is the sixth main numbered entry in the Street Fighter series.",
		// 		photo: "http://www.fightersgeneration.com/nz3/game/sf5-ryu-key-artwork.jpg",
		// 		comments: []
		// 	},
		// 	{
		// 		id: 4,
		// 		title: "NHL 17",
		// 		description: "NHL 17 lets players hit the ice for another season of hockey!",
		// 		photo: "http://multijoueur.ca/wp-content/uploads/2016/09/NHL-2017-avant-menu-933x445.jpg",
		// 		comments: []
		// 	},
		// 	{
		// 		id: 5,
		// 		title: "Rocket League",
		// 		description: "Rocket League is a vehicular soccer video game developed and published by Psyonix. The game was first released for Microsoft Windows and PlayStation 4 in July 2015, with ports for Xbox One, OS X, and Linux being released in 2016.",
		// 		photo: "http://cdn.edgecast.steamstatic.com/steam/apps/252950/header.jpg?t=1487806299",
		// 		comments: []
		// 	}
		// ];

		// setTimeout(function() {
		// 	console.log("setTimeout");
		// 	console.log(gamesList);
		// 	console.log("***");
		// 	this.setState({
		// 		games: gamesList,
		// 		loadingText: ""
		// 	});
		// }.bind(this), 2000);		
	},
	render: function() {
		console.log("state");
		console.log(this.state.gamesList);
		console.log("****");
		return (
			<div>
				<p>{this.state.loadingText} </p>
				<GamesDirectory games={this.state.gamesList}/>
			</div>
		);
	}
});

module.exports = Home;