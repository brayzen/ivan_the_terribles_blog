# My New Blog!

I've got a lot to say, and now I have a place to say it!!!!!

Read all my amazing posts!!!!! You can load them into the app with: `rake load:blog`

Since I know you want to read them all, I designed my page to show EVERYTHING on the front page of the site!!!!!

I know it is a little slow (but totes worth it!!!!)... _Do you know how I can make it faster?_

# I'm feeling insecure...

Well, I got some requirements from marketing to make sure we distinguish between published and unpublished posts. I made some changes to the html and css.

But now security auditors are telling me I have some security vulnerabilities! They were able to use the strings below to hack my site!!!

What do I do to fix it???



XSS:
```
http://localhost:3000/posts?utf8=%E2%9C%93&search=archive&status=foo=%22bar%22%3E%3Cscript%3Ealert%28%22p0wned!!!%22%29%3C/script%3E%3Cp%20data-foo
```

SQL Injection:

```
foo%'); INSERT INTO posts (id,title,body,created_at,updated_at) VALUES (99,'hacked','hacked alright','2013-07-18','2013-07-18'); SELECT "posts".* FROM "posts" WHERE (title like 'hacked%
```

==================================================================
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
==================================================================

HERE IS WHAT I DID (Brian Ray):

1.) Implemented Strong parameters to whitelist all create and update methods for each controller

2.) Turned on the X-XSS-Protection header within the Application Controller:

class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :allow_tracking

  def allow_tracking
    response.headers['X-XSS-Protection'] = '1'
  end
end

3.)  Implemented SQL injection protection on the posts#index action by standardizing the :published params instead of :status within the views, to pass only :published.

<%= content_tag :div, "data-#{params[:published]}" => @posts.size do %>
  Number of <%= params[:published] %> results shown: <%= @posts.size if @posts %>


4.) Also implemented the ? within the post.rb model search method:

      includes(comments: :replies).where("title like ?", "%#{search}%")
