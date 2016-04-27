(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//parallax scroll for text, operates under the assumption the first element in the "color" container is a h1
function parallaxText(name, offset){
  if ( ($(window).scrollTop() + $(window).height()) > $(name +  " > .color > h1").offset().top && $(window).scrollTop() < ( $(name).offset().top + $(name).height() )   ){
        //console.log(name + " is parallaxing");
        $(name + " > .color").children().css({bottom: String(($(window).scrollTop() + $(window).height() - $(name + "> .color > h1").offset().top)  / offset ) + "px"});
        $(name + " > .color").children().css({position: "relative"});
        
  }
}

//nav links function
function linkClick(link, anchor) {
  $(link).click(function(){
    $("body, html").animate({scrollTop: $(anchor).offset().top }, 500); //firefox needs html, chrome needs body fml
    console.log($("body").scrollTop())
  })
}

$(document).ready(function(){
  
  
  //HAMBURGER MENU//
  var hamburger_pressed = false;
  $(".hamburger-container").click(function(){
    $(".top-navbar > .navbar").slideToggle();
    
    if (hamburger_pressed == false){
      hamburger_pressed = true;
      $(this).animate({backgroundColor: "white"});
      $(".line").animate({"border-color": "#444444"});
    }
    else {
      hamburger_pressed = false
      $(this).animate({backgroundColor: "transparent"});
      $(".line").animate({"border-color": "white"});
    }
  })
  
  
  //LANDING SCREEN ALBUM TEXT HIGHLIGHTING//
  $(".album-link").mouseenter(function(){
    $(this).animate({ backgroundColor: 'white' }, { duration: 200, queue: false});
    $(this).animate({ color: 'black' }, { duration: 200, queue: false});
  });
  $(".album-link").mouseleave(function(){
    $(this).animate({ backgroundColor: 'transparent' }, { duration: 200, queue: false});
    $(this).animate({ color: 'white' }, { duration: 200, queue: false});
  });
  
  
  
  //NAVIGATION LINKS
  linkClick(".home-link", ".home-screen");
  linkClick(".about-link", ".about-screen");
  linkClick(".music-link", ".music-screen");
  linkClick(".news-link", ".news-screen");
  linkClick(".shows-link", ".shows-screen");
  linkClick(".contact-link", ".contact-screen");
  
  
$(window).resize(function(){
  //fixes the margin of the album display text on the front page if it's resized below 800px wide
  if ($(window).width() < 801){
    $(".white-screen").hide();
    
    $(".social-media-inner").css({"opacity": "1", "position" : "static"});
    
    $(".album-container").css({"opacity": "1", "margin-left" : "0px"});
    $(".album-header").css({"position": "static"});
    $(".album-link").css({"position": "static"});
  }
  else {
    $(".navbar:first").show();
    $(".social-media-inner").css({"position" : "relative"});
    
    $(".album-container").css("margin-left", "20%");
    $(".album-header").css({"position": "relative"});
    $(".album-link").css({"position": "relative"});
    

  }
  
  if ($(window).width() < 1401) {
  
  }
});
  
  
  //ONLY FOR DESKTOP over 800px
  if (/Android|BlackBerry|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) === false && ($(window).width() > 800) ) {
  
  
    //scroll stuff
    $(document).scroll(function(){
      if ($(window).width() > 801) {
        //body parallax and fade out
        
        //background position y does not work on firefox, need to get the current x position then. I would need to find a way to manipulated the input as it could be
        //0% or 63%, but i'm making the 0% 0px instead so they're both 3 characters long, shouldn't be problem with any luck.
        
        var current_body_x = $("body").css("background-position").substr(0,3); //gets current x position
        
        $("body").css({backgroundPosition: current_body_x +  " -" + String($(document).scrollTop() / 40) + "px"}) //combines x position and new y position for parallax effect
        $(".white-screen").show();
        $(".white-screen").css("opacity", 0 + $(window).scrollTop() / 550); //opacity for white screen effect
        
        //album slide up
        $(".album-header").css({bottom: String($(document).scrollTop() / 1.2 ) + "px"})
        $(".album-link").css({bottom: String($(document).scrollTop() / 2 ) + "px"})
        $(".album-container").css({opacity: String( 1 - $(document).scrollTop() / 300 )})
        
        //social media slide up
        $(".social-media-inner").css({bottom: String($(document).scrollTop() / 2 ) + "px"})
        $(".social-media-inner").css({opacity: String( 1 - $(document).scrollTop() / 300 )})
        
        
        parallaxText(".about-screen", 8);
    
  
      }
    });
    
    
    //hides elements to fade in 
    $(".album-container").css("display", "none");
    $(".social-media-inner").css("display", "none");
    $(".site-header").css("display", "none");
    $(".navbar").css("display", "none");
    $(".white-screen").css("opacity", 1); //opacity for white screen effect
    
    
    //waits until everything is fully loaded before it triggers the animations
    $(window).on("load", function(){
      
      $(".white-screen").fadeOut(450);
      //$(".white-screen").css("opacity", 0);
      //$(".white-screen").fadeIn(0)
      
      $(".site-header").fadeIn(600);
      $(".navbar").fadeIn(800);
        
    
      // album slide and fade
      
      $(".album-container").css("margin-left", "0px");
      $(".album-container").animate({ marginLeft: "20%"},{ duration: 1000, queue:false });
      $(".album-container").fadeIn(1000);
      
      // social slide and fade
      
      $(".social-media-inner").css("right", "-200px");
      $(".social-media-inner").animate({ right: "0%"},{ duration: 1300, queue:false });
      $(".social-media-inner").fadeIn(1300, function() {
      //removes the overflow hidden from the social media container so I can do the parallax stuff.
      $(".social-media").css("overflow", "initial");
      
      
    })
    });
    

  }
  
});


},{}]},{},[1]);
