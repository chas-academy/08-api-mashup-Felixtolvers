$("#search").click(function(word) {
  $("#results img").remove();
  $("#synonyms a").remove();
  search($("#searchterm").val());
  words();
});

$("body").on('click', '.word', function() {
  $("#results img").remove();
  $("#synonyms a").remove();
  $("#searchterm").val($(this).text());
  search($(this).text());
  words();
});

function search(searchterm) {
  $.getJSON(
    "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    {
      tags: searchterm,
      tagmode: "any",
      format: "json"
    },
    function(data) {
      $.each(data.items, function(i, item) {
        $("<img/>")
          .attr("src", item.media.m)
          .addClass("card mb-4 box-shadow")
          .prependTo("#results");
        if (i == 20) return false;
      });
    }
  );
}

function words () {
  $.ajax({
    url:
      "http://words.bighugelabs.com/api/2/3e45ddf4a8c5e0fa4a8a70395d4b2cfc/" +
      $("#searchterm").val() +
      "/json",
    dataType: "json",
    complete: function(jqXHR, textStatus) {
      if (textStatus == "parsererror") {
        alert("404 error because no synonyms exist for this word");
      }
    },
    success: function(data) {
      let synArray = data.noun.syn;

      $.each(synArray, function(index, value) {
        $("#synonyms").append("<a class='word'>" + value + "</a>");
        if (index == 5) return false;
      });
    }
  });

}