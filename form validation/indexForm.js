function previewImg(event) {
  // Your existing previewImg function logic goes here

  // Update the label text when a file is chosen
  var input = document.getElementById("myfile");
  var label = document.getElementById("myfile-label");
  if (input.files.length > 0) {
    label.innerHTML = input.files[0].name;
  } else {
    label.innerHTML = "Select a file";
  }
}
