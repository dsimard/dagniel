function load() {
  var a = $("<div>").append(
    $("<a>")
      .attr({href : "http://j.mp/dagniel30ansdownload",
        target : "_blank"})
      .text("Cliquez ici")
  ).append(
    $("<span>").text(" pour télécharger le mini-album gratuitement")
  );
  
  if (shouldShow())
    $.jGrowl(a.html(), { sticky: true, beforeOpen : beforeOpen, close : noShow});
    
  tumblr();
}

function beforeOpen(e, m, o) {
  e.find("a").click(function() {
    noShow();
  });
}

function noShow() {
  $("#jGrowl").fadeOut();
  document.cookie = "show=0";
}

function shouldShow() {
  return document.cookie.match(/show\=0/) == null;
}

function tumblr() {
  //$.get("http://dagniel.tumblr.com/api/read/json?callback=?", null, tumblrCallback, "json");
}

function tumblrCallback(data) {
  for(var i = 0, p; p = data.posts[i]; i++) {
    var div = $("<div>");
    console.log(p);
    
    var date = new Date(Date.parse(p.date));
    date = [date.getFullYear(), 
      date.getMonth()+1, 
      (date.getDay() < 10 ? "0" : "") + date.getDay()].join("-");
    
    div.append($("<strong>").html(date + "<br />"));
    
    if (p.type == "regular") {
      div.append(
        $("<a>").attr("href", p["url-with-slug"]).text(p["regular-title"])
      );
    } else if (p.type == "photo") {
      console.log("utl", p["photo-url-75"]);
      div.append(
        $("<a>").attr("href", p["url-with-slug"]).append(
          $("<img>").attr("src", p["photo-url-75"])
        )
      );
    } else if (p.type == "video") {
      div.html(p["video-player"]);
    } else if (p.type == "link") {
      div.append(
        $("<a>").attr("href", p["link-url"]).text(p["link-text"])
      );
    }
    
    $("#news").append(div);
  }
}
