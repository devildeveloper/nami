window.storage; //localstorage
window.uuid;
// window.socket =  io.connect('http://tdt.ap01.aws.af.cm/tdt') || io.connect('http://localhost:3000/tdt') ;
// configuracion del entorno
function verifica_Perfil(){
	if(localStorage.getItem('user')==null){
		window.user={};//datos para el usuario
		// configuracion de los datos del usuario
		window.user.name='Rocky';
		window.user.email='email@email.com';
		window.user.photo='img/user.jpg';
		localStorage.user=JSON.stringify(user);
	}
}
function verifica_Listas(){
	if(localStorage.getItem('listas') == null){		
		var listas=[];
		storage.listas=JSON.stringify(listas);
	}
}
function carga_Listas(){	
	if(localStorage.getItem('listas') != null){			
		var listas=JSON.parse(storage.listas);
		var len=listas.length;
		if(len > 0)	{
			var ul=$("#ul");	
			ul.html("");
			var htmlToken=""		;
			for(var i=0;i<len;i++){
				htmlToken +="<li data-icon='delete'><a >"+listas[i]+"</a></li>";							
			}//fin del for					
			ul.append(htmlToken);
			if ( $('#ul').hasClass('ui-listview')) { 
				$('#ul').listview('refresh'); 
			} else { 
				$('#ul').trigger('create'); 
			} 
		}else{
			$("#ul").html('<h2>No hay listas creadas</h2>');
		}
	}
}
function nueva_Lista(lista){
	var listasToken=JSON.parse(storage.listas);
	listasToken.push(lista);
	storage.listas=JSON.stringify(listasToken);
	carga_Listas();
}
function elimina_Lista(item){
	var m=confirm(' ¿Desea eliminar esta tarea ? ');
	if(m){
		var listasToken=JSON.parse(storage.listas);		
		var ubi=listasToken.indexOf(item);
		listasToken.splice(ubi,1)
		storage.listas=JSON.stringify(listasToken);
		carga_Listas();
	}
}
function loadData () {
	var user_Img=document.getElementById('user_Img');
	var user_Name=document.getElementById('user_Name');
	var user_Email=document.getElementById('user_Email');
	user_Img.setAttribute('src',JSON.parse(localStorage.user).photo);
	user_Name.textContent=JSON.parse(localStorage.user).name;
	user_Email.textContent=JSON.parse(localStorage.user).email;
}
// definimos el objeto global user para no tener problemas
function updateName(name){
	if((typeof name) == 'undefined'){
		return false;
	}else{
		var userToken=JSON.parse(localStorage.user);
		userToken.name=name;
		localStorage.user=JSON.stringify(userToken);
	}	
}
function updateEmail(email){
	if((typeof email) == 'undefined'){
		return false;
	}else{
		var userToken=JSON.parse(localStorage.user);
		userToken.email=email;
		localStorage.user=JSON.stringify(userToken);
	}	
}
function updatePhoto(photo){
	if((typeof photo) == 'undefined'){
		return false;
	}else{
		var userToken=JSON.parse(localStorage.user);
		userToken.photo=photo;
		localStorage.user=JSON.stringify(userToken);
	}
}
// function share(){
// 	var list=JSON.parse(localStorage.listas);
// 	var user=JSON.parse(localStorage.user);
// 	socket.emit('share',{list:list,user:user,uuid:window.uuid});
// 	socket.on('exito',function (data){
// 		console.log(data)
// 	})
// }
$(document).on('ready',init);
	function init(){
		try {
		    if (localStorage.getItem) {
		        storage = localStorage;
		    }
		} catch(e) {
		    storage = {};
		}
		//cargamos la lista de tareas
		(function(){
			verifica_Listas();
			verifica_Perfil()
			carga_Listas();
			loadData();			
		})()
		$("form").on("submit",function(e){
			e.preventDefault();
			nueva_Tarea();
		})
		$(".alert").on("click",function(e){
			e.preventDefault();
			var new_list=prompt("Ingrese el nombre de la nueva tarea.")
			if( new_list != null ){
				if(new_list != ""){
					nueva_Lista(new_list);
				}
			}			
		})
		$("#ul").delegate("li a","click",function (argument) {
			argument.preventDefault();
		 	var nombre=$(this).text();
			// alert(nombre)	
			// var c=confirm("44",¿Desea eliminar esta tarea ?");
			// if(c){
				elimina_Lista(nombre);
			// }			
		})
		$("#cname").on("click",function(e){
			e.preventDefault();
			var nombre=prompt("Ingresa tu nombre");
			if( nombre != null ){
				if(nombre != ""){
					updateName(nombre);
					loadData();
				}
			}
		});
		$("#cemail").on("click",function(e){
			e.preventDefault();
			var nombre=prompt("Ingresa tu correo");
			if( nombre != null ){
				if(nombre != ""){
					updateEmail(nombre);
					loadData();
				}
			}
		});		
		// $("input[type='file']").on("change",function(){
		// 	var t = $(this).val();
		// 	if( t != null ){
		// 		if(t != ""){
		// 			updatePhoto(t);
		// 			loadData();
		// 		}
		// 	}
		// });	
		// $(".share").on("click",function(e){
		// 	e.preventDefault();
		// 	$.ajax({
		// 		url:"http://localhost:3000/share/it",
		// 		type:'GET',
		// 		data:{list:JSON.parse(localStorage.user)}
		// 	}).success(function (data){
		// 		console.log(data);
		// 	})
		// });		
		var token={
			name:JSON.parse(localStorage.user).name,
			email:JSON.parse(localStorage.user).email,
			list:JSON.parse(localStorage.listas)
		}
		$(".share").attr('href','http://localhost:3000/share:'+JSON.stringify(token))
			//return false;
			
			// $(this).attr(
			// return true;
		//sss})
		function handleFileSelect(evt) {
    		var files = evt.target.files; // FileList object
		    // Loop through the FileList and render image files as thumbnails.
		    for (var i = 0, f; f = files[i]; i++) {
		      // Only process image files.
				if (!f.type.match('image.*')) {
		        	continue;
				}
     			var reader = new FileReader();
	    		// Closure to capture the file information.
	    		reader.onload = (function(theFile) {
	        		return function(e) {
	        		// Render thumbnail.
		        		//var span = document.createElement('span');
		        		//span.innerHTML = ['<img class="thumb" src="', e.target.result,
		                //            '" title="', escape(theFile.name), '"/>'].join('');
		        		//document.getElementById('list').insertBefore(span, null);
		        		var user_Img=document.getElementById('user_Img');		        		
		        		var tokenL=JSON.parse(localStorage.user);
		        		tokenL.photo=e.target.result;
						user_Img.setAttribute('src',tokenL.photo);
						localStorage.user=JSON.stringify(tokenL);
						
	        		};
	    		})(f);
	      		// Read in the image file as a data URL.
	     		reader.readAsDataURL(f);
    		}
		}
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
		// socket.on('welcome',function(data){
		// 	window.uuid=data.uuid;
		// 	$(".twitter-share-button").attr('data-url','http://www.namina.com/share:'+window.uuid);
		// 	$(".twitter-share-button").attr('data-text','Revisa aqui mi lista de actividades');
		// 	var list=JSON.parse(localStorage.listas);
		// 	var user=JSON.parse(localStorage.user);
		// 	socket.emit('share',{list:list,user:user,uuid:window.uuid});
		// 	socket.on('exito',function (data){
		// 		console.log(data);
		// 		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
		// 	})
		// })
}