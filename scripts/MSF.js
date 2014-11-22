function MSF() {

}

MSF.prototype.LOGIN_URL = "https://amers1.msf2.cp.reutest.com/msf/auth/login";

MSF.prototype.SERVICE_URL = "https://amers1.msf2.cp.reutest.com/msf";

MSF.prototype._cookie = null;

MSF.prototype.login = function(username, password, callback) {
	var authValue = "Basic "+btoa(username+":"+password);
	var deferred = $.ajax({
		type: "POST",
		url: this.LOGIN_URL,
		crossDomain: true,
		headers: {
			"Authorization": authValue
		}
	});
	deferred.done(function(data, status, xhr) {
		if (status == "success") {
			callback(true);
		}
	}.bind(this))
	deferred.fail(function(xhr, textStatus, errorThrown) {
		callback(false, errorThrown);
	}.bind(this));
}

MSF.prototype.getData = function(param, callback) {
	
	// if (this._cookie == null) {
	// 	callback(false, "Error: Not login yet");
	// 	return;
	// }

	var deferred = $.ajax({
		type: "POST",
		url: this.SERVICE_URL,
		headers: {
			"Content-Type": "application/json"
		},
		data: JSON.stringify(param)
	});
	deferred.done(function(data, status, xhr) {
		callback(true, data);
	});
	deferred.fail(function(xhr, textStatus, errorThrown) {
		callback(false, errorThrown);
	});	
}
