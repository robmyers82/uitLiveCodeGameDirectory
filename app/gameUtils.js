var axios = require('axios');

var getGames = function() { return axios.get('http://localhost:3000/games'); }

options = {
	getGames: function() {
		return getGames().then(function(result) {
			console.log('result.data', result.data);
			return result.data;
		}).catch(function(err) {
			console.warn('Error in getGames', err);
		})
	}
}

module.exports = options;