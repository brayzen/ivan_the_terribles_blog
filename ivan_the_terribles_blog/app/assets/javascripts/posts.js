(function() {
  jQuery(function() {
    return $(window).scroll(function() {
      var docHeight = $(document).height() - $(window).height() - 70
      var url = $('.pagination a.next_page').attr('href');
      console.log($(window).scrollTop());
      if (url && $(window).scrollTop() > docHeight) {
        // $('.pagination').text("Fetching the page for you ... ");
        var url = $('.pagination a.next_page').attr('href');
        return $.get(url, function(data) {
          post = $('body').html(data)
          console.log(post)
          return $(window).append(post);
        });
      }
    });
  });

}).call(this);
