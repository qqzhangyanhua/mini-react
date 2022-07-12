import React from './react';
// let element = (<button id="button" >
// say hello
// <b>helloF</b>
// </button>)
var element = /*#__PURE__*/ React.createElement(
    "button", {
        id: "button"
    },
    "say hello",
    /*#__PURE__*/
    React.createElement("b", null, "helloF")
);

React.render(element, document.getElementById('root'))