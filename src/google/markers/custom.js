function CustomMarker(coordinate, options) {
  this.coordinate = coordinate;
  this.options = options;
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
  var self = this;

  var div = this.div;

  if (!div) {
    div = this.div = document.createElement('div');

    if (this.options.className != undefined) {
      div.className = this.options.className;
    }

    div.style.position = 'absolute';
    div.style.cursor = 'pointer';
    div.style.width = `${this.options.iconSize[0]}px`;
    div.style.height = `${this.options.iconSize[1]}px`;
    div.innerHtml = this.options.html;

    google.maps.event.addDomListener(div, "click", function(event) {
      google.maps.event.trigger(self, "click");
    });

    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }

  var point = this.getProjection().fromLatLngToDivPixel(this.coordinate);

  if (point) {
    div.style.left = (point.x - this.options.iconSize[0]) + 'px';
    div.style.top = (point.y - this.options.iconSize[1]) + 'px';
  }
};

CustomMarker.prototype.remove = function() {
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    this.div = null;
  }
};

CustomMarker.prototype.getPosition = function() {
  return this.coordinate;
};

CustomMarker.prototype.label = function(text, options) {
  return this;
}

CustomMarker.prototype.hideLabel = function() {
  return this;
}


CustomMarker.prototype.showLabel = function() {
  return this;
}

export default CustomMarker
