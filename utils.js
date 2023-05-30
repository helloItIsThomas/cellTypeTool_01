

function buttonClicked(){
    togglePoints(listOfPoints);
  }

function keyPressed() {
    if (keyCode === BACKSPACE || keyCode === DELETE) {
      keyArray.pop();
      updateList();
    } else {
      if (key >= ' ' && key <= '~' && key != 'Shift' && key != 'Meta'
      && key != 'Alt' && key != 'Control' && key != 'Dead'
      && key != 'ArrowRight' && key != 'ArrowLeft' && key != 'ArrowUp' && key != 'ArrowDown') {
        keyArray.push(key);
        updateList();
      }
    }
    runOnceViaKeypressed();
  }

  function runOnceViaKeypressed(){
    let testSiteFromListOfPoints = [];
    listOfPoints.forEach( (e, i) => {
        if(e.x != null && e.x != undefined && i % cellDensity == 0){
            testSiteFromListOfPoints.push({x: e.x, y: e.y + pushFromTop});
        }
    })
    result = computeDiagram(testSiteFromListOfPoints, bbox);
  }

  function mousePressed() {
    // Start dragging if mouse is on a slider handle
    guiMenu.sliders.forEach(slider => {
        let handleX = slider.x + slider.value * slider.length;
        if (dist(mouseX, mouseY, handleX, slider.y) < 10) {
            slider.dragging = true;
        }
    });
}
  
function mouseReleased() {
    // Stop dragging for all sliders
    guiMenu.sliders.forEach(slider => {
        slider.dragging = false;
    });
    updateList();
    runOnceViaKeypressed();
}

function inputCheck(){
  guiMenu.buttons.forEach( e => { e.isClicked() })
  push();
  let strokeAlpha = map2(sin(frameCount * 0.098), -1.0, 1.0, 0.1, 255.0, 4, 2);
  let localStroke = color('#000000');
  localStroke.setAlpha(strokeAlpha);
  if(path.commands.length == 0){
    stroke(localStroke)
    strokeWeight(3);
    line(marginX, marginY * 6.5, marginX + contourTypeSize * 0.33, marginY * 6.5);
  }
  pop();
}

