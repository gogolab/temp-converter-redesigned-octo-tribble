import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import {
    leftInputMsg,
    rightInputMsg,
    leftUnitSelectMsg,
    rightUnitSelectMsg
} from "./Update";

const { div, h1, pre, input, select, option } = hh(h);

const units = ["Celsius", "Fahrenheit", "Kelvin"];

function unitOptions(selectedUnit) {
    return units.map(unit =>
        option({ value: unit, selected: unit === selectedUnit }, unit)
    );
}

function unitSection(dispatch, unit, value, inputMsg, selectMsg) {
    return div({ className: "w-50 ma1" }, [
        input({
            type: "text",
            className: "w-100",
            value,
            oninput: e => dispatch(inputMsg(e.target.value))
        }),
        select(
            {
                className: "w-100",
                onchange: e => {
                    dispatch(selectMsg(e.target.value));
                }
            },
            [unitOptions(unit)]
        )
    ]);
}

function view(dispatch, model) {
    return div({ className: "mw6 center" }, [
        h1({ className: "f2 pv2 bb" }, "Temperature Unit Converter"),
        div({ className: "flex" }, [
            unitSection(
                dispatch,
                model.leftUnit,
                model.leftValue,
                leftInputMsg,
                leftUnitSelectMsg
            ),
            unitSection(
                dispatch,
                model.rightUnit,
                model.rightValue,
                rightInputMsg,
                rightUnitSelectMsg
            )
        ]),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;
