document.addEventListener("DOMContentLoaded", function () {
  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([20, 0]),
      zoom: 3
    })
  });

  function loadGeoJSON(year) {
    fetch('data.geojson')
      .then(response => response.json())
      .then(data => {
        const vectorSource = new ol.source.Vector({
          features: new ol.format.GeoJSON().readFeatures(data, {
            featureProjection: 'EPSG:3857'
          })
        });

        const vectorLayer = new ol.layer.Vector({
          source: vectorSource,
          style: new ol.style.Style({
            fill: new ol.style.Fill({ color: 'rgba(255, 215, 0, 0.6)' }),
            stroke: new ol.style.Stroke({ color: '#000', width: 1 })
          })
        });

        // Remove existing vector layers
        map.getLayers().getArray().slice(1).forEach(l => map.removeLayer(l));
        map.addLayer(vectorLayer);
      });
  }

  const yearSelect = document.getElementById("year");
  yearSelect.addEventListener("change", () => loadGeoJSON(yearSelect.value));
  loadGeoJSON(yearSelect.value);
});
// Place the JavaScript logic from the previous app.js here
// NOTE: Replace this placeholder string with your app.js content manually or request regeneration.
