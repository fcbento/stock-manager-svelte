import { dateFormat } from "../utils/date-format";
import { moneyFormat } from "../utils/money-format";

const tableColumns = (data, column) => {
    
    let value = data[column.name];

    if (column.isDate) {
        value = dateFormat(data[column.name]);
    }

    if (column.isObject) {
        value = data[column.name].name;
    }

    if (column.isTotal) {
        value = moneyFormat(
            column.calc(
                data[column.fieldToCalcX],
                data[column.fieldToCalcY]
            )
        );
    }

    if (column.isCurrency) {
        value = moneyFormat(data[column.name]);
    }

    return value;
};

export { tableColumns }