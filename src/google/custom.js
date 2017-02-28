var markerSize = { x: 22, y: 40 };

function CustomLabel(options) {
  this.setValues(options);
  this.span = document.createElement('span');
  this.span.className = 'map-marker-label';
};

CustomLabel.prototype = new google.maps.OverlayView();

CustomLabel.prototype.draw = function() {
  var text = String(this.get('text'));
  var position = this.getProjection().fromLatLngToDivPixel(this.get('position'));
  this.span.innerHTML = text;
  this.span.style.left = (position.x - (markerSize.x / 2)) - (text.length * 3) + 10 + 'px';
  this.span.style.top = (position.y - markerSize.y + 40) + 'px';
};

CustomLabel.prototype.onAdd = function () {
  var self = this;

  this.getPanes().overlayImage.appendChild(this.span);
  this.listeners = [
    google.maps.event.addListener(this, 'position_changed', function() {
      self.draw();
    })
  ];
};

function CustomMarker(coordinate, options) {
  this.coordinate = coordinate;
  this.options = options;
  this.label = null;
};

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
    div.style.width = `${this.options.size[0]}px`;
    div.style.height = `${this.options.size[1]}px`;
    div.innerHTML = this.options.html;

    google.maps.event.addDomListener(div, "click", function(event) {
      google.maps.event.trigger(self, "click");
    });

    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }

  this.setPosition(this.coordinate);
};

CustomMarker.prototype.moveTo = function(position) {
  this.setPosition(position.get());

  return this;
}

CustomMarker.prototype.remove = function() {
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    this.div = null;
  }
};

CustomMarker.prototype.getPosition = function() {
  return this.coordinate;
};

CustomMarker.prototype.setPosition = function(coordinate) {
  this.coordinate = coordinate;

  if (this.getProjection() == undefined) {
    return;
  }

  var point = this.getProjection().fromLatLngToDivPixel(coordinate);

  if (point) {
    this.div.style.left = (point.x - this.options.size[0] + this.options.anchor[0]) + 'px';
    this.div.style.top = (point.y - this.options.size[1] + this.options.anchor[1]) + 'px';
  }

  return this;
};

CustomMarker.prototype.label = function(text, options) {
  this.label = new CustomLabel({
    map: this.map,
    marker: this,
    text: label
  });

  return this;
};

CustomMarker.prototype.hideLabel = function() {
  return this;
};

CustomMarker.prototype.showLabel = function() {
  return this;
};

export { CustomMarker, CustomLabel };
