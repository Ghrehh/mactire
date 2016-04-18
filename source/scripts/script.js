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
  
  
  //SOCIAL MEDIA ICONS HIGHLIGHTING
  $("i").mouseenter(function(){
    $(this).animate({ color: '#444444' }, { duration: 200, queue: false});
  })
  $("i").mouseleave(function(){
    $(this).animate({ color: 'white' }, { duration: 200, queue: false});
  });
  
  if (/Android|BlackBerry|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) === false) {
  
    $(document).scroll(function(){
      //body parallax and fade out
      
      //background position y does not work on firefox, need to get the current x position then. I would need to find a way to manipulated the input as it could be
      //0% or 63%, but i'm making the 0% 0px instead so they're both 3 characters long, shouldn't be problem with any luck.
      
      var current_body_x = $("body").css("background-position").substr(0,3); //gets current x position
      
      $("body").css({backgroundPosition: current_body_x +  " -" + String($(document).scrollTop() / 40) + "px"}) //combines x position and new y position for parallax effect
      $(".black-screen").css("opacity", 0 + $(window).scrollTop() / 550); //opacity for white screen effect
      
      //album slide up
      $(".album-header").css({bottom: String($(document).scrollTop() / 1.2 ) + "px"})
      $(".album-link").css({bottom: String($(document).scrollTop() / 2 ) + "px"})
      $(".album-container").css({opacity: String( 1 - $(document).scrollTop() / 300 )})
      
      //social media slide up
      $(".social-media-inner").css({bottom: String($(document).scrollTop() / 2 ) + "px"})
      $(".social-media-inner").css({opacity: String( 1 - $(document).scrollTop() / 300 )})
      
      if ( ($(window).scrollTop() + $(window).height()) > $(".about-screen > .color > h1").offset().top ){
        console.log("poop")
        $(".about-screen > .color > h1").css({bottom: String(($(window).scrollTop() + $(window).height() - $(".about-screen > .color > h1").offset().top)  / 8 ) + "px"})
        $(".about-screen > .color > p").css({bottom: String(($(window).scrollTop() + $(window).height() - $(".about-screen > .color > p").offset().top)  / 8 ) + "px"})
        
      }
  
  
  
    });
    
    
    // album slide and fade
    $(".album-container").css("display", "none");
    $(".album-container").css("margin-left", "0px");
    $(".album-container").animate({ marginLeft: "20%"},{ duration: 1000, queue:false });
    $(".album-container").fadeIn(1000);
    
    // social slide and fade
    $(".social-media-inner").css("display", "none");
    $(".social-media-inner").css("right", "-200px");
    $(".social-media-inner").animate({ right: "0%"},{ duration: 1300, queue:false });
    $(".social-media-inner").fadeIn(1300, function() {
      
      //removes the overflow hidden from the social media container so I can do the parallax stuff.
      $(".social-media").css("overflow", "initial");
    });
    

  }
  
});

