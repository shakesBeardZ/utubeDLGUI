var express = require('express');
const { spawn } = require('child_process');
var app = express();


app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});


app.get('/download',function(req, res) {
	var url = req.query.url;
	console.log("url");
	console.log(url);
	const ls = spawn('youtube-dl', [url]);

	ls.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});
});

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening on http://%s:%s", host, port);
})