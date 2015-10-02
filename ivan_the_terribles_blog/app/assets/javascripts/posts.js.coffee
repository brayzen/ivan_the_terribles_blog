
jQuery ->
  # $('.pagination').length
  $(window).scroll ->
    url = $('.pagination .next_page').attr('href')
    if url && $(window).scrollTop() > $(document).height() - $(window).height() - 50
     # $('.pagination').text("Fetching the page for you ... ")
      $.get url, (data) ->
        $(window).append(data)

  # $(window).scroll()


