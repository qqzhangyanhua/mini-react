// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const babel = require('@babel/core');

/* 第一步：模拟读取文件内容。 */
fs.readFile('./element.js', (e, data) => {
	const code = data.toString('utf-8');
	/* 第二步：转换 jsx 文件 */
	const result = babel.transformSync(code, {
		plugins: ['@babel/plugin-transform-react-jsx']
	});
	/* 第三步：模拟重新写入内容。 */
	fs.writeFile('./element-babel.js', result.code, function () {});
});
