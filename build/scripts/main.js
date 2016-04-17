(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function(){
  $(".hamburger-container").click(function(){
    $(".navbar").slideToggle();
  })
  
  $(".album-link").mouseenter(function(){
    $(this).animate({ backgroundColor: 'white' }, { duration: 200, queue: false});
    $(this).animate({ color: 'black' }, { duration: 200, queue: false});
  });
  $(".album-link").mouseleave(function(){
    $(this).animate({ backgroundColor: 'transparent' }, { duration: 200, queue: false});
    $(this).animate({ color: 'white' }, { duration: 200, queue: false});
  });
  
  
  $("i").mouseenter(function(){
    $(this).animate({ color: '#444444' }, { duration: 200, queue: false});
  })
  $("i").mouseleave(function(){
    $(this).animate({ color: 'white' }, { duration: 200, queue: false});
  });
  
 if (/Android|BlackBerry|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) === false) {

    $(document).scroll(function(){
      $("body").css({backgroundPosition: "0px -" + String($(document).scrollTop() / 7) + "px"})
      $(".home-screen").css({ backgroundColor: 'rgba(0, 0, 0, 0.' + String($(document).scrollTop() / 100)  + ');' });
      //background-color:rgba(0, 0, 0, 0.32);
      // $(this).animate({ color: '#444444' },
      
    });
  }
  
});
},{}]},{},[1]);
