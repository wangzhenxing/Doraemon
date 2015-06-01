
var co = require('co');
var Q = require('q');
var fs= require('fs');  

co(function *(){
	  // resolve multiple promises in parallel
	  var a = Promise.resolve(1);
	  var b = Promise.resolve(2);
	  var c = Promise.resolve(3);
	  var res = yield [a, b, c];
	  var file2= yield fs_readFile('test1.txt');
		console.log(file2 + '');
	//  console.log(res);
	  // => [1, 2, 3]
	}).catch(onerror);


//errors can be try/catched
co(function *(){
  try {
    yield Promise.reject(new Error('boom'));
    
  } catch (err) {
    console.error(err.message); // "boom"
 }
}).catch(onerror);

co(function *(){
  // yield any promise
//  var result = yield Promise.resolve(555);
//  console.log([result]);
//	var file1 = yield fs_readFile('test.txt');
//	console.log(file1 + '');
//	console.log('xxxxxx');
	
	
}).catch(onerror);


console.log('test');


function onerror(err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack);
}

function fs_readFile (file) {
	  var deferred = Q.defer()
	  setTimeout(function(){fs.readFile(file, function (err, data) {
		  console.log('read file:' + file);
	    if (err) deferred.reject(err) // rejects the promise with `er` as the reason
	    else deferred.resolve(data) // fulfills the promise with `data` as the value
	  })}, 5000);
	  
	  fs.readFile(file, function (err, data) {
		  console.log('read file no set time out:' + file);
//	    deferred.resolve(data);
	  });
	  
	  console.log('in file read fun end');
	  return deferred.promise;
	}



/*

var arp = require('node-arp');
var co = require('co');
var thunkify = require('thunkify');
var getMAC=thunkify(arp.getMAC);
var ipPrefix='192.168.10.';


co(function*(){
	for(var i=1;i<3;i++){
		var ip=ipPrefix+i;
		try{
			var p=yield getMAC(ip);
			console.log(ip+' ->'+p);
		}catch(e){
			console.log('excetion when find '+ip+' MAC address');
		}
	}
	
	return 'done';
});

*/