import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
const packPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');
export const resolvePackage = (packName, isDist) => {
	if (isDist) {
		return `${distPath}/${packName}`;
	}
	return `${packPath}/${packName}`;
};
export const getPackageJson = (packName) => {
	const path = `${resolvePackage(packName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
};

export const getBasePlugin = ({ typescript = {} } = {}) => {
	return [cjs(), ts(typescript)];
};