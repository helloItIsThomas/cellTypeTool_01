

class MySlider {
    constructor(x, y, length, value) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.value = value; // slider value between 0 and 1
        this.targetValue = value;
        this.dragging = false;
    }
    render() {
        noFill();
        stroke(fillCol);
        strokeWeight(1);
        strokeCap(ROUND);
        line(
            this.x,
            this.y,
            this.x + this.length,
            this.y
        );
        if (this.dragging) {
          fill(0);
          this.targetValue = constrain((mouseX - this.x) / this.length, 0, 1);
        } else {
          fill(0);
        }
        this.value = lerp(this.value, this.targetValue, 0.05);

        let handleX = this.x + this.value * this.length;
        noStroke();
        ellipse(handleX, this.y, 14, 14);
    }
}

class MyButton {
    constructor(x, y, width, height, text, i) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.text = text;
      this.index = i;
      this.round = {r: 5};
      this.myFill = {r: 255, g: 255, b: 255};
      this.tweenCol = gsap.to(this.myFill, {duration: 0.15, r: 0, g: 0, b: 0, ease: "power2.in", paused: true}); 
      this.tweenRound = gsap.to(this.round, {duration: 0.15, r: 10, ease: "power2.in", paused: true});
    }
  
    isMouseOver() {
      // Check if mouse is over the button
      if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
        this.tweenRound.play();
        return true;
      }
      this.tweenRound.reverse();
      return false;
    }
  
    render() {
      // Draw the button
      if (this.clicked && this.index == 0 || this.pressed) {
        this.tweenCol.play();
      } else {
        this.tweenCol.reverse();
      }
      fill(this.myFill.r);
      stroke(fillCol);
      rect(this.x, this.y, this.width, this.height, this.round.r);
      
      // Draw the text
      noFill();
      fill(0);
      noStroke();
      text(this.text, this.x * 1.55, this.y + this.height * 0.75);
    }
    

    isClicked() {
        // Check if the button is clicked
        if (this.isMouseOver() && mouseIsPressed) {
          if (!this.pressed) {
            this.clicked = !this.clicked;
            this.pressed = true;
            if(this.index == 0){
                showSites = !showSites;
                if(showSites) {
                  siteTween.play();
                }
                else if(!showSites) {
                  siteTween.reverse();
                }
            } else if(this.index == 1){
                save("mySVG.svg"); // give file name
                print("saved svg");
            }
          }
        } else {
          this.pressed = false;
        }
      }
  
    handleClick() {
      // Perform some action when the button is clicked
      if (this.isMouseOver()) {
        return true
      }
    }
  }
  

const guiMenu = {
    posX: 50,
    posY: 50,
    w: 100,
    h: 100,
    curveAmt: 2.01,
    curveIntensity: 8,
    txtAlpha: 255,
    buttons: [
        new MyButton(0, 0, 20, 20, "SHOW VORONOI SITES", 0),
    ],
    sliders: [
        new MySlider(0, 0, 200, 0.0),
        new MySlider(0, 0, 200, 0.5),
        new MySlider(0, 0, 200, 1.0)
    ],
    setupSliders: function() {},      
    displaySliderValues: function() {},
    update: function() {
        this.sliders.forEach(( slider, i ) => {
            slider.x = marginX;
            slider.y = verticalOffset;
            if ( i == 0 ){
                slider.y += 25;
                this.txtAlpha = map(slider.value, 0.0, 1.0, 0.0, 255.0);
            } else if ( i == 1 ){
                slider.y += 75;
                this.curveIntensity = map(slider.value, 0.0, 1.0, 2.0, 15.0);
            } else if ( i == 2 ){
                slider.y += 125;
                cellDensity = int(map(slider.value, 0.0, 1.0, 20, 1));
            }
            slider.render();
        });
    },
    render: function() {
        textFont(med);
        text("REFERENCE TEXT OPACITY", marginX, verticalOffset);
        text("CELL CURVE", marginX, verticalOffset + marginY);
        text("CELL DENSITY", marginX, verticalOffset + marginY * 2);
        this.sliders.forEach(slider => {
            slider.render();
        });
        this.buttons.forEach(button => {
            button.x = marginX;
            if(button.index == 0){
                button.y = verticalOffset + 150;
            }
            button.render();
        });
    }
};
