$("#search").click(function(){
    $("#results img").remove();
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    {
      tags: $("#searchterm").val(),
      tagmode: "any",
      format: "json"
    },
    function(data) {
      $.each(data.items, function(i,item){
        $("<img/>").attr("src", item.media.m).addClass("card mb-4 box-shadow").prependTo("#results");
        $("<img/>").attr("src", item.media.m).addClass("card mb-4 box-shadow").prependTo("#results");
        if ( i == 20 ) return false;
      });
    });
  });   