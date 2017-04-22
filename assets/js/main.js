var jwToken;

function setSession(token) {
	sessionStorage.setItem('token', token);
}

function getSession() {
	return seesionStorage.getItem('token');
}

function removeSession() {
	sessionStorage.removeItem('token');
}

var gotoPage = function(url) {
	$('#errors').html('');
	$.ajax(url, {
		method: 'get',
		dataType: 'text',
		headers: {
			'Authorization': 'Bearer ' + getSession(),
		},
		success: function(html) {
			var $contentContainer = $("div#content-container");
			if ($contentContainer.has("div#content").length) {
				$('#content').html(html);
			} else {
				$('div#changePassword').remove();
				$contentContainer.prepend('<div id="content"></div>');
				$('#content').html(html);
			}
		},
		error: function(jqXHR) {
			$('#errors').html(jqXHR.responseText);
		}
	});
}

$(document).on('click', '#submitLogin', function onSubmitLogin(e){
	$('#errors').html('');
	e.preventDefault();
	$.ajax('/login', {
		method: 'post',
		contentType: 'application/json',
		processData: false,
		data: JSON.stringfy({
			email: $('input[name=eamil]').val(),
			password: 
		}),
		success: function(res) {
			if(!res.response.data) {
				$('#errors').html(res.response.message);
			} else {
				setSession(res.response.data.token);
				gotoPage('/home');
			}
		},
		error: function(jqXHR, text) {
			$('#errors').html(jqXHR.responseText);
		}
	});
});

$(document).on('click', '#logout', function(e) {
	removeSession();
	$('#errors').html('');
});

document.addEventListener("DOMContentLoaded", function(event) {
	if (!seesionStorage.getItem('token')) {

	} else {
		gotoPage('/home');
	}
});