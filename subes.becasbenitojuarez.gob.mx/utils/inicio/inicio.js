var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
function login (user,pass,tipo,recaptcha){
	$.ajax({
	  	url: 'class/inicio/inicio.php',
	  	type: 'POST',
	  	dataType: 'json',
	  	data: {user:user,pass:pass,tipo:tipo,recaptcha:recaptcha},
	  	success: function(data, textStatus, xhr) {
			grecaptcha.reset();
			$('#btn_login_alumno').prop("disabled", false);
			if(data.captcha == "NOK") {
				$('#msg_1').html(data.reason);
				$('#msg_1').show();
			} else if (data.res == 'ok') {
	    		window.location = data.url;
	    	}else{
	    		if (data.msg == '1')
	    		{
	    			$('#msg_1').html('¡Error! IP No permitida.');
					$("#txt_curp").css('border','1px solid #D0021B');
					$("#txt_pass").css('border','1px solid #D0021B');
					$('#msg_1').show();
	    		}
	    		else
	    		{
	    			if(tipo == 1)
					{
		    			$('#msg_1').html('¡Error! Usuario y/o contraseña incorrectos. Verifica tus datos.');
						$("#txt_curp").css('border','1px solid #D0021B');
						$("#txt_pass").css('border','1px solid #D0021B');
	    				$('#msg_1').show();
					}
					else
					{
	    				$('#msg_2').html('¡Error! Usuario y/o contraseña incorrectos. Verifica tus datos.');
	    				$("#txt_curp").css('border','1px solid #D0021B');
						$("#txt_pass").css('border','1px solid #D0021B');
		    			$('#msg_2').show();
					}	
	    		}
				
	    	}; 
	  	},
	  	error: function(xhr, textStatus, errorThrown) {
			$('#btn_login_alumno').prop("disabled", false);
			if(tipo == 1){
			   $('#msg_1').html('¡Error! Por el momento el sistema no est&aacute; disponible. Int&eacute;ntalo m&aacute;s tarde.');
			   $('#msg_1').show();
			}else{
			   $('#msg_2').html('¡Error! Por el momento el sistema no est&aacute; disponible. Int&eacute;ntalo m&aacute;s tarde.');
			   $('#msg_2').show();
			}
	  	}
	});	
}
function rest_contraseña(){
	$.ajax({
	  	url: 'class/inicio/recupera.php',
	  	type: 'POST',
	  	dataType: 'json',
	  	data: {c:$('#txt_curp_recupera').val(),recaptcha: $("#g-recaptcha-response-1").val()},
	  	success: function(data, textStatus, xhr) {
			grecaptcha.reset();
			$('#btn_recupera').prop("disabled", false);
			if(data.captcha == "NOK") {
				$('#msg_recupera').html(data.reason);
				$('#msg_recupera').show();
			} else if (data.res == 'ok') {
		    	$('#msg_recupera_b').html(data.reason);
		    	$('#txt_curp_recupera').val('');
				$('#msg_recupera_b').show();
				setTimeout("location.href='https://subes.becasbenitojuarez.gob.mx/'",5000);
	    	}else{
	    		$('#msg_recupera').html(data.reason);
	    		$('#msg_recupera').show();
				setTimeout("location.href='https://subes.becasbenitojuarez.gob.mx/'",5000);
	    	};
	  	},
	  	error: function(xhr, textStatus, errorThrown) {
			$('#btn_recupera').prop("disabled", false);
	    	$('#msg_recupera').html('¡Error! Por el momento tu solicitud no puede ser atendida. Inténtalo más tarde.');
			$('#msg_recupera').show();
			setTimeout("location.href='https://subes.becasbenitojuarez.gob.mx/'",5000);
	  	}
	});
}
function valida_renapo(cpx,paswd,corr){
	$.ajax({
		url: '../class/inicio/registro.php',
		type: 'POST',
		dataType: 'json',
		data: {cp:cpx,pa:paswd,co:corr,recaptcha: $("#g-recaptcha-response").val()},
		success: function(data) {
			grecaptcha.reset();
			if(data.captcha == "NOK") {
				$('#msg_m').html(data.reason);
				$('#msg_m').show();
			} else if (data.res == 'ok') {
	 			$('#msg_b').html(data.reason);
	 			$('#msg_b').show();
	 			setTimeout("location.href='../'", 3000);
			}else if (data.res == 'nok-ren'){
	 			$('#msg_m').html(data.reason);
	 			$('#msg_m').show();
	 		}else if (data.res == 'nok-email'){
		    	$('#msg_m').html(data.reason);
	 			$('#msg_m').show();
	 		}else if (data.res == 'nok-busy'){
		    	$('#msg_m').html(data.reason);
	 			$('#msg_m').show();
	 		}
		},
		error: function(xhr, textStatus, errorThrown) {
		 	$('#msg_m').html('¡Error! La conexión SEP-RENAPO está saturada. Inténtalo más tarde.');
	  	}
	});
}
function limpiar(){
	$('.vacio').html("");
	$('.vacio').hide();
	$(":input").css('border','1px solid #CCCCCC');
	$("span").css('color','#545454');	
}
$gmx(document).ready(function(){ 
	$('.vacio').hide();
	$('#modal_aviso').modal({
               keyboard: true
            });
   $('#btn_login_alumno').click(function(e){
		$('#btn_login_alumno').prop("disabled", true);
   	uid_call('sep.ses.cnbes.inicio.btn_login','clickin');
   	limpiar();
   	$('#msg_1').hide();
		e.preventDefault();
		if($("#txt_curp").val() == ""){
	      $("#txt_curp").css('border','1px solid #D0021B');
		   $('#msg_1').html('¡Error! Datos de usuario incompletos. Ingresa tu CURP');
		   $('#msg_1').show();
			$('body, html').animate({scrollTop: '100px'}, 300);
			$('#btn_login_alumno').prop("disabled", false);
		   return false;
	   }
	   if( $("#txt_pass").val() == ""){
	      $("#txt_pass").css('border','1px solid #D0021B');
	      $('#msg_1').html('¡Error! Datos de usuario incompletos. Ingresa tu contraseña');
	      $('#msg_1').show();
			$('body, html').animate({scrollTop: '100px'}, 300);
			$('#btn_login_alumno').prop("disabled", false);
	      return false;
		// }
		// /* AQUI SUSTITUYE CAOTCHA */
		// if( $("#txt_capcha").val() == ""){
		// 	$("#txt_capcha").css('border','1px solid #D0021B');
		// 	$('#txt_capcha').val('');
	    //   $('#msg_1').html('¡Error! El código no coincide. Recuerda que todas las letras deben ser mayúsculas');
	    //   $('#msg_1').show();
		// 	$('body, html').animate({scrollTop: '100px'}, 300);
		// 	$('#btn_login_alumno').prop("disabled", false);
	    //   return false;
	   }else{
	   	login($("#txt_curp").val(),$("#txt_pass").val(),1,$("#g-recaptcha-response").val());
	   	$('body, html').animate({scrollTop: '100px'}, 300);
	   }
	});
	$('#btn_recupera').click(function(e){
		$('#btn_recupera').prop("disabled", true);
		uid_call('sep.ses.cnbes.inicio.btn_recupera_contrasena','clickin');
		$('#msg_recupera').html('');
		$('#msg_recupera_b').html('');
		$('#msg_recupera').hide();
		$('#msg_recupera_b').hide();
		if ($.trim($('#txt_curp_recupera').val()).length > 17){
			e.preventDefault();
			rest_contraseña();
		}else{
			$('#msg_recupera').html('¡Error! Datos incompletos. Ingresa tu CURP');
			$('#txt_curp_recupera').css('border','1px solid #D0021B');
			$('#msg_recupera').show();
			$('#btn_recupera').prop("disabled", false);
		}
	});
	$('#link_recuperar').click(function(e){
		$('#txt_curp_recupera').val("");
		$('#msg_recupera').html('');
		$('#msg_recupera').hide();
		$('#msg_recupera_b').html('');
		$('#msg_recupera_b').hide();
		$('#txt_curp_recupera').css('border','1px solid #CCCCCC');
		// $("#txt_capcha_r").css('border','1px solid #CCCCCC');
	});
	$('#btn_registrar').click(function(e){
		uid_call('sep.ses.cnbes.registro.btn_registro','clickin');
      e.preventDefault();
      limpiar();
      var vacios="SI";
		$('#msg_m').hide();
		$('#msg_i').hide();
		$('#msg_b').hide();
		$("#datos .required").each(function (index){ 
			if($(this).val().length < 1 || $(this).val() == 0){
				$(this).css('border','1px solid #D0021B');
				idg=this.id;
				ida = "ast_"+idg.slice(4);
				idp = "p_"+idg.slice(4);
				$("#"+ida).css('color','#D0021B');
				$("#"+idp).html('Este campo es obligatorio');
				$("#"+idp).show();
				$('body, html').animate({scrollTop: '50px'}, 300);
				$('#msg_m').html("¡Error! Datos incompletos. Llene los campos obligatorios.");
				$('#msg_m').show();
				vacios="NO";
			}else{
				$(this).css("border","1px solid #CCCCCC");
			}
      }) 
      if(vacios == "SI"){
      	var mal=0;
			if ($.trim($('#txt_curp_reg').val()).length < 18){
				$("#txt_curp_reg").css('border','1px solid #D0021B');
				$("#ast_curp_reg").css('color','#D0021B');
				$("#p_curp_reg").html('CURP incorrecto');
				$("#p_curp_reg").show();
		      $('#msg_m').html('¡Error! CURP incorrecto. La CURP se compone de al menos 18 letras y n&uacute;meros.');
		      $("#txt_curp_reg").focus();
		      $('#msg_m').show();
		      $('body, html').animate({scrollTop: '50px'}, 300);
		      mal=1;
			}
			if(!emailreg.test($("#txt_mail_reg").val()) ){
				$("#txt_mail_reg").css('border','1px solid #D0021B');
		      $('#msg_m').html('¡Error! El correo no es valido. Verifica tu correo electr&oacute;nico.');
		      $("#ast_mail_reg").css('color','#D0021B');
		      $("#p_mail_reg").html('Correo no valido');
				$("#p_mail_reg").show();
				$("#txt_mail_reg").focus();
		      $('#msg_m').show();
		      $('body, html').animate({scrollTop: '50px'}, 300);
				mal=1;
			}
			if($("#txt_mail_reg").val() !=  $("#txt_mail_reg_2").val()){
				$("#txt_mail_reg").css('border','1px solid #D0021B');
				$("#txt_mail_reg_2").css('border','1px solid #D0021B');
		      $('#msg_m').html('¡Error! Los correos no coinciden. Verifica que sean iguales.');
		      $("#ast_mail_reg").css('color','#D0021B');
		      $("#ast_mail_reg_2").css('color','#D0021B');
		      $("#p_mail_reg").html('Los correos no coinciden');
				$("#p_mail_reg").show();
				$("#p_mail_reg_2").html('Los correos no coinciden');
				$("#p_mail_reg_2").show();
				$("#txt_mail_reg_2").focus();
		      $('#msg_m').show();
		      $('body, html').animate({scrollTop: '50px'}, 300);
				mal=1;
			}
			if ($('#txt_pass_reg').val().length < 6){
				$("#txt_pass_reg").css('border','1px solid #D0021B');
				$('#msg_m').html('�Error! La contrase&ntilde;a es demasiado peque&ntilde;a. El m&iacute;nimo son 6 caracteres y m&aacute;ximo 18 caracteres.');
		      $("#ast_pass_reg").css('color','#D0021B');
		      $("#p_pass_reg").html('Contraseña muy corta');
				$("#p_pass_reg").show();
				$("#p_pass_reg_2").html('Contraseña muy corta');
				$("#p_pass_reg_2").show();
		      $("#txt_pass_reg").focus();
		      $('#msg_m').show();
		      $('body, html').animate({scrollTop: '50px'}, 300);
		      mal=1;
		   }
		   if($("#txt_pass_reg").val() !=  $("#txt_pass_reg_2").val()){
				$("#txt_pass_reg_2").css('border','1px solid #D0021B');
				$("#txt_pass_reg").css('border','1px solid #D0021B');
				$('#msg_m').html('�Error! Las contrase&ntilde;as no coinciden. Verif&iacute;calas nuevamente.');
		      $("#ast_pass_reg").css('color','#D0021B');
		      $("#ast_pass_reg_2").css('color','#D0021B');
		      $("#p_pass_reg").html('Las contraseñas no coinciden');
				$("#p_pass_reg").show();
				$("#p_pass_reg_2").html('Las contrase&ntilde;as no coinciden');
				$("#p_pass_reg_2").show();
				$("#txt_pass_reg_2").focus();
		      $('#msg_m').show();
		      $('body, html').animate({scrollTop: '50px'}, 300);
				mal=1;
			}
			// if( $("#txt_capcha").val() == ""){
			// 	$("#txt_capcha").css('border','1px solid #D0021B');
			// 	$('#msg_m').html('¡Error! El código no coincide. Recuerda que todas las letras deben ser mayúsculas');
			// 	$('#msg_m').show();
			// 	$('body, html').animate({scrollTop: '50px'}, 300);
			// 	mal=1;
			// }

			if(mal == 0){
			   var cp = $('#txt_curp_reg').val();	
			   valida_renapo($('#txt_curp_reg').val(),$('#txt_pass_reg').val(),$('#txt_mail_reg').val().toLowerCase());
				$('body, html').animate({scrollTop: '50px'}, 300);
			}else{
				return false;
			}
		}
	});
	$('#btn_registrate').click(function(e){	
      window.location.href="registro";
	});	
	$('#btn_ya_registrado').click(function(e){	
      window.location.href="../";
	});
});
