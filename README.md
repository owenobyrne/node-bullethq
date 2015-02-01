# node-bullethq



---------


How to use it?
---------------

````javascript

var bullethq = require("bullethq");

bullethq.initialize("XXXX-XXXX-XXXX-XXXX");

bullethq.RetrieveByAddress({address: "SW11 3LJ"}, function(err, data) {

	if (err) { console.log(err.description); return false; }

	console.log(data);
});
````

Installation
============

Via [npm][]:

     $ npm install bullethq
	
As a submodule of your project

	$ git submodule add http://github.com/owenobyrne/node-bullethq.git bullethq
	$ git submodule update --init

	