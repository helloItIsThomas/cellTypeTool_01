
let font;
let fontData;
let path;
let newX, newY;
let listOfPoints;
let fillCol, backCol;
let keyArray = [];
let dia;
let contourTypeSize;
let globalTypeBool;
let result;
let marginX, marginY;
let W, H;
var sites;
var bbox;
var voronoi;
let glyphPointList;
let voronoiPointList;
let pushFromTop;
let letVoronoiDraw;
let cellDensity;
let showSites;
let horizontalOffset;
let verticalOffset;
let textX;
let textY;
let siteTween;
let siteSize;
let siteSizes;

function preload() {
  dia =  loadFont('data/S-Medium.otf');
  reg =  loadFont('data/S-Regular.otf');
  med =  loadFont('data/S-Medium.otf');
  bold =  loadFont('data/S-Bold.otf');
  black =  loadFont('data/S-Black.otf');
  fontData = loadBytes('data/diatype.ttf');
}

function setup() {
  dupList = [];
  letVoronoiDraw = true;
  cellDensity = 1;
  pushFromTop = 200;
  fillCol = 0;
  backCol = 255;
  contourTypeSize = 180;
  marginY = 50;
  marginX = 50;
  W = windowWidth - marginX * 2;
  H = windowHeight - marginY * 2;
	createCanvas(windowWidth, windowHeight);

  horizontalOffset = width * 0.5;
  verticalOffset = 400;

  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath("", 0, 0, contourTypeSize);
  globalTypeBool = false;
  listOfPoints = [];
  updateListLoop();
  voronoi = new Voronoi();
  sites = [{x:0.0, y:0.0}];
  bbox = {xl:0, xr:W, yt:0, yb:pushFromTop * 1.25 + (marginY * 0.5)};
  result = computeDiagram(sites, bbox);
  runOnceViaKeypressed();
  showSites = false;
  glyphPointList = []
  voronoiPointList = []
  guiMenu.setupSliders();
  siteSize = {d: 0};
  siteSizes = [];
  
  for(let i = 0; i < 900; i++) {
    siteSizes.push({d: 0});
  }
  siteTween = gsap.to(siteSizes, { d: 3, stagger: {
    each: 0.001,
    from: "random",
  }, ease: "power2.inOut", paused: true});
}

function draw() {
  
  background(backCol);
  textFont(med);
  fill(fillCol);
  noStroke();
  push();
  translate(marginX, marginY);
  drawText();
  textSize(22);
  textX = 0;
  textY = verticalOffset;
  text(keyArray.join(''), textX, textY * 0.77);
  if (keyIsDown(BACKSPACE)) {
    keyArray.pop();
    updateList();
  }
  drawVoronoi();
  pop();
  guiMenu.update();
  guiMenu.render();
  inputCheck();
}

function drawText(){
  push();
  translate(0, pushFromTop);
  noFill();
  let strokeFill = color(fillCol);
  strokeFill.setAlpha(guiMenu.txtAlpha);
  stroke(strokeFill);
  drawContours(groupByContour(listOfPoints));
  pop();
}

function computeDiagram(_sites, _bbox){
  return voronoi.compute(_sites, _bbox);
}

function drawVoronoi(){
  if(letVoronoiDraw){
    push();
  fill(0,0,255);
  if(showSites){
    result.cells.forEach( (c,i ) => {
      circle(c.site.x, c.site.y, siteSizes[i].d);
    });
  }
  fill(255,0,0)
  result.vertices.forEach( c => {
    // circle(c.x, c.y, 4);
  });
  stroke(fillCol);
  noFill();
  result.edges.forEach( c => {
    // line(c.va.x, c.va.y, c.vb.x, c.vb.y)
  });

// 
  result.edges.forEach( c => {
    let midX = (c.va.x + c.vb.x) / guiMenu.curveAmt;
    let midY = (c.va.y + c.vb.y) / guiMenu.curveAmt;
  
   // calculate the distance (length) between the points
    let length = Math.sqrt(Math.pow(c.vb.x - c.va.x, 2) + Math.pow(c.vb.y - c.va.y, 2));
    let displacement = length / guiMenu.curveIntensity;  // adjust this factor to change the curvature
  
    // use the length to adjust the control points
    bezier(c.va.x, c.va.y, midX + displacement, midY + displacement, midX - displacement, midY - displacement, c.vb.x, c.vb.y);
  });
  pop();
  }
}


