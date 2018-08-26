import * as R from "ramda";

const MSGS = {
    LEFT_VALUE_INPUT: "LEFT_VALUE_INPUT",
    RIGHT_VALUE_INPUT: "RIGHT_VALUE_INPUT",
    LEFT_UNIT_SELECT: "LEFT_UNIT_SELECT",
    RIGHT_UNIT_SELECT: "RIGHT_UNIT_SELECT"
};

export function leftInputMsg(leftValue) {
    return {
        type: MSGS.LEFT_VALUE_INPUT,
        leftValue
    };
}

export function rightInputMsg(rightValue) {
    return {
        type: MSGS.RIGHT_VALUE_INPUT,
        rightValue
    };
}

export function leftUnitSelectMsg(leftUnit) {
    return {
        type: MSGS.LEFT_UNIT_SELECT,
        leftUnit
    };
}

export function rightUnitSelectMsg(rightUnit) {
    return {
        type: MSGS.RIGHT_UNIT_SELECT,
        rightUnit
    };
}

const toInt = R.pipe(
    parseInt,
    R.defaultTo(0)
);

function update(msg, model) {
    switch (msg.type) {
        case MSGS.LEFT_VALUE_INPUT:
            if (msg.leftValue === "") {
                return {
                    ...model,
                    sourceLeft: true,
                    leftValue: "",
                    rightValue: ""
                };
            }
            const leftValue = toInt(msg.leftValue);
            return {
                ...model,
                sourceLeft: true,
                leftValue
            };
        case MSGS.RIGHT_VALUE_INPUT:
            if (msg.rightValue === "") {
                return {
                    ...model,
                    sourceLeft: false,
                    leftValue: "",
                    rightValue: ""
                };
            }
            const rightValue = toInt(msg.rightValue);
            return {
                ...model,
                sourceLeft: false,
                rightValue
            };
        case MSGS.LEFT_UNIT_SELECT:
            return {
                ...model,
                leftUnit: msg.leftUnit
            };
        case MSGS.RIGHT_UNIT_SELECT:
            return {
                ...model,
                rightUnit: msg.rightUnit
            };

        default:
            console.log("bad message");
            return model;
    }
}

export default update;
