$(document).ready(function() {
 //Set global variables
  var query = "";
  var queryResults = [];
//Query Wikipedia API for input value (as var query)
  function wikiSearch() {
    $.ajax({
      type: 'GET',
      crossDomain: true,
      dataType: 'json',
      url: ('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + query + '&limit=10&namespace=0&format=json&callback=?'),
      success: (function(e) {
        queryResults = e;
      }),
      complete: function() {
        //Run our loop on the queryResults
        loopResults(queryResults);
      }
    });
  }
//Define Loop that will append divs with query information
  function loopResults(a) {
    var i = 0;
    for (i = 0; i < a[1].length; i++) {
      $('#father').append('<a class="card" target="_blank" href=' + a[3][i] + '>' + '<div class="son"><h2 class="cardHead">' + a[1][i] + '</h2>' + '<br>' + '<p>' + a[2][i] + '</p></div></a>');
    }
  }
  //On Search Icon click:
  //1. Hide tooltip (important on mobile)
  //2. Hide "Click to search" text (only shown on mobile)
  //3. Add Class "Rounded-focus to prompt animation
  //4. Fade out the Search Icon, and upon completion, fade in the Close icon
  $("#searchIcon").click(function() {
    $('[data-toggle="tooltip"]').tooltip('hide');
    $('.searchMobile').css("display", "none");
    $("#search").toggleClass("rounded-focus", "rounded:focus").focus();
    $("#searchIcon").fadeOut(200, function() {
      $("#close").fadeIn(200);
    });
  });
  //On Search field blur (don't need to define close icon on.click due to Text field losing blur when clicking it anyways:
  //1. Show "Click to search" text (only shown on mobile)
  //2. Remove Class "Rounded-focus to prompt animation close
  //4. Fade out the Close Icon, and upon completion, fade in the Search icon
  $("#search").blur(function() {
    $("#search").removeClass("rounded-focus", "rounded:focus");
    $("#close").fadeOut(200, function() {
      $("#searchIcon").fadeIn(200);
      $('.searchMobile').css("display", "");
    });
  });
  //When text input is active, when enter is pressed:
  //1. Set value of text box to a variable, vall
  //2. Set our global query variable to the encodedURIcomponent of vall.
  //3. Clear all existing children divs in the #father div.
  //4. Run our wikiSearch function
  //5. Animate our main container div to have smaller margin-top
  $('#search').keypress(function(e) {
    if (e.keyCode == 13 && $('#search').val() !== "") {
      var vall = $('#search').val();
      query = encodeURIComponent(vall);
      $('#father').html("");
      wikiSearch();
      $(".container").addClass("containerUp");
    }
  });
  //Make our tooltips look nice
  $('[data-toggle="tooltip"]').tooltip();
});
