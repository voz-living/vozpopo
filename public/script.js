var canvas = new fabric.Canvas('canvas');
var imgCanvas = {
  "imgCanvasEyes": null,
  "imgCanvasFace": null,
  "imgCanvasBrick": null,
  "imgCanvasHair": null,
  "imgCanvasMount": null,
  "imgCanvasNose": null,
  "imgCanvasHands": null,
  "imgCanvasOthers": null
}
canvas.setBackgroundImage('icon-elements/face-default.png', canvas.renderAll.bind(canvas), {
  backgroundImageStretch: false
});
$(".icon").click(function () {
  change_element(this.parentNode.id, this.id);
});

function change_element(element, target) {
  canvas.remove(imgCanvas[element]);
  imgCanvas[element] = new fabric.Image(document.getElementById(target), {
    left: 0,
    top: 0
  });
  canvas.add(imgCanvas[element]);
}

function clear_selector() {
  canvas.deactivateAll().renderAll();
}

function clear_all() {
  canvas.clear();
}

function getDataURL() {
  canvas.deactivateAll().renderAll();
  if (!fabric.Canvas.supports('toDataURL')) {
    alert('This browser doesn\'t provide means to serialize canvas to an image');
    return false;
  } else {
    return canvas.toDataURL('png');
  }
}

function save_Img() {
  var data = getDataURL();
  if (!data) {
    window.open(data);
  }
}

function save_imgur() {

}