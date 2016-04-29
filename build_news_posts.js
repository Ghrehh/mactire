var fs = require('fs'); //file reading and writing stuff
var rimraf = require('rimraf'); //deletes folders

var data = require('./posts.json').posts; //json data

var template_dir = "source/templates";
var post_template = template_dir +  "/post_template.html"; //holds the location of the template, then gets reused to hold its contents when its opened
var index_template = template_dir + "/index_template.html";
var partial_template = template_dir + "/partial_template.html";

var dir = "source/pages/news"; //directory name
var preview_number = 3; //how man posts show up in the preview partial
var preview_text_length = 300; //how long the preview text should be

var partial_path = "source/pages/partials"; //where to place the partial




//Asynchroncity makes this a pain in the butt



// use rimraf to delete the posts directory, ensuring that any test/deleted posts are actually removed 
function deleteDir(){
    rimraf(dir, function(e){
        if(!e || (e && e.code === 'EEXIST')){
            console.log("Deleting dir " + dir + "...\n")
            makeDir(); //have to call this from here to ensure the delete function gets called first
            
        } else {
            //debug
            console.log(e);
        }
    })
    
}


//it then calls the funtion to make the new directory
function makeDir(){

    fs.mkdir(dir,function(e){
        if(!e || (e && e.code === 'EEXIST')){
            console.log("Making dir " + dir + "...\n")
            readPost();
        } else {
            //debug
            console.log(e);
        }
    });

}


//read the html templates

function readPost(){
   fs.readFile(post_template, 'utf8', function(err, results){
        post_template = results;
        readIndex();
    
    }) 
}

function readIndex(){
    fs.readFile(index_template, 'utf8', function(err, results){
        index_template = results;
        readPartial()
    })
    
}

function readPartial(){
    fs.readFile(partial_template, 'utf8', function(err, results){
        partial_template = results;
        makePages();
        
    })
    
}


//replaces the placeholders with the relevant deets from the json file
//this is horribly inefficient and uses 3 seperate loops
function makePages(){
    
    if (data.length > 0) {
    
    //pages
      for (i = 0; i < data.length; i++){
        var post = data[i];
        
        var post_template_temp = post_template;
        
        post_template_temp = post_template_temp.replace("{{TITLE}}", post.title);
        console.log(post.title)
        post_template_temp = post_template_temp.replace("{{DATE}}", post.date);
        console.log(post.date)
        post_template_temp = post_template_temp.replace("{{BODY}}", post.body);
        console.log(post.body)
        
        makePost(post_template_temp, i);
        
      }
      
      //index
      var links = "";
      
      for (i = 0; i < data.length; i++){
        
          
          var url = "./" + String((data.length) - i) + ".html";
          var name = data[(data.length - 1) - i].title;
          
          var link = '<li>\n\
          <a href="' + url + '">' + name + "</a>\n\
          <p>" + data[(data.length - 1) - i].date + "</p>\n\
          </li>\n\n"
          links = links.concat(link)
      }
      
      index_template = index_template.replace("{{LINKS}}", links);
      makeIndex(index_template);
      
      
      //partial
      
      var completed_partial = "";
      
      
      
      if (preview_number > data.length) { //checks to see if there's less the the max preview number before looping
        preview_number = data.length
      }
      
      for (i = 0; i < preview_number; i++){
          
        var html = partial_template;
        var post = data[(data.length - 1) - i]; //only the most recent specified number
        var url = "news/" + String((data.length) - i) + ".html";
        
        post.body = post.body.replace(/<a\b[^>]*>/i,"").replace(/<\/a>/i, "");
        post.body = post.body.replace(/(?:\r\n|\r|\n)/g, ' '); //remove newlines
        post.body = post.body.replace("<b>", '');
        post.body = post.body.replace("</b>", '');
        html = html.replace("{{TITLE}}", post.title);
        html = html.replace("{{DATE}}", post.date);
        if (post.body.length > 150) {
          html = html.replace("{{BODY}}", post.body.substr(0, preview_text_length - 3) + "...");
        }
        else {
          html = html.replace("{{BODY}}", post.body.substr(0, preview_text_length ));
        }
        html = html.replace("{{LINK}}", url);
        
        var completed_partial = completed_partial.concat(html + "\n");
  
      }
      
      makePartial(completed_partial);
      
    }
    else {
       makeIndex("<p>There are no news posts yet!<p>");
       makePartial("<p>There are no news posts yet!<p>");
    }
}


//creates the page for each json post, using the index + 1 as the title (so it shows up as dirName/1.html)
function makePost(contents, index){
    fs.writeFile(dir + "/" + String(index + 1) + ".html", contents, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log(String(index + 1) + ".html created");
    });
}

function makeIndex(contents){
    fs.writeFile(dir + "/index.html", contents, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log( "index.html created");
    });
}

function makePartial(contents){
    fs.writeFile(partial_path + "/post_partial.html", contents, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log( "partial created");
    });
}


//call to first function in chain
deleteDir();
