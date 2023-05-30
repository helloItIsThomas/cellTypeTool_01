

function updateList(){
    let prevState = path.commands.length;
    path = font.getPath(keyArray, 0, 0, contourTypeSize);
    let currentState = path.commands.length;
    let stateDif = currentState - prevState;
    updateListLoop(stateDif);
  }

  function updateListLoop(_stateDif){
    let testList = [];
    for (let i = 0; i < path.commands.length; i++) {
      if(i >= ( path.commands.length - _stateDif )){
        testList.push(duplicateObject(path.commands[i], true));
      } else testList.push(duplicateObject(path.commands[i], false));
    }
    listOfPoints = testList;
  }