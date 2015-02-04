# node-bullethq



---------


How to use it?
---------------

````javascript

var bullethq = require("bullethq");

bullethq.initialize("Email", "API-Key", "BusinessId (if needed)");


bullethq.listAllInvoices(function(err, data) {
	if (err) { console.log(err); return false; }

	console.log(data);
});


bullethq.createClientPayment({
	    currency: "EUR",
	    amount: "500.00",
	    dateReceived: "2015-02-01",
	    clientId: 94682,
	    bankAccountId: 4562,
	    invoiceIds: [258772]
	}, function(err, data) {
		if (err) { console.log(err); return false; }

		console.log(data);
	}
);

````

Installation
============

Via [npm][]:

     $ npm install bullethq
	
As a submodule of your project

	$ git submodule add http://github.com/owenobyrne/node-bullethq.git bullethq
	$ git submodule update --init

[npm]: https://github.com/isaacs/npm
