function colorPromise(params) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

async function TracePath(graphComponentMatrix, cycleResponse) {
    let [srcr, srcc] = cycleResponse;
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
    let response = await dfsColorTrace(
        graphComponentMatrix,
        visited,
        recStack,
        srcr,
        srcc
    );
    if (response === true) return Promise.resolve(true);

    return Promise.resolve(false);
}

async function dfsColorTrace(
    graphComponentMatrix,
    visited,
    recStack,
    crow,
    ccol
) {
    recStack[crow][ccol] = true;
    visited[crow][ccol] = true;
    let cell = document.querySelector(`.cell[rid="${crow}"][cid="${ccol}"]`);

    cell.style.backgroundColor = "lightBlue";
    await colorPromise();

    for (let i = 0; i < graphComponentMatrix[crow][ccol].length; i++) {
        let [childRow, childCol] = graphComponentMatrix[crow][ccol][i];
        if (visited[childRow][childCol] === false) {
            let response = await dfsColorTrace(
                graphComponentMatrix,
                visited,
                recStack,
                childRow,
                childCol
            );
            if (response === true) {
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
            }
        } else if (recStack[childRow][childCol] === true) {
            let currCell = document.querySelector(
                `.cell[rid="${childRow}"][cid="${childCol}"]`
            );
            currCell.style.backgroundColor = "lightsalmon";
            await colorPromise();
            currCell.style.backgroundColor = "transparent";
            await colorPromise();
            cell.style.backgroundColor = "transparent";
            await colorPromise();

            return Promise.resolve(true);
        }
    }

    recStack[crow][ccol] = false;
    return Promise.resolve(false);
}
