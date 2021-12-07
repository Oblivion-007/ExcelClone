let collectedGraphComponent = [];
let graphComponentMatrix = [];

// for (let i = 0; i < rows; i++) {
//     let graphRowCont = [];
//     for (let j = 0; j < cols; j++) {
//         graphRowCont.push([]);
//     }
//     graphComponentMatrix.push(graphRowCont);
// }

//cycle->true  noCycle->false
function isGraphCyclic(graphComponentMatrix) {
    let visited = [];
    let recStack = [];
    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let recStackRow = [];
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false);
            recStackRow.push(false);
        }
        visited.push(visitedRow);
        recStack.push(recStackRow);
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (visited[i][j] === false) {
                let response = dfsCycleDetection(
                    graphComponentMatrix,
                    visited,
                    recStack,
                    i,
                    j
                );
                if (response === true) return [i, j];
            }
        }
    }
    return null;
}

function dfsCycleDetection(
    graphComponentMatrix,
    visited,
    recStack,
    crow,
    ccol
) {
    recStack[crow][ccol] = true;
    visited[crow][ccol] = true;

    for (let i = 0; i < graphComponentMatrix[crow][ccol].length; i++) {
        let [childRow, childCol] = graphComponentMatrix[crow][ccol][i];
        if (visited[childRow][childCol] === false) {
            let response = dfsCycleDetection(
                graphComponentMatrix,
                visited,
                recStack,
                childRow,
                childCol
            );
            if (response === true) return true;
        } else if (recStack[childRow][childCol] === true) return true;
    }

    recStack[crow][ccol] = false;
    return false;
}
