var requestify = require('requestify');

var baseURL = "https://accounts-app.bullethq.com/api/v1";
var USERNAME = "";
var PASSWORD = "";

exports.initialize = function(email, key, companyId) {
	USERNAME = email + (companyId ? ":" + companyId : "");
	PASSWORD = key;
};

exports.listAllInvoices = function(next) {
	get("/invoices", next);
};

exports.listAllBankAccounts = function(next) {
	get("/bankAccounts", next);
};

exports.createClientPayment = function(data, next) {
	post("/clientPayments", {
			currency : data.currency,
			amount : data.amount,
			dateReceived : data.dateReceived,
			clientId : data.clientId,
			bankAccountId : data.bankAccountId,
			invoiceIds : data.invoiceIds
		}, next);
};

var get = function(endpoint, next) {
	requestify.request(baseURL + endpoint, {
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
			var body;
			try{
				body = JSON.parse(response.body);
				
			}catch(e){
				// the body isn't JSON - perhaps it was a 404?
				next({
					code : response.code
				}, null);
			}
			
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

var post = function(endpoint, data, next) {
	requestify.request(baseURL + endpoint, {
		method : "POST",
		body : data,
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
			var body;
			try{
				body = JSON.parse(response.body);
				
			}catch(e){
				// the body isn't JSON - perhaps it was a 404?
				next({
					code : response.code
				}, null);
			}

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