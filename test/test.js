var bullethq = require("./../index");

bullethq.initialize("xxxxxxxxxxxxx@XXX.xxx", "xxxxxxxxxxxxxxx", "xxxx");

bullethq.listAllInvoices(function(err, data) {
	if (err) { console.log(err); return false; }

	console.log(data);
});

bullethq.listAllBankAccounts(function(err, data) {
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
