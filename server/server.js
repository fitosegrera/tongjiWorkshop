var express = require('express');
var app = express();
var multipart = require('connect-multiparty');
var multiPartMiddleware = multipart();
var fs = require('fs');

// app.use('/', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.post('/stream', multiPartMiddleware, function(req, res){
	var obj = {data: null, files: null};
	obj.data = req.body;
	obj.files = req.files;
	var pathToDelete = req.files.image.path;
	console.log(req.query['id']);
	var id = req.query['id'];

	var streamRoute, imgPath, originalName;

	if(id == 'cam1'){
		imgPath = obj.files.image.path;
		streamRoute = "/uploads/" + id + "/";
		originalName = obj.files.image.originalFilename;
	}else if(id == 'cam2'){
		imgPath = obj.files.image.path;
		streamRoute = "/uploads/" + id + "/";
		originalName = obj.files.image.originalFilename;
	}else if(id == 'cam3'){
		imgPath = obj.files.image.path;
		streamRoute = "/uploads/" + id + "/";
		originalName = obj.files.image.originalFilename;
	}else if(id == 'cam4'){
		imgPath = obj.files.image.path;
		streamRoute = "/uploads/" + id + "/";
		originalName = obj.files.image.originalFilename;
	}else if(id == 'cam5'){
		imgPath = obj.files.image.path;
		streamRoute = "/uploads/" + id + "/";
		originalName = obj.files.image.originalFilename;
	}else if(id == 'cam6'){
		imgPath = obj.files.image.path;
		streamRoute = "/uploads/" + id + "/";
		originalName = obj.files.image.originalFilename;
	}else{
		console.log("ERROR: incorrect camera ID!");
	}

	saveStream(imgPath, streamRoute, originalName, pathToDelete, function(){
		res.sendStatus(200);
	});
});
 
function saveStream(imPa, sr, orNa, delPath, callback){
	fs.readFile(imPa, function(err, data){
		var newPath = __dirname + sr + orNa;
		fs.writeFile(newPath, data, function(err){
			if(err){
				console.log("ERROR: " + err);
			}else{
				callback();
				console.log("IMG saved to: " + newPath);
				fs.unlink(delPath, function(){
					console.log("TMP IMG deleted from: " + delPath);
				});
			}
		});
	});
}

app.get('/cam1', function(req, res){
	var img = fs.readFileSync('./uploads/cam1/cam1.jpg');
	res.writeHead(200, {'Content-Type': 'image/jpg'});
	res.end(img, 'binary');
});
app.get('/cam2', function(req, res){
	var img = fs.readFileSync('./uploads/cam2/cam2.jpg');
	res.writeHead(200, {'Content-Type': 'image/jpg'});
	res.end(img, 'binary');
});
app.get('/cam3', function(req, res){
	var img = fs.readFileSync('./uploads/cam3/cam3.jpg');
	res.writeHead(200, {'Content-Type': 'image/jpg'});
	res.end(img, 'binary');
});
app.get('/cam4', function(req, res){
	var img = fs.readFileSync('./uploads/cam4/cam4.jpg');
	res.writeHead(200, {'Content-Type': 'image/jpg'});
	res.end(img, 'binary');
});
app.get('/cam5', function(req, res){
	var img = fs.readFileSync('./uploads/cam5/cam5.jpg');
	res.writeHead(200, {'Content-Type': 'image/jpg'});
	res.end(img, 'binary');
});
app.get('/cam6', function(req, res){
	var img = fs.readFileSync('./uploads/cam6/cam6.jpg');
	res.writeHead(200, {'Content-Type': 'image/jpg'});
	res.end(img, 'binary');
});

app.listen(3000, function(){
	console.log("Server Listening on port 3000");
});