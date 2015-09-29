var Promise = require("bluebird"),
    monk = Promise.promisifyAll(require('monk')),
    db = monk("monkeymai.oicp.net:27017/test");

/* here test simple then / done method */
//var salverP = db.get("slaver").findAsync({});
//var temp;
//salverP.then(function(data){
//    temp = data[0];
//}, function(err){
//    console.log(err);
//});

//salverP.then(function(data){
//    console.log(JSON.stringify(data[1]));
//    console.log(JSON.stringify(temp));
//    console.log("then function");
//}, function(err){
//    console.log(err);
//}).done(function(data){
//    console.log("done function");
    //console.log(JSON.stringify(data[1]));
    //console.log(JSON.stringify(temp));
//});

//salverP.done(function(data){
//    console.log("done function");
//    console.log(JSON.stringify(data[1]));
//    //console.log(JSON.stringify(temp));
//}, function(err){
//    console.log(err);
//});

 /* here test parallel action */
//var loadAll = Promise.all([
//    db.get("slaver").findAsync({slaverIP:'192.168.1.101'}),
//    db.get("job").findAsync({name:'360浏览器'})
//]);
//
//loadAll.then(function(data){
//    console.log(JSON.stringify(data));
//});

function findData(slaverQ, taskQ){
    db.get("slaver").findAsync(slaverQ).then(function(data){
        console.log(JSON.stringify(data[0]));
        taskQ.slaver = {
            slaverMAC : data[0].slaverMAC
        };
        db.get("task").countAsync(taskQ).then(function(d){
            console.log(d);
        })
    })
}

findData({slaverIP:'192.168.1.101'}, {});