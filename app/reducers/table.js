let m = 4,
    n = 3,
    x = 3;

let randomInteger = function (min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

let refreshMediumColl = function (matrix) {
    matrix.mediumColl = [];
    let count = 0;

    for (; count > -1;) {

        for (let i = 0; i < matrix.data.length; i++) {
            if (matrix.data[i].data[count]) {
                if (!matrix.mediumColl[count]) {
                    matrix.mediumColl.push([]);
                }
                matrix.mediumColl[count].push(matrix.data[i].data[count].Amount);
            } else {
                count = -2;
                break;
            }

        }

        if (matrix.mediumColl[count]) {
            let sum = matrix.mediumColl[count].reduce((a, b) => a + b, 0);
            let result = sum / matrix.mediumColl[count].length;
            result = result.toFixed(1);
            matrix.mediumColl[count] = result;
        }

        count++;
    }

}

let getDefaultData = function (m, n, mediumColl = true) {
    let matrix = {
        data: [],
        mediumColl: []
    };
    let count = 1;

    for (let i = 0; i < m; i++) {
        matrix.data.push({
            data: [],
            summRow: {
                amount: 0,
                percent: 0
            }
        });

        for (let q = 0; q < n; q++) {

            let item = {
                ID: count,
                Amount: randomInteger(100, 999),
                similar: false

            }

            matrix.data[i].summRow.amount += item.Amount;
            matrix.data[i].data.push(item);

            count++;
        }
    }
    if (mediumColl) {
        refreshMediumColl(matrix);
    }
    return matrix;
}

let defaultData = getDefaultData(m, n);

let initialState = [
    defaultData,
    {
        collInput: n,
        rowInput: m,
        x: x
    }
];

let getPercent = function (state, pID, ID) {
    let summ = state[0].data[pID].summRow.amount;
    let count = state[0].data[pID].data[ID].Amount;
    let result = count / summ * 100;
    return result.toFixed(2);
}

let getSummRow = function (state, id) {
    let summRow = 0;
    for (let i = 0; i < state[0].data[id].data.length; i++) {
        summRow += state[0].data[id].data[i].Amount;
    }
    return summRow;
}

let getMediumColl = function (state, id) {
    let i;
    let sum = 0;

    for (i = 0; i < state[0].data.length; i++) {
        sum += state[0].data[i].data[id].Amount;
    }

    let result = sum / i;
    result = result.toFixed(1);
    return result;
}
let similarValues = function (state, action) {
    if (!state[0].data[1]) {
        return;
    }
    let arr = [];
    for (let i = 0; i < state[0].data.length; i++) {
        for (let q = 0; q < state[0].data[i].data.length; q++) {
            let item = state[0].data[i].data[q];
            item.pID = i;
            item.cID = q;
            arr.push(item);
        }
    }
    let val = state[0].data[action.pID].data[action.ID].Amount;

    let index = arr.findIndex((el) => {
        return el.ID === state[0].data[action.pID].data[action.ID].ID
    })
    let cur = state[1].x;
    let similar = [];
    arr.splice(index, 1)

    for (let i = 0; i < cur; i++) {

        let elem = arr.reduce(function (a, c) {
            return Math.abs(a.Amount - val) < Math.abs(c.Amount - val) ? a : c;
        })

        let index = arr.findIndex((el) => {
            return el.Amount === elem.Amount
        })
        arr.splice(index, 1)

        similar.push(elem);
    }
    return similar;
}

export default function table(state = initialState, action) {

    if (action.type === "INCREMENT") {
        let arrSimilar = similarValues(state, action.payload);
        if (arrSimilar) {
            for (let i = 0; i < arrSimilar.length; i++) {
                state[0].data[arrSimilar[i].pID].data[arrSimilar[i].cID].similar = false;
            }
        }

        state[0].data[action.payload.pID].data[action.payload.ID].Amount++

        let newSummRow = getSummRow(state, action.payload.pID);
        state[0].data[action.payload.pID].summRow.amount = newSummRow;

        let mediumColl = getMediumColl(state, action.payload.ID);
        state[0].mediumColl[action.payload.ID] = mediumColl;

        let percent = getPercent(state, action.payload.pID, action.payload.ID);
        state[0].data[action.payload.pID].summRow.percent = percent;

        let arrSimilar2 = similarValues(state, action.payload);
        if (arrSimilar2) {
            for (let i = 0; i < arrSimilar2.length; i++) {
                state[0].data[arrSimilar2[i].pID].data[arrSimilar2[i].cID].similar = true;
            }
        }

        return [
            ...state
        ]

    }
    if (action.type === "HOVER") {

        let arrSimilar = similarValues(state, action.payload);
        if (arrSimilar) {
            for (let i = 0; i < arrSimilar.length; i++) {
                state[0].data[arrSimilar[i].pID].data[arrSimilar[i].cID].similar = true;
            }
        }

        let percent = getPercent(state, action.payload.pID, action.payload.ID);
        state[0].data[action.payload.pID].summRow.percent = percent;

        return [
            ...state
        ]
    }
    if (action.type === "OF_HOVER") {
        let arrSimilar = similarValues(state, action.payload);
        if (arrSimilar) {
            for (let i = 0; i < arrSimilar.length; i++) {
                state[0].data[arrSimilar[i].pID].data[arrSimilar[i].cID].similar = false;
            }
        }

        state[0].data[action.payload.pID].summRow.percent = 0;

        return [
            ...state
        ]
    }
    if (action.type === "DELITE") {
        state[0].data.splice(action.payload.ID, 1);
        refreshMediumColl(state[0]);
        return [
            ...state
        ]
    }
    if (action.type === "ADD_ROW") {
        let indexNewRow = action.payload.index + 1;
        let colls = state[1] ? state[1].collInput : n;
        let row = getDefaultData(1, colls, false);
        state[0].data.splice(indexNewRow, 0, row.data[0])
        refreshMediumColl(state[0]);
        return [
            ...state
        ]
    }

    if (action.type === "ADD_START_DATA") {
        state[1] = {};
        state[1].collInput = action.payload.collInput;
        state[1].rowInput = action.payload.rowInput;
        state[1].x = action.payload.x;

        let data = getDefaultData(state[1].rowInput, state[1].collInput);
        state[0] = data;
        return [
            ...state
        ]
    }

    return state;
}