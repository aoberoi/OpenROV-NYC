function ControllerUI() {
  var $ui = $('.ctrl-ui');
  this.$up = $ui.find('.ctrl-up');
  this.$down = $ui.find('.ctrl-down');
  this.$left = $ui.find('.ctrl-left');
  this.$right = $ui.find('.ctrl-right');
  this.$fwd = $ui.find('.ctrl-fwd');
  this.$back = $ui.find('.ctrl-back');
}

ControllerUI.prototype.updateUI = function (payload) {
  if (payload.throttle > 0) {
    this.bright(this.$fwd);
    this.dim(this.$back);
  } else if (payload.throttle < 0) {
    this.bright(this.$back);
    this.dim(this.$fwd);
  } else {
    this.dim(this.$fwd);
    this.dim(this.$back);
  }
  if (payload.lift > 0) {
    this.bright(this.$up);
    this.dim(this.$down);
  } else if (payload.lift < 0) {
    this.bright(this.$down);
    this.dim(this.$up);
  } else {
    this.dim(this.$down);
    this.dim(this.$up);
  }
  if (payload.yaw > 0) {
    this.bright(this.$right);
    this.dim(this.$left);
  } else if (payload.yaw < 0) {
    this.bright(this.$left);
    this.dim(this.$right);
  } else {
    this.dim(this.$left);
    this.dim(this.$right);
  }
}

ControllerUI.prototype.bright = function ($el) {
  if (!$el.hasClass('bright')) {
    $el.addClass('bright');
    $el.removeClass('dim');
  }
}

ControllerUI.prototype.dim = function ($el) {
  if (!$el.hasClass('dim')) {
    $el.addClass('dim');
    $el.removeClass('bright');
  }
}
