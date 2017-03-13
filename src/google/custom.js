var markerSize = { x: 22, y: 40 };

function CustomLabel(options) {
  this.setValues(options);
};

CustomLabel.prototype = new google.maps.OverlayView();

CustomLabel.prototype.draw = function() {
  var span = this.span;

  if (!span) {
    span = this.span = document.createElement('span');
    span.className = this.get('className');
    span.style.display = 'none';
    span.style.position = 'absolute';

    this.getPanes().overlayImage.appendChild(span);
  }

  span.innerHTML = String(this.get('text'));

  this.setPosition(this.get('marker').getPosition());
};

CustomLabel.prototype.onAdd = function() {
  this.listeners = [
    google.maps.event.addListener(this, 'position_changed', () => {
      this.draw();
    })
  ];
};

CustomLabel.prototype.setPosition = function(coordinate) {
  var point, projection;

  if (_.isFunction(this.get('marker').getProjection))
    projection = this.get('marker').getProjection();

  if (projection == undefined || projection == null) {
    projection = this.getProjection();

    if (projection == undefined || projection == null)
      return;
  }

  point = projection.fromLatLngToDivPixel(coordinate);

  if (point && this.span != null) {
    this.span.style.left = point.x + 'px';
    this.span.style.top = point.y + 'px';
  }
};

CustomLabel.prototype.hide = function() {
  this.span.style.display = 'none';
};

CustomLabel.prototype.show = function() {
  this.span.style.display = 'block';
}

function CustomMarker(coordinate, options) {
  this.coordinate = coordinate;
  this.options = options;
};

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
  var div = this.div;

  if (!div) {
    div = this.div = document.createElement('div');

    if (this.options.className != null) {
      div.className = this.options.className;
    }

    div.style.position = 'absolute';
    div.style.display = 'block';
    div.style.cursor = 'pointer';
    div.style.width = `${this.options.size[0]}px`;
    div.style.height = `${this.options.size[1]}px`;
    div.innerHTML = this.options.html;

    google.maps.event.addDomListener(div, "click", (event) => {
      google.maps.event.trigger(this, "click");
    });

    google.maps.event.addDomListener(div, "mouseenter", (event) => {
      google.maps.event.trigger(this, "mouseover");
    });

    google.maps.event.addDomListener(div, "mouseout", (event) => {
      google.maps.event.trigger(this, "mouseout");
    });

    this.getPanes().overlayImage.appendChild(div);
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

  if (point && this.div != null) {
    this.div.style.left = (point.x - this.options.anchor[0]) + 'px';
    this.div.style.top = (point.y - this.options.anchor[1]) + 'px';
  }
};


CustomMarker.prototype.hide = function() {
  this.div.style.display = 'none';

  return this;
};

CustomMarker.prototype.show = function() {
  this.div.style.display = 'block';

  return this;
};

google.maps.Marker.prototype.hide = function() {
  this.setVisible(false);

  return this;
};

google.maps.Marker.prototype.show = function() {
  this.setVisible(true);

  return this;
};

export { CustomMarker, CustomLabel };
