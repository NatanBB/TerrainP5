let columns;
let rows;
let scale = 20;
let terrain = [];
let w, h;
let flying = 0;

function setup() {
  createCanvas(1900, 1000, WEBGL);
  w = 1500;
  h = 1000;
  columns = w / scale;
  rows = h / scale;
}

function draw() {
  generateTerrain(flying);
  flying -= 0.1
  background(0);
  rotateX(PI / 3);
  noFill();
  stroke(255)
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < columns; x++) {
      vertex(x * scale, y * scale, terrain[x][y] * scale);
      vertex(x * scale, (y + 1) * scale, terrain[x][y+1] * scale);
    }
    endShape();
  }
}

function generateTerrain(yOff) {
  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < columns; x++) {
      if (!terrain[x]) terrain[x] = [];
      terrain[x][y] = map(noise(xOff, yOff), 0, 1, -8, 8);
      xOff += 0.1
    }
    yOff += 0.1
  }
}