<?php
	$host = isset($_GET['host']) ? $_GET['host'] : '';
	if(!empty($host)){
		$ip = @gethostbyname($host);
		echo json_encode(
			array('ip' => $ip)
		);
	}

?>
