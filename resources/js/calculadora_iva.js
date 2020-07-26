
$(document).ready(function(){
	$('.sidenav').sidenav();
    $('.parallax').parallax();

	$('.sidenav').sidenav().on('click tap', 'li a', () => {
		$('.sidenav').sidenav('close');
	});
	$("a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var target_offset = $(this.hash).offset() ? $(this.hash).offset().top : 0;
			var customoffset = 63;
			if($(window).width()<1000){ 
				var customoffset = 120;
			}
			$('html, body' ).animate({scrollTop:target_offset - customoffset}, 500);
		}
	});
});

function redondeo(cantidad){
	n= parseFloat(cantidad)
	return Number((n).toFixed(2));
}


$(function () {
	
	$("#calculado").hide();
	
	$("#upload").bind("click", function () {

		var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xml)$/;
		if (regex.test($("#fileUpload").val().toLowerCase())) {
			if (typeof (FileReader) != "undefined") {
				
				var suma_subtotal_0= 0.00;
				var suma_subtotal_1= 0.00;
				var suma_subtotal_2= 0.00;
				var suma_subtotal_4= 0.00;
				var suma_subtotal_8= 0.00;
				var suma_subtotal_13= 0.00;
				
				var suma_iva_0= 0.00;
				var suma_iva_1= 0.00;
				var suma_iva_2= 0.00;
				var suma_iva_4= 0.00;
				var suma_iva_8= 0.00;
				var suma_iva_13= 0.00;
				
				var suma_total_0= 0.00;
				var suma_total_1= 0.00;
				var suma_total_2= 0.00;
				var suma_total_4= 0.00;
				var suma_total_8= 0.00;
				var suma_total_13= 0.00;
				
				for (var i = 0; i < $("#fileUpload")[0].files.length; ++i) {
					var reader = new FileReader();
					reader.onload = function (e) {
						var xmlDoc = $.parseXML(e.target.result);
						var lineas = $(xmlDoc).find("LineaDetalle");
						var otros_cargos = $(xmlDoc).find("OtrosCargos");
						var emisor = $(xmlDoc).find("Emisor").children("Nombre").text();
						var consecutivo = $(xmlDoc).find("NumeroConsecutivo");
						
						//Add the data rows.
						$(lineas).each(function () {
							row = $("<tr />");
							
							var cell = $("<td />");
							cell.html(emisor);
							row.append(cell);
							
							var cell = $("<td />");
							cell.html(consecutivo.text());
							row.append(cell);
							
							console.log($(this));
							var cell = $("<td />");
							cell.html($(this).children("Detalle").text());
							row.append(cell);
							
							subtotal = $(this).children("SubTotal").text();
							subtotal_float= redondeo($(this).children("SubTotal").text());
							
							impuesto_neto = $(this).children("ImpuestoNeto").text();
							impuesto_neto_float= redondeo($(this).children("ImpuestoNeto").text());
							
							monto_total = $(this).children("MontoTotalLinea").text();
							monto_total_float= redondeo($(this).children("MontoTotalLinea").text());
							
							var cell = $("<td class='number_column' />");
							cell.html(subtotal);
							row.append(cell);									
							
							var cell = $("<td class='number_column' />");
							if($(this).children("Impuesto").length > 0){	
								tarifa = $(this).children("Impuesto").children("Tarifa").text();
								cell.html(tarifa);
								tarifa_int= parseInt(tarifa);							
							}
							else{
								cell.html("0.00");
								tarifa_int= parseInt("0.00");
							}
							row.append(cell);							
							
							var cell = $("<td class='number_column' />");
							cell.html(impuesto_neto);
							row.append(cell);
														
							var cell = $("<td class='number_column' />");
							cell.html(monto_total);
							row.append(cell);							
							
							var dvTable = $("#tabla_detalles_contenido");
							dvTable.append(row);
							
							
							if(tarifa_int==0){
								suma_subtotal_0 += subtotal_float;
								suma_iva_0 += impuesto_neto_float;
								suma_total_0 += monto_total_float;
							}
							if(tarifa_int==1){
								suma_subtotal_1 += subtotal_float;
								suma_iva_1 += impuesto_neto_float;
								suma_total_1 += monto_total_float;
							}
							if(tarifa_int==2){
								suma_subtotal_2 += subtotal_float;
								suma_iva_2 += impuesto_neto_float;
								suma_total_2 += monto_total_float;
							}
							if(tarifa_int==4){
								suma_subtotal_4 += subtotal_float;
								suma_iva_4 += impuesto_neto_float;
								suma_total_4 += monto_total_float;
							}
							if(tarifa_int==8){
								suma_subtotal_8 += subtotal_float;
								suma_iva_8 += impuesto_neto_float;
								suma_total_8 += monto_total_float;
							}
							if(tarifa_int==13){
								suma_subtotal_13 += subtotal_float;
								suma_iva_13 += impuesto_neto_float;
								suma_total_13 += monto_total_float;
							}
							
						});
						
						
						//Add the data rows.
						$(otros_cargos).each(function () {
							row = $("<tr />");
							
							var cell = $("<td />");
							cell.html(emisor);
							row.append(cell);
							
							var cell = $("<td />");
							cell.html(consecutivo.text());
							row.append(cell);
							
							console.log($(this));
							var cell = $("<td />");
							cell.html($(this).children("Detalle").text());
							row.append(cell);
							
							subtotal = $(this).children("MontoCargo").text();
							subtotal_float= redondeo($(this).children("MontoCargo").text());
							
							impuesto_neto = "0.00";
							impuesto_neto_float= redondeo("0.00");
							
							monto_total = $(this).children("MontoCargo").text();
							monto_total_float= redondeo($(this).children("MontoCargo").text());
							
							var cell = $("<td class='number_column' />");
							cell.html(subtotal);
							row.append(cell);									
							
							var cell = $("<td class='number_column' />");
							if($(this).children("Impuesto").length > 0){	
								tarifa = $(this).children("Impuesto").children("Tarifa").text();
								cell.html(tarifa);
								tarifa_int= parseInt(tarifa);							
							}
							else{
								cell.html("0.00");
								tarifa_int= parseInt("0.00");
							}
							row.append(cell);							
							
							var cell = $("<td class='number_column' />");
							cell.html(impuesto_neto);
							row.append(cell);
														
							var cell = $("<td class='number_column' />");
							cell.html(monto_total);
							row.append(cell);							
							
							var dvTable = $("#tabla_detalles_contenido");
							dvTable.append(row);
							
							
							if(tarifa_int==0){
								suma_subtotal_0 += subtotal_float;
								suma_iva_0 += impuesto_neto_float;
								suma_total_0 += monto_total_float;
							}
							if(tarifa_int==1){
								suma_subtotal_1 += subtotal_float;
								suma_iva_1 += impuesto_neto_float;
								suma_total_1 += monto_total_float;
							}
							if(tarifa_int==2){
								suma_subtotal_2 += subtotal_float;
								suma_iva_2 += impuesto_neto_float;
								suma_total_2 += monto_total_float;
							}
							if(tarifa_int==4){
								suma_subtotal_4 += subtotal_float;
								suma_iva_4 += impuesto_neto_float;
								suma_total_4 += monto_total_float;
							}
							if(tarifa_int==8){
								suma_subtotal_8 += subtotal_float;
								suma_iva_8 += impuesto_neto_float;
								suma_total_8 += monto_total_float;
							}
							if(tarifa_int==13){
								suma_subtotal_13 += subtotal_float;
								suma_iva_13 += impuesto_neto_float;
								suma_total_13 += monto_total_float;
							}
							
						});

						
					}
					reader.readAsText($("#fileUpload")[0].files[i]);
					reader.onloadend = function(){
						console.log("TOTAL");
						
						total = $("#tabla_suma_impuestos_contenido");
						total = $("#tabla_suma_impuestos_contenido").html("");
						row = $("<tr />");
									
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_iva_0));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_iva_1));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_iva_2));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_iva_4));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_iva_8));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_iva_13));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_iva_0+suma_iva_1+suma_iva_2+suma_iva_4+suma_iva_8+suma_iva_13));
						row.append(cell);
						
						total.append(row);
												
						total = $("#tabla_suma_subtotal_contenido");
						total = $("#tabla_suma_subtotal_contenido").html("");
						row = $("<tr />");
									
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_subtotal_0));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_subtotal_1));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_subtotal_2));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_subtotal_4));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_subtotal_8));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_subtotal_13));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_subtotal_0+suma_subtotal_1+suma_subtotal_2+suma_subtotal_4+suma_subtotal_8+suma_subtotal_13));
						row.append(cell);
						
						total.append(row);
						
						
						total = $("#tabla_suma_total_contenido");
						total = $("#tabla_suma_total_contenido").html("");
						row = $("<tr />");
									
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_total_0));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_total_1));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_total_2));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_total_4));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_total_8));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(redondeo(suma_total_13));
						row.append(cell);
						
						var cell = $("<td class='number_column' />");
						cell.html(suma_total_0+suma_total_1+suma_total_2+suma_total_4+suma_total_8+suma_total_13);
						row.append(cell);
						
						total.append(row);
					};
				}
				$("#calculado").show();
				
				
			} else {
				alert("This browser does not support HTML5.");
			}
		} else {
			alert("Please upload a valid XML file.");
		}
	});
});