import { getPackageJson, resolvePackage, getBasePlugin } from './utils.js';
import generatePackageJson from 'rollup-plugin-generate-package-json';
const { name, module } = getPackageJson('big-react');
const packPath = resolvePackage(name);
//react 产出物的路径
const pkgDistPath = resolvePackage(name, true);
//打包配置
export default [
	// react
	{
		input: `${packPath}/${module}`,
		output: {
			file: `${pkgDistPath}/index.js`,
			format: 'umd',
			name: 'index.js'
		},
		plugins: [
			...getBasePlugin(),
			generatePackageJson({
				outputFolder: pkgDistPath,
				inputFolder: packPath,
				baseContents: (pkg) => ({
					name: pkg.name,
					version: pkg.version,
					description: pkg.description,
					main: 'index.js'
				})
			})
		]
	},
	// js-runtime
	{
		input: `${packPath}/src/jsx.ts`,
		output: [
			{
				file: `${pkgDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			{
				file: `${pkgDistPath}/jsx-runtime.dev.js`,
				name: 'jsx-runtime.dev.js',
				format: 'umd'
			}
		],
		plugins: getBasePlugin()
	}
];
