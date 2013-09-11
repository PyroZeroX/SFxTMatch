function getUrlQuery()
{
	var search = '-RT #sfxtmatch';
	if(window.location.href.indexOf('?') != -1)
	{
		var terms = window.location.href.slice(window.location.href.indexOf('?') + 1).split('+');
		if (terms.length == 1 && terms[0] == "")
		{
			return search;
		}
		else
		{
			for(var i = 0; i < terms.length; i++)
			{
				if (terms[i].indexOf('@') == 0)
				{
					search += ' '+terms[i];
				}
				else search += ' #'+terms[i];
			}
			return search;
		}
	}
	else return search;
}

$(document).ready(function()
{
	$('#search').click(function()
	{
		var terms = $('#terms').val().split(' ').join('+');
		var location = "?"+terms;
		window.location = location;
	});
	$('#terms').keyup(function(e)
	{
		if(e.keyCode == 13)
		{
			var terms = $('#terms').val().split(' ').join('+');
			var location = "?"+terms;
			window.location = location;
		}
	});
});

jQuery(function($){
	var additionalSearch = getUrlQuery();
	$("#terms").val(additionalSearch.substring(15).split('#').join(''));
	$(".tweet").tweet(
		{
		  query: additionalSearch,
		  avatar_size: 48,
		  retweets: false,
		  favourites: false,
		  count: 50,
		  fetch: 50,
		  loading_text: "<img src='./img/ajax.gif' alt='loading...' /> <h2>Finding your perfect match(es)...</h2>",
		  refresh_interval: 60,
		  template: "{avatar} <h3 class='tweet_user'>@</h3>{user}<br/>{join}{text} <br/><br/> {reply_action} {retweet_action} {favorite_action} <a href='https://twitter.com/intent/user?screen_name={screen_name}' target='_blank' class='tweet_checkout'>&hearts; check out &hearts;</a> {time}"
		}
	).bind({
			loaded: function()
			{
				$(this).find("a.tweet_reply").click(function(ev) { window.open(this.href, "Reply", 'menubar=0,resizable=0,width=550,height=420,top=200,left=400'); ev.preventDefault();});
				$(this).find("a.tweet_retweet").click(function(ev) {window.open(this.href, "Retweet", 'menubar=0,resizable=0,width=550,height=420,top=200,left=400'); ev.preventDefault();});
				$(this).find("a.tweet_favourite").click(function(ev) {window.open(this.href, "Favorite", 'menubar=0,resizable=0,width=550,height=420,top=200,left=400'); ev.preventDefault();});
				$(this).find("a.tweet_hashtag").click(function(ev){
					//write an override for the tweet tags that appear
					var term = $(this).text().split("#")[1];
					var location = "?"+term;
					window.location = location;
					ev.preventDefault();
				})
				

	  		},
	  		empty: function() 
	  		{ 
	  			$(this).append("<h2>No partners found?! Foreveralone.jpg</h2>");
	  		}
	  	});
});