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