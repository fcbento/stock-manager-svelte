const dateFormat = (date) => {
    if(!date) return;
    return new Date(date).toLocaleDateString("en-US");
};

export { dateFormat }