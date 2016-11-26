var exec = require('child_process').exec;
var needle = require('needle');
var onFileChange = require('on-file-change');

var id = process.argv[2];
var url = 'http://localhost:3000/stream?id=' + id;
var path = __dirname + "/data/" + id + ".jpg";

var imageData = {
	image: {
		file: path,
		content_type: 'image/jpg'
	}
};

onFileChange(path, function(){
	needle.post(url, imageData, {multipart: true}, function(err, resp, body){
		if(body == undefined){
			console.log("ERROR: calling server... retrying");
		}else{
			console.log("image sent: " + body);
		}
	});
});

var command = "raspistill --nopreview -w 600 -h 500 -co 40 -q 5 -o data/" + id + ".jpg -tl 100 -t 0 -th 0:0:0";

exec(command, function(error, stdout, stderr){
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if(error != null){
		console.log('exec error: ' + error);
	}
});
