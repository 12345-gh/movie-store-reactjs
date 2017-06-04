import $ from 'jquery';

export default {
	getRequest : (link, callback) => {
		$.getJSON(link, function (data) {
			//data is the JSON string
			console.log(data);
			callback(data);
		});
	},

};

