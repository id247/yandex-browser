<?php
    $mailto = 'bazhenov87@yandex.ru';

    $title = 'Спасибо!';

    $text = 'Наш менеджер перезвонит вам в ближайшее время';

    $error = false;

    date_default_timezone_set( 'Europe/Moscow' );

    if ( empty( $_POST ) ){         
        $title = 'Ошибка';
        $text = 'Пустой запрос';
        $error = true;
    }else{

        $d = array();
        foreach( $_POST as $key => $value ){
            $d[$key] = empty( $_POST[$key] ) ? '' : htmlspecialchars( @$_POST[$key] );
        }
        $now = date('d.m.Y, H:i');



        if (isset($d['required']) && $d['required'] != ''){
            $required = explode(',', $d['required']);

            foreach($required as $one){
                if ( $d[$one] == ''){
                    $error = true;
                }
            }
        }

        if ($error){
            $title = 'Ошибка';
            $text =  'Не все поля заполнены';
        }else{

            $headers = <<<TEXT
From: robot@{$_SERVER['HTTP_HOST']}
Reply-To: robot@{$_SERVER['HTTP_HOST']}
MIME-Version: 1.0
Content-Type: text/html;charset=utf-8
TEXT;
            $mail = <<<HTML
Привет!
<br />
<br />У вас новый лид [{$d['form']}]:
<br />
<br />Имя: <strong>{$d['name']}</strong>
<br />Телефон: <strong>{$d['phone']}</strong>
<br />E-mail: <strong>{$d['email']}</strong>
<br />Сообщение: <strong>{$d['message']}</strong>
<br />
<br />Сейчас: <strong>$now</strong>
<br />
<br />--
<br />С уважением,
<br />ваш лендинг-робот.
HTML;

            if ( mail($mailto, 'Новая заявка c ' . $_SERVER['HTTP_HOST'] . ': '.$d['form'], $mail, $headers ) ){

                if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
                
                    die('["res":"Ваш запрос отправлен! Спасибо! Наши менеджеры свяжутся с вами в ближайшее время"]');

                }

            }else{

                $title = 'Ошибка';
                $text =  'Функция mail() не поддерживается';

            }
        }
    }

    //если ошитбка и ajax
    if ( $error && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

        die('["res":"'.$text.'"]');

    }

?>

<!DOCTYPE html>
<!--[if lte IE 9]><html class="thanks lte-ie9"><![endif]-->
<!--[if gt IE 9]><!--><html class="thanks"><!--<![endif]-->
<head>
	<meta charset="utf-8">
	<title><?=$title;?></title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="viewport" content="">

	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	<link rel="icon" href="favicon.ico" type="image/x-icon">

	<!-- Стили popup -->
	<link rel="stylesheet" href="js/fancybox/jquery.fancybox.css?v=2.1.5" />

	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/style.css">

	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

</head>
<body class="thanks__body">

	<div class="thanks__content">

		<div class="thanks__box">

			<h1 class="thanks__title">
				<?=$title;?>
			</h1> <!-- end .thanks__title -->	

			<div class="thanks__text">
				<p>
					<?=$text;?>
				</p>
			</div> <!-- end .thanks__text -->

			<div class="thanks__button-placeholder">
				
				<a href="#" class="button button--yellow button--h48 button--block" onclick="history.go(-1);return false;">НА ГЛАВНУЮ</a>

			</div> <!-- end .thanks__button-placeholder -->

		</div> <!-- end .thanks__box -->
		
	
	</div> <!-- end .thanks__content -->

	<?if (!$error):?>
	
		<!-- счетчики -->

	<?endif;?>

</body>
</html>