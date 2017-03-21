var React = require('react');

var Comment = React.createClass({
	render: function() {
		return (
			<div>
				<p>
					{this.props.children}
				</p>
			</div>
		);
	}
});

var Game = React.createClass({
	getInitialState: function() {
		var gameComments = this.props.route.games[this.props.params.gameId-1].comments;	
		return {
			comments: gameComments,
			inputComment: ''
		}
	},
	updateComment: function(e) {
		e.preventDefault();
		this.setState({
			inputComment: e.target.value
		})
	},
	addComment: function(e) {
		e.preventDefault();
		var theComment = this.state.inputComment;
		this.setState({
			inputComment: '',
			comments: this.state.comments.concat(theComment)
		});
	},
	render: function() {
		var curGame = this.props.route.games[this.props.params.gameId-1];

		var allGameComments = this.state.comments.map(function(curComment) {
			return (
				<div>
					<Comment>
						{curComment}
					</Comment>
				</div>
			);
		});
		
		return (
			<div className="jumbotron">
				<img className="img-responsive" src={curGame.photo}/>
				<h1>{curGame.title}</h1>
				<p>{curGame.description}</p>
				<h2>Comments</h2>
				<form onSubmit={this.addComment}>
					<input className="form-control" onChange={this.updateComment} placeholder="Your comment"/>
					<button type="submit" className="btn btn-block">Submit</button>
				</form>
				{allGameComments}
			</div>
		);
	}
});

module.exports = Game;