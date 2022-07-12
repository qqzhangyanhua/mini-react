import $ from "jquery"
import {
    createUnit
} from './unit'
let React = {
    render,
    rootIndex: 0
}
// 接受的可能是文本节点也可能是dom 或者自定义节点
function render(element, container) {
    // container.innerHTML = `<span>${React.rootIndex}---${element}</span>`
    // 用来渲染的
    let unit = createUnit(element)
    let markup = unit.getMarkup(React.rootIndex) //返回HTML标记
    $(container).html(markup)

}
export default React