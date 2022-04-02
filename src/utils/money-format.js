const moneyFormat = (item) => {
    if (item) {
        return item.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    } else {
        return "-";
    }
};

export { moneyFormat }