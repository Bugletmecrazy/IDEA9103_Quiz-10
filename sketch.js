var song;
var fft;
var button;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound("sample-visualisation.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);
  angleMode(DEGREES);

  button = createButton("Play");
  button.mousePressed(toggleSong);

  button.position(windowWidth / 2 - 150, windowHeight / 2 - 25);

  button.style("background-color", "transparent");
  button.style("border", "none");
  button.style("outline", "none");
  button.style("cursor", "pointer");
  button.style("color", "#F2FF00");
  button.style("font-size", "30px");
  button.style("width", "300px");
  button.style("height", "50px");
  button.style("font-weight", "900");

  fft = new p5.FFT(0.8, 64);
}

function draw() {
  background(0);
  var spectrum = fft.analyze();

  noStroke();
  translate(width / 2, height / 2);

  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 180, 360);
    var amp = spectrum[i];
    var r = map(amp, 0, 256, 150, 200);

    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(i * 1.2, 255, 255);

    line(0, 0, x, y);
    line(x * 1.2, y * 1.2, x * 1.06, y * 1.06);
    strokeWeight(3.5);
  }

  circle(0, 0, 300);
  fill(0);

  if (song.isPlaying()) {
    button.html("Pause");
  } else {
    button.html("Play");
  }
}
