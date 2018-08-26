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

export function convertTemp(temp, unitFrom, unitTo) {
    const unitConverters = {
        Celsius: {
            Fahrenheit: convertCtoF,
            Kelvin: convertCtoK,
            Celsius: justReturnInput
        },
        Fahrenheit: {
            Celsius: convertFtoC,
            Kelvin: convertFtoK,
            Fahrenheit: justReturnInput
        },
        Kelvin: {
            Celsius: convertKtoC,
            Fahrenheit: convertKtoF,
            Kelvin: justReturnInput
        }
    };
    return unitConverters[unitFrom][unitTo](temp);
}

function justReturnInput(x) {
    return x;
}

function convertCtoF(temp) {
    return (9 / 5) * temp + 32;
}

function convertCtoK(temp) {
    return temp + 273.15;
}

function convertFtoC(temp) {
    return (5 / 9) * (temp - 32);
}

function convertFtoK(temp) {
    return convertCtoK(convertFtoC(temp));
}

function convertKtoC(temp) {
    return temp - 273.15;
}

function convertKtoF(temp) {
    return convertCtoF(convertKtoC(temp));
}

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
            const calculatedRightValue = convertTemp(
                leftValue,
                model.leftUnit,
                model.rightUnit
            );
            return {
                ...model,
                sourceLeft: true,
                leftValue,
                rightValue: calculatedRightValue
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
            const calculatedLeftValue = convertTemp(
                rightValue,
                model.rightUnit,
                model.leftUnit
            );
            return {
                ...model,
                sourceLeft: false,
                rightValue,
                leftValue: calculatedLeftValue
            };
        case MSGS.LEFT_UNIT_SELECT:
            const updatedRightValue = convertTemp(
                model.leftValue,
                msg.leftUnit,
                model.rightUnit
            );
            return {
                ...model,
                leftUnit: msg.leftUnit,
                rightValue: updatedRightValue
            };
        case MSGS.RIGHT_UNIT_SELECT:
            const updatedLeftValue = convertTemp(
                model.rightValue,
                msg.rightUnit,
                model.leftUnit
            );
            return {
                ...model,
                rightUnit: msg.rightUnit,
                leftValue: updatedLeftValue
            };

        default:
            console.log("bad message");
            return model;
    }
}

export default update;
