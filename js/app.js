//notify object, src: 0xfe.muthanna.com/notifyme.html

function Notifier() {}

// Returns "true" if this browser supports notifications.
Notifier.prototype.HasSupport = function() {
  if (window.webkitNotifications) {
    return true;
  } else {
    return false;
  }
}

// Request permission for this page to send notifications. If allowed,
// calls function "cb" with true.
Notifier.prototype.RequestPermission = function(cb) {
  window.webkitNotifications.requestPermission(function() {
    if (cb) { cb(window.webkitNotifications.checkPermission() == 0); }
  });
}

// Popup a notification with icon, title, and body. Returns false if
// permission was not granted.
Notifier.prototype.Notify = function(icon, title, body) {
    if (window.webkitNotifications.checkPermission() == 0) {
    	var popup = window.webkitNotifications.createNotification(icon, title, body);
    	popup.show();
        return true;
    }
  	return false;
}

var App = {
	init: function(config){
		this.config = config;
		this.bindEvents();
		this.startDb();
		this.readDb();
		this.notifications();
	},
	notifications: function(){
		var nc = new Notifier;
		
		if (nc.HasSupport() ){
			$('.alert-info').hide();
			setInterval(function(){
				var date = new Date();
				var hours = date.getHours();
				var minutes = date.getMinutes();

				(hours < 10) ? hours = '0'+ hours : hours = hours;
				(minutes < 10) ? minutes = '0'+ minutes : minutes = minutes;

				if (hours == 12 && minutes == 00){
					nc.Notify('','Timesheet', 'Completeaza timesheet-ul');
				}
				if (hours == 16 && minutes == 00){
					nc.Notify('','Timesheet', 'Completeaza timesheet-ul');
				}

				if (hours == 17 && minutes == 45){
					nc.Notify('','Timesheet', 'Completeaza timesheet-ul');
				}

			}, 60000);
		}
	},
	startDb: function(){
		this.db = openDatabase('timesheet', '1.0', 'my first database', 2 * 1024 * 1024);
		this.db.transaction(function (tx) {
			//tx.executeSql('drop table timesheet');
		  	tx.executeSql('CREATE TABLE IF NOT EXISTS timesheet (id INTEGER PRIMARY KEY AUTOINCREMENT, data datetime , text varchar(255))');
		  	
		});
	},
	readDb:function () {
		var self = App;
		self.db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM timesheet', [], function (tx, results) {
				var len = results.rows.length, i;
				var $ul = $('ul');
				
				//console.log(results.rows.item(0));
				for (i = 0; i < len; i++) {
					var $li = $('<li>');
					$li.attr('class','clearfix');
					
					var $date = $('<strong>').html(results.rows.item(i).data);
					var $description = $('<span>').html(results.rows.item(i).text);
					
					$li.append($date);
					$li.append($description);
					$ul.prepend($li);

					//alert(results.rows.item(i).text);
				}
			});
		});
	},
	bindEvents: function(){
		var self = App;
		$('button.btn').on('click', this.onSubmit);
		$('a.permit-notifications').on('click', this.onNotificationRequest);
		$('textarea').bind('keydown','ctrl+return', this.onSubmit);
	},
	onSubmit: function(e){
		var self = App;
		var $textarea = $('textarea');
		var content = $textarea.val();
		var date = new Date();
		var year = date.getFullYear().toString();
		var month = date.getMonth()+1;
		var day = date.getDate().toString();
		var hours = date.getHours();
		var minutes = date.getMinutes();

		(hours < 10) ? hours = '0'+ hours : hours = hours;
		(minutes < 10) ? minutes = '0'+ minutes : minutes = minutes;

		if (month < 10) {
			month = '0' + month.toString();
		}
		if (day < 10) {
			day = '0' + day;
		}
		var dateString = day + '/' + month + '/' + year + ' at ' + hours + ':' + minutes;
		
		//validate textarea
		if (content === ''){
			alert('Please fill in the textbox with a status');
			return false;
		}

		//prepend information to list
		var $ul = $('ul');
		var $li = $('<li>');
		$li.attr('class','clearfix');

		var $date = $('<strong>').html(dateString);
		var $description = $('<span>').html(content);
		
		//clear textarea
		

		//append information
		$li.append($date);
		$li.append($description);
		$ul.prepend($li);
		$textarea.val('');

		//save to database
		self.db.transaction(function (tx) {
			tx.executeSql('INSERT INTO timesheet ( data, text) VALUES (?,?)', [dateString , content]);
		});

		e.preventDefault();
	},
	onNotificationRequest: function(e){
		var self = App;
		var nc = new Notifier;
		nc.RequestPermission();

		e.preventDefault();

	}
}
jQuery(document).ready(function(){
	App.init();
});