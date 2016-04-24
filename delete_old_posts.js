var rimraf = require('rimraf'); //deletes folders

var dir = "build/news"

  rimraf(dir, function(e){
        if(!e || (e && e.code === 'EEXIST')){
            console.log("Deleting dir " + dir + "...\n")
          
            
        } else {
            //debug
            console.log(e);
        }
    })