<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Timesheet</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.hotkeys.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/stylesheet.css">
	<link rel="icon" href="http://timesheet.dev/favicon.ico" type="image/x-icon" />
</head>
<body>
	
	<div class="container">
		<h1>Timesheet</h1>
		
			<div class="alert alert-info">
				<div class="alert-content">
					<h2>What does it do?</h2>
					<p>It helps me keep track of the projects I work on during the day. It uses desktop notifications to let me know it's time to write something. </p>
					<p>Data is saved to a local <a href="http://html5doctor.com/introducing-web-sql-databases/">Web SQL Database</a> hence it works only in Chrome or Safari.</p>
					<p class="only-once">To enable notifications press the button bellow (only once):</p>
					<a href="" title="" class="btn permit-notifications btn-warning only-once">Enable notifications?</a>
				</div>	
			</div>
			<a class="read-more" title="Clikc here to read more about this app" herf="#">Read more about this app</a>
		<div class="row content">
			
				<form action="">
					<fieldset>
						<label>'Sup?</label>
						<textarea name="comment" id="" cols="30" rows="10" placeholder="Ctrl+Enter to submit"></textarea>
						<button type="submit" class="right btn btn-success">Submit</button>
					</fieldset>
				</form>
			
			<div class="span6">
				<ul class="unstyled">
				</ul>
			</div>
		</div>
	</div>
</body>
</html>