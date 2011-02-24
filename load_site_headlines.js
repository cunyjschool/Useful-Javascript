/**
 * db_load_site_headlines()
 * Load the headlines from an array of website names
 */
function db_load_site_headlines(websites, div, tag) {
	var response_counter = 0;
	if ( !div ) {
		return false;
	}
	jQuery.each(websites, function(key, website) {
		if (tag) {
			var request_url = website + 'api/get_tag_posts/?count=1&slug='+tag;
		} else {
			var request_url = website + 'api/get_recent_posts/?count=1';
		}
		jQuery.ajax({
			url: request_url,
			dataType: 'jsonp',
			success: function(data) {
				var html = '';
				if ( data.status == 'ok' ) {
					html += '<h4>';
					if ( data.posts[0].author.first_name && data.posts[0].author.last_name ) {
						html += data.posts[0].author.first_name + ' ' + data.posts[0].author.last_name + ': ';
					} else if ( data.posts[0].author.first_name ) {
						html += data.posts[0].author.first_name + ': ';
					}
					html += '<a href="' + data.posts[0].url + '">' + data.posts[0].title + '</a></h4>';
					html += '<p>' + data.posts[0].excerpt + '</p>';
					jQuery(div).append(html);
					response_counter++;
					jQuery('h3 span.assignment-responses').html( response_counter );
				}
			},
		});
	});
	var response_html = '<h3><span class="assignment-responses">' + response_counter + '</span> responses</h3>';
	jQuery( div ).prepend( response_html );
} // END db_load_site_headlines()