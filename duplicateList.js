


function duplicateObject(cmd, localAnimFlag) {
    if (!cmd) return null; // or any other default value you wish to return
    let transformedObj;
    let secondCmd = {type: cmd.type}
    secondCmd.flagForAnim = localAnimFlag;
    // for every possible pos value of this command...
    for (let pair of [['x', 'y'], ['x1', 'y1'], ['x2', 'y2']]) {
      //pair[0] = the first spot in any array. so it can be x, x1, or x2. // pair[1] = the second spot in any array. so it can be y, y1, or y2.
      if (cmd.hasOwnProperty(pair[0]) && cmd.hasOwnProperty(pair[1])) {
        let result = [cmd[pair[0]], cmd[pair[1]]];
        secondCmd[pair[0]] = result[0];
        secondCmd[pair[1]] = result[1];
      }
    }
    transformedObj = secondCmd;
    return transformedObj;
  }