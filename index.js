var requestify = require('requestify');

var baseURL = "https://accounts-app.bullethq.com/api/v1";
var USERNAME = "";
var PASSWORD = "";

exports.initialize = function(email, key, companyId) {
	USERNAME = email + (companyId ? ":" + companyId : "");
	PASSWORD = key;
};

exports.listAllInvoices = function(next) {

	requestify.request(baseURL + "/invoices", {
		method : "GET",
		auth : {
			username : USERNAME,
			password : PASSWORD
		},
		dataType : "json"
	}).then(function(response) {

		var body = JSON.parse(response.body);
		next(null, body);

	}).fail(function(response) {
		if (response.body) {
			var body = JSON.parse(response.body);
			next({
				code : response.code,
				type : body.type,
				message : body.message
			}, null);
		} else {
			next({
				code : response.code
			}, null);
		}

	});
};

exports.createClientPayment = function(data, next) {
	requestify.request(baseURL + "/clientPayments", {
		method : "POST",
		body : {
			currency : data.currency,
			amount : data.amount,
			dateReceived : data.dateReceived,
			clientId : data.clientId,
			bankAccountId : data.bankAccountId,
			invoiceIds : data.invoiceIds
		},
		auth : {
			username : USERNAME,
			password : PASSWORD
		},
		dataType : "json"
	})
	.then(function(response) {
		var body = JSON.parse(response.body);
		next(null, body);

	})
	.fail(function(response) {
		if (response.body) {
			var body = JSON.parse(response.body);
			next({
				code : response.code,
				type : body.type,
				message : body.message
			}, null);
		} else {
			next({
				code : response.code
			}, null);
		}
	});
};
