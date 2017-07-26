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
canvas.setBackgroundImage('public/icon-elements/face-default.png', canvas.renderAll.bind(canvas), {
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
  if (data !== false) {
    window.open(data);
  }
}

function save_imgur() {
  var form = new FormData();
  var data = getDataURL();
  if (data === false) return;
  data = data.substr(21);
  form.append("image", data);
  form.append("title", "Popo Vozer Icon");
  form.append("description", "#voz_living_popo creation at " + new Date().getTime());
  
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.imgur.com/3/image",
    "method": "POST",
    "headers": {
      "authorization": "Client-ID c7ae784606967cc"
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
  }

  $("#imgur_link").html('Uploading ...');
  $("#btnUpload").attr("disabled", true);

  $.ajax(settings).done(function (response) {
    $("#btnUpload").attr("disabled", false);
    if (typeof response === "string") response = JSON.parse(response);
    var link = response.data.link;
    var a = $('<a href="' + link + '" target="_blank">' + link + '</a>')
    $("#imgur_link").empty();
    $("#imgur_link").append(a);
  });
}