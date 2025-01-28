// src/helpers/datafilterHelper.js
export const countItems = {
    getValue: function (node) {
        return node.innerHTML;
    },
    setValue: function (node, value) {
        node.innerHTML = value;
    },
    refresh: function (node, value) {
        node.innerHTML = value;
    },
    render: function (data) {
        return `${'Total Items'} ${data.count()}`;
    },
};
