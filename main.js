// must haz comma points

var chffr_token;
var username;

function displayChffrData(data) {
  $(".comma-points-display").text(data.points);
  getLeaderboardRank(displayLeaderboardRank);
}

function displayLeaderboardRank(rank) {
  $(".leaderboard-rank-display").text(rank);
}

function getChffrData(callback) {
  $.ajax({
    url: "https://api.comma.ai/v1/me/",
    method: "GET",
    headers: {"Authorization": "JWT " + chffr_token},
    success: function(data) {
      username = data.username;
      callback(data);
    }
  });
}

function getLeaderboardRank(callback) {
  // get the html
  $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('https://beta.comma.ai/leaderboard.php') + '&callback=?', function(data){
    // parse the html
    users = $(data.contents).find(".username:not('#un2')").map(function(){
      return $(this).text()
    }).get();

    callback( users.indexOf(username) > -1 ? users.indexOf(username)+1 : "no rank :(" );
  });
}

function setup(authenticated) {
  if (authenticated) {
    $(".login").hide();
    
    chffr_token = localStorage.getItem("chffr_token");
    getChffrData(displayChffrData);
  } else {
    $(".logged-in").hide();

    $(".login-button").click(function() {
      localStorage.setItem("chffr_token", $(".chffr-token-input").val());
      location.reload();
    });
  }
}

setup(localStorage.getItem("chffr_token"));

// prevent scrolling
$("body").bind("touchmove", function(e){e.preventDefault()});