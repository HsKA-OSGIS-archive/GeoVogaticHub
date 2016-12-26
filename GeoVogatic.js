var temp;
var i = 1;

//Function for button title
function button_style(temp) {
	switch(temp){
		case 'Point': 
		case 'MultiPoint':{
			while(i == 1){
				var buttonlayer = document.createElement('button');
					buttonlayer.setAttribute('class', 'layers');
					buttonlayer.innerHTML = 'Point';

				var div = document.getElementsByTagName('div')[0];
					div.appendChild(buttonlayer);
					buttonlayer.addEventListener("click", function (){
						if (temp == 'Point' || temp == 'MultiPoint' )
						{	$('#myPoint').css('display','block');
						    $('#myLine').css('display','none');
						    $('#myPolygon').css('display','none');     
						}		
						else 
							alert ("add a GeoJSON or GML");
			       });			
				i++;
					}
				break;
			};
		case 'LineString':
		case 'MultiLineString': {
			while(i == 1){
				var buttonlayer = document.createElement('button');
					buttonlayer.setAttribute('class', 'layers');
					buttonlayer.innerHTML = 'Line';

				var div = document.getElementsByTagName('div')[0];
					div.appendChild(buttonlayer);
					buttonlayer.addEventListener("click", function (){
						if ( temp == 'LineString' || temp == 'MultiLineString')
						{    $('#myPoint').css('display','none');
							 $('#myLine').css('display','block');
							 $('#myPolygon').css('display','none');
						}							 
						else 
							alert ("add a GeoJSON or GML");
					});
							
					i++;
					}
				break;
			};
		case 'Polygon':
		case 'MultiPolygon':{ 
			while(i == 1){
				var buttonlayer = document.createElement('button');
					buttonlayer.setAttribute('class', 'layers');
					buttonlayer.innerHTML = 'Polygon';

				var div = document.getElementsByTagName('div')[0];
					div.appendChild(buttonlayer);
					buttonlayer.addEventListener("click", function (){
					if ( temp == 'MultiPolygon' || temp == 'Polygon' ) 
					{        $('#myPoint').css('display','none');
							 $('#myLine').css('display','none');
							 $('#myPolygon').css('display','block');   
				    } 
					else 
						alert ("add a GeoJSON or GML");
						});				
					i++;
					}
				break;
			};
		}

}

//Default Style => give the files a default style
	var defaultStyle = {
			'Point': new ol.style.Style({
				image: new ol.style.Circle({
				fill: new ol.style.Fill({
					color: 'yellow'
						}),
				radius: 5,
				stroke: new ol.style.Stroke({
					color: '#ff0',
					width: 1
						})
					})
				}),
			'LineString': new ol.style.Style({
				stroke: new ol.style.Stroke({
				color: '#f00',
				width: 3
					})
				}),
			'Polygon': new ol.style.Style({
				fill: new ol.style.Fill({
				color: 'rgba(0,255,255,0.5)'
					}),
				stroke: new ol.style.Stroke({
				color: '#0ff',
				width: 1
					})
				}),
			'MultiPoint': new ol.style.Style({
			  image: new ol.style.Circle({
				fill: new ol.style.Fill({
				color: 'rgba(255,0,255,0.5)'
					}),
				radius: 5,
				stroke: new ol.style.Stroke({
					color: '#f0f',
					width: 1
						})
					})
				}),
			'MultiLineString': new ol.style.Style({
				stroke: new ol.style.Stroke({
				color: '#0f0',
				width: 3
						})
					}),
			'MultiPolygon': new ol.style.Style({
				fill: new ol.style.FillPattern({
					pattern: $('#pselect'),
					color: $("#color").val(),
					
					 
					}),
				stroke: new ol.style.Stroke({
				color: $ ("#bg").val(),
				width: $("#size").val()
						})
					})
				};

// Style Function => This is the link between the GeoJSON file and the default style 			  
	var styleFunction = function(feature, resolution) {			 
		return defaultStyle[feature.getGeometry().getType()];
	}; 
		
//Drag and drop Function => allows the map to load the given extensions	
    var dragAndDropInteraction = new ol.interaction.DragAndDrop({
        formatConstructors: [
			ol.format.GeoJSON,
			ol.format.GML
			]
		});

//Map => creates the map     
	var map = new ol.Map({
        interactions: ol.interaction.defaults().extend([dragAndDropInteraction]),
        layers: [
			new ol.layer.Tile({
			source: new ol.source.OSM(),
				})
			],
		controls: ol.control.defaults({
          zoom: true,
          attribution: true,
          rotate: true,
        }),	
        target: 'map',
        view: new ol.View({
          center: [0, 0],
          zoom: 2,
        })
    });
	
//  Drag and Drop interaction Function => describes how to respond once the file is dragged and dropped   
	dragAndDropInteraction.on('addfeatures', function(event) {
		i = 1;
	    button_style(event.features[0].getGeometry().getType()); // Creates a button
        var vectorSource = new ol.source.Vector({
			features: event.features
			});
        map.addLayer(new ol.layer.Vector({
			source: vectorSource,
			style: styleFunction,
			}));
        map.getView().fit(
            vectorSource.getExtent(),(map.getSize())); 


	});
// Function to call the pattern and the Refresh function: 

var refreh;
						
		$(window).load (function()
		{	// AddChar patterns
			ol.style.FillPattern.addPattern ("copy (char pattern)", { char:"©" });
			ol.style.FillPattern.addPattern ("bug (fontawesome)", { char:'\uf188', size:12, font:"10px FontAwesome" });
			ol.style.FillPattern.addPattern ("smiley (width angle)", { char:'\uf118', size:20, angle:true, font:"15px FontAwesome" });

			// Popup
			$("#select").click(function()
			{	$("#pselect").toggle();
			});

		var pat = "hatch"
		var spattern = $("#pselect");
		for (var i in ol.style.FillPattern.prototype.patterns)
		{	var p = new ol.style.FillPattern({ pattern:i })
			$("<div>").attr('title',i)
			.css("background-image",'url("'+p.getImage().toDataURL()+'")')
			.click(function(){ pat = $(this).attr("title"); refresh(); })
			.appendTo(spattern);
							}
			var p = new ol.style.FillPattern({ image: new ol.style.Icon({ src : 'pattern.png' }) });
			$("<div>").attr('title','Image (PNG)')
				.css("background-image",'url("pattern.png")')
				.click(function(){ pat = $(this).attr("title"); refresh(); })
				.appendTo(spattern);					
					 
			function refresh() {
				debugger;
				$('#pselect').hide();
				var p = new ol.style.FillPattern(
						{	pattern: pat,
							ratio: 2,
							color: '#000',
							size: Number($("#size").val()),
							spacing: Number($("#spacing").val()),
							angle: Number($("#angle").val())
						});
			$("#select").css('background-image', 'url('+p.getImage().toDataURL()+')'); 
				$('#color')
				
			};		 

					
					// this part has been removed
					//	vector.getSource().addFeature(new ol.Feature(new ol.geom.Polygon() ) );
					debugger;
					refresh();
						});
		


// This is the function for the transparency scrollbar 
		$(document).ready(function(e) {
		
			$("#myrange_point").change(function(e) {
				$("h1").html(this.value);
				$("img").css("opacity",this.value);  // this is where we'll link the layer to change the transparency for the point layer
			});
			$("#myrange_polygon").change(function(e) {
				$("h2").html(this.value);
				$("img").css("opacity",this.value);  // this is where we'll link the layer to change the transparency for the polygon layaer
			});
			$("#myrange_line").change(function(e) {
				$("h3").html(this.value);
				$("").css("opacity",this.value);  // this is where we'll link the layer to change the transparency for the line layaer
			});
		});
