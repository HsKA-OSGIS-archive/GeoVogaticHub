var temp;
var i = 1;
a=0;

var vectorSourceObj = {}; // to keep track of vectorSource
var layerObj = {}; // to keep track of layer
var clickedID;

// to close the dropdown menu
function hide(target) {
    document.getElementById(target).style.display = 'none';
}

//Function for button title
function button_style(temp,id) {
	switch(temp){
		case 'Point':
		case 'MultiPoint':{
			while(i == 1){
				var buttonlayer = document.createElement('button');
					buttonlayer.setAttribute('class', 'layers');
					buttonlayer.innerHTML = 'Point';
					buttonlayer.id = id;
					
					$("buttonlayer").click(function() {
						var $this = $(this);
						if ($this.hasClass("clicked-once")) {
							// already been clicked once, hide it
							$this.hide();
						}
						else {
							// first time this is clicked, mark it
							$this.addClass("clicked-once");
						}
					});
				var div = document.getElementsByTagName('div')[0];
					div.appendChild(buttonlayer);
					buttonlayer.addEventListener("click", function (e){						

					//to keep track of the button clicked & zooming to location
						clickedID = e.srcElement.id;
					    map.getView().fit(
					    vectorSourceObj[clickedID].getExtent(),(map.getSize()));
						
						if (temp == 'Point' || temp == 'MultiPoint' )
						{	$('#myPoint').css('display','block');
						    $('#myLine').css('display','none');
						    $('#myPolygon').css('display','none');
						}
					});

					//window.layer.setStyle(style);
			//remove button and function
				var remove = document.createElement('button');
					remove.setAttribute('class', 'remo');
					remove.innerHTML = 'X';
					remove.id = id + "-rmv";
				var div = document.getElementsByTagName('div')[0];
					div.appendChild(remove);
					remove.addEventListener("click", function (e){
						
						var list=document.getElementsByClassName("remo");
							list = [].slice.call(list); 
						var a = list.indexOf(remove);
							console.log(a);
							
						delete vectorSourceObj[e.srcElement.id.split("-")[0]];
						delete layerObj[e.srcElement.id.split("-")[0]];
												
						map.removeLayer(map.getLayers().item(a+1));
						$( ".layers" )[a].remove();
						$(".remo")[a].remove();
						$("#myPoint").hide();
						
						
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
					buttonlayer.id = id;

				var div = document.getElementsByTagName('div')[0];
					div.appendChild(buttonlayer);
					buttonlayer.addEventListener("click", function (e){
						
						//to keep track of the button clicked.
						clickedID = e.srcElement.id;
						map.getView().fit(
					    vectorSourceObj[clickedID].getExtent(),(map.getSize()));
						
						if ( temp == 'LineString' || temp == 'MultiLineString')
						{    $('#myPoint').css('display','none');
							 $('#myLine').css('display','block');
							 $('#myPolygon').css('display','none');
						}
						});

			//remove button and function	
				var remove = document.createElement('button');
					remove.setAttribute('class', 'remo');
					remove.innerHTML = 'X';
					remove.id = id + "-rmv";
				var div = document.getElementsByTagName('div')[0];
					div.appendChild(remove);
					remove.addEventListener("click", function (e){
						var list=document.getElementsByClassName("remo");
							list = [].slice.call(list); 
						var a = list.indexOf(remove);
							console.log(a);
							
						delete vectorSourceObj[e.srcElement.id.split("-")[0]];
						delete layerObj[e.srcElement.id.split("-")[0]];
						
						map.removeLayer(map.getLayers().item(a+1));
						$( ".layers" )[a].remove();
						$(".remo")[a].remove();
						$("#myLine").hide();
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
					buttonlayer.id = id;

				var div = document.getElementsByTagName('div')[0];
					div.appendChild(buttonlayer);
					buttonlayer.addEventListener("click", function (e){
						
					//to keep track of the button clicked.
						clickedID = e.srcElement.id;	
					    map.getView().fit(
					    vectorSourceObj[clickedID].getExtent(),(map.getSize()));
						
					if ( temp == 'MultiPolygon' || temp == 'Polygon' )
					{        $('#myPoint').css('display','none');
							 $('#myLine').css('display','none');
							 $('#myPolygon').css('display','block');
				    }
					else
						alert ("add a GeoJSON or GML");
						});
						
				//remove button and function
					var remove = document.createElement('button');
						remove.setAttribute('class', 'remo');
						remove.innerHTML = 'X';
						remove.id = id + "-rmv";
					var div = document.getElementsByTagName('div')[0];
						div.appendChild(remove);
						remove.addEventListener("click", function (e){
						var list=document.getElementsByClassName("remo");
							list = [].slice.call(list); 
						var a = list.indexOf(remove);
						console.log(a);
						
						delete vectorSourceObj[e.srcElement.id.split("-")[0]];
						delete layerObj[e.srcElement.id.split("-")[0]];
						
						map.removeLayer(map.getLayers().item(a+1));
						$( ".layers" )[a].remove();
						$(".remo")[a].remove();
						$("#myPolygon").hide();
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
					color: $('#pcolor').val(),
					}),
				radius: $('#psize').val(),
				stroke: new ol.style.Stroke({
					color: $('#polc').val(),
					width: $('#pwidth').val(),
						})
					})
				}),
			'LineString': new ol.style.Style({
				stroke: new ol.style.Stroke({
				color: $('#Lcolor').val(),
				width: Number($('#Lwidth').val())
					}),
				}),
			'Polygon': new ol.style.Style({
				fill: new ol.style.Fill({
					color: $('#color').val(),
					}),
				stroke: new ol.style.Stroke({
				color: $ ("#bg").val(),
				width: $("#size").val()
					})
				}),
			'MultiPoint': new ol.style.Style({
			  image: new ol.style.Circle({
				fill: new ol.style.Fill({
				color: $('#pcolor').val(),
					}),
				radius: $('#spize').val(),
				stroke: new ol.style.Stroke({
					color: $('#polc').val(),
					width: $('#pwidth').val(),
						})
					})
				}),
			'MultiLineString': new ol.style.Style({
				stroke: new ol.style.Stroke({
				color: $('#Lcolor').val(),
				width: $('#Lwidth').val()
						}),
					}),
			'MultiPolygon': new ol.style.Style({
				fill: new ol.style.Fill({
					color: $('#color').val(),
					
					}),
				stroke: new ol.style.Stroke({
				color: $ ("#bg").val(),
				width: $("#size").val()
						})
					})
				};
				var buttonText;
// Style Function => This is the link between the GeoJSON file and the default style
	var styleFunction = function(feature, resolution) {
		return defaultStyle[feature.getGeometry().getType()];
	};

//Drag and drop Function => allows the map to load the given extensions
    var dragAndDropInteraction = new ol.interaction.DragAndDrop({
        formatConstructors: [
			ol.format.GeoJSON,
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
		var id = makeid();

		//window.features = event.features;
	    button_style(event.features[0].getGeometry().getType(),id); // Creates a button
        vectorSourceObj[id] = new ol.source.Vector({
			features: event.features
			});
		layerObj[id] =new ol.layer.Vector({
			source: vectorSourceObj[id],
			style: styleFunction,
			});
        map.addLayer(layerObj[id]);
        map.getView().fit(
            vectorSourceObj[id].getExtent(),(map.getSize()));


	});

//Help window function
        $(function () {
            $("#dialog").dialog({
                modal: true,
                autoOpen: false,
                title: "Help Window",
                width: 300,
                height: 250
            });
            $("#HelpWind").click(function () {
                $('#dialog').dialog('open');
            });
        });


// function to change the style of polygons 
	function updateStyle(){
				
				
		  		var polystroke = new ol.style.Stroke ({
					color : $('#bg').val(),
					width: $('#size').val()
				});					
				var polystyle = new ol.style.Fill ({
					color: $('#color').val()
				});
				
				
				var style = new ol.style.Style({
					fill: polystyle,
					stroke: polystroke,
				});
					

               layerObj[clickedID].setStyle(style);
				
               map.getView().fit(
               vectorSourceObj[clickedID].getExtent(),(map.getSize()));

	}; 
// function to change the style of points
	function updatePoint() {
		var ppfill = new ol.style.Fill ({
			color : $('#pcolor').val()
		});
		
		var ppstroke = new ol.style.Stroke ({
			color : $('#polc').val(),
			width: $('#pwidth').val()
		});
		
		var pp = new ol.style.Circle ({
				fill : ppfill,
				
		
				radius: $('#psize').val(),
				stroke : ppstroke,
		});

		var style = new ol.style.Style({
			image: pp,
		});
		layerObj[clickedID].setStyle(style);
		map.getView().fit(
        vectorSourceObj[clickedID].getExtent(),(map.getSize()));
	}; 
// function to change the style of lines	
	function updateLine() {
		
		var linestyle = new ol.style.Stroke ({
				color: $('#Lcolor').val(),
				width:Number( $('#Lwidth').val()),
				});
		
		var style3 = new ol.style.Style ({
			stroke: linestyle,
		});
		linestyle,
		
		layerObj[clickedID].setStyle(style3);
		map.getView().fit(
        vectorSourceObj[clickedID].getExtent(),(map.getSize()));
	};
	
	
// to make random id 
function makeid()
{
	var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
