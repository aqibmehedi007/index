//Use Strict Mode
(function($) {
  "use strict";

//Begin - Window Load
$(window).load(function(){


	//==============___Page Loader___================
  
  $('#page-loader').delay(300).fadeOut(400, function(){

  });

  $('#loader-name').addClass('loader-left');
  $('#loader-job').addClass('loader-right');
  $('#loader-animation').addClass('loader-hide');

});

//Begin - Document Ready
$(document).ready(function(){

//==============___Page Loader___================
  $('#loading-wraper').fadeIn(300);

//==============___Testimonials - owl Carousel___================
 $("#testimonial-carousel").owlCarousel({
    navigation : false, // Show next and prev buttons
    slideSpeed : 300,
    paginationSpeed : 400,      
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,
    pagination: true,
    singleItem: true,    
    navigationText: ["<span class='fa fa-chevron-left'></span>","<span class='fa fa-chevron-right'></span>"],     
  });


//==============_Map_================
$('.map').on('click', function(){
	$('.map-overlay').hide();
});

$('.map').on('mouseleave', function(){
	$('.map-overlay').show();
});

//==============_Lightbox_================
//Nivo Lightbox
  $('a.nivobox').nivoLightbox({ effect: 'fade' });


//==============___Scrollbars___================
$('.section-vcardbody').perfectScrollbar({
  wheelSpeed: 0.9
});

//==============___Menu & Pages Animation___================

var linkHome = 0;
var linkPage = '';

function pageOn(){
    $('#main-menu').addClass('main-menu-pgactive');
    $('#section-home').addClass('section-vcardbody-pgactive');    
    $('.profileActive').removeClass('profileActive');    
    $('#profile2').addClass('profileActive');
    
    linkHome = 1;
}

function pageOff(){
    $('.section-page-active').removeClass('section-page-active');
    $('#main-menu').removeClass('main-menu-pgactive');
    $('#section-home').removeClass('section-vcardbody-pgactive');
    $('.profileActive').removeClass('profileActive');
    $('#profile1').addClass('profileActive');
    linkHome = 0;
}


$(".link-page").on('click', function(event){
  event.preventDefault();
  $('.menuActive').removeClass('menuActive');  
  $(this).addClass('menuActive');
  linkPage = $(this).attr('href');
  $('.section-page-active').removeClass('section-page-active');
  $(linkPage).addClass('section-page-active');
  pageOn();
});


$(".link-home").on('click', function(event){
  event.preventDefault();

  if (linkHome == 0) {
    //pageOn();
  }
  else if (linkHome == 1) {
    $('.menuActive').removeClass('menuActive');
    $(this).addClass('menuActive');
    pageOff();
  }  
});

//==============___Blog - Ajax___================



function loadPost(){
   $.ajax({
      url: 'single.html', // URL HERE
      type: 'GET',
      success: function(html) {

        var $lis = $(html).find('#blogPost'); // Loads the content inside #blogPost div

        $("#postHere").html($lis);

        loadComments();

    }
  });
}


function loadComments() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'php/get_comments.php', true);
  xhr.onload = function() {
      if (xhr.status === 200) {
          // Parse the JSON response
          var comments = JSON.parse(xhr.responseText);
          
          // Construct HTML for each comment
          var commentsHTML = '';
          comments.forEach(function(comment) {
              commentsHTML += `
              <!-- Comment -->
              <div class="media">
                  <a class="pull-left" href="#">
                      <img class="media-object" src="${comment.profilepic}" alt="User Avatar">
                  </a>
                  <div class="media-body">
                      <h4 class="media-heading">${comment.name}
                          <small>${comment.date}</small>
                      </h4>
                      ${comment.comment}
                  </div>
              </div>
              <!-- /Comment -->
              `;
          });
          
          // Insert the comments HTML into the comments section
          document.getElementById('commentsSection').innerHTML = commentsHTML;
      } else {
          console.error('Error loading comments: ' + xhr.statusText);
      }
  };
  xhr.send();
}

  // Initial load of comments when the page loads
  window.onload = loadComments;

$(".loadPost").on('click', function(event){
  event.preventDefault();
  //$("#postHere").html('loading...');
  $('.section-page-active').removeClass('section-page-active');
  $('#page-blog-single').addClass('section-page-active');
  pageOn();
  loadPost();
});

//==============___Contact Form Validator and Ajax Sender___================
  $("#contactForm").validate({
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "php/contact-form.php",
        data: {
          "name": $("#contactForm #name").val(),
          "email": $("#contactForm #email").val(),
          "subject": $("#contactForm #subject").val(),
          "message": $("#contactForm #message").val()
        },
        dataType: "json",
        success: function (data) {
          if (data.response == "success") {
            $("#contactSuccess").fadeIn(300);
            $("#contactError").addClass("hidden");

            $("#contactForm #name, #contactForm #email, #contactForm #subject, #contactForm #message")
              .val("")
              .blur()
              .closest(".control-group")
              .removeClass("success")
              .removeClass("error");              
            
          } else {
            $("#contactError").fadeIn(300);
            $("#contactSuccess").addClass("hidden");
          }
        }

      });
    }
  });


//Modal for Contact Form
$('.modal-wrap').on('click', function(){
  $('.modal-wrap').fadeOut(300);
});   

//Mobile menu
function mobileMenu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

$('#mobile-btn').on('click', function(){
  mobileMenu();
}); 

$('#myLinks a').on('click', function(){
  mobileMenu();
}); 



//End - Document Ready
});

//End - Use Strict mode
})(jQuery);