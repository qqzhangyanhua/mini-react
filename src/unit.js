export function createUnit(element) {
    if (typeof element === 'string' || typeof element === 'number') {
        console.log('123333333');

        return new TextUnit(element);
    }

}
class Unit {
    constructor(element) {
        // 私有属性都是——开头的
        this._element = element;

    }
    getMarkup() {
        throw new Error("methods do not be use")
    }
}
class TextUnit extends Unit {

    getMarkup(reactId) {
        this._reactId = reactId;
        return `<span data-reactId="${reactId}">${this._element}</span>`
    }
}