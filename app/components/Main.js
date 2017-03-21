var React = require('react');

var Main = React.createClass({
	render: function() {
		return (
			<div className = "container">
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				        <img alt="UIT" src="http://uitstartup.org/wp-content/uploads/2016/09/ACTUAL_UIT_LOGO.png" style={{height: 100}} />
				    </div>
				  </div>
				</nav>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Main;