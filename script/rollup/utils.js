import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from 'rollup-plugin-commonjs';
const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePath(pathName, isDist) {
	if (isDist) {
		return `${distPath}/${pathName}`;
	}
	return `${pkgPath}/${pathName}`;
}

export function getPackageJson(pahName) {
	//包的路径
	const path = `${pkgPath}/${pahName}/package.json`;
	const str = fs.readFileSync(path, 'utf-8');
	return JSON.parse(str);
}
export function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}
