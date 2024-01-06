import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
// eslint-disable-next-line no-undef
const packPath = path.resolve(__dirname, '../../packages');
// eslint-disable-next-line no-undef
const distPath = path.resolve(__dirname, '../../dist');
import replace from '@rollup/plugin-replace';
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

export const getBasePlugin = ({
	alias = {
		__DEV__: true,
		preventAssignment: true
	},
	typescript = {}
} = {}) => {
	return [replace(alias), cjs(), ts(typescript)];
};
