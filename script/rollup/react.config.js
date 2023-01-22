import { getPackageJson, resolvePath, getBaseRollupPlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
const { name, module } = getPackageJson('react');
const pkgPath = resolvePath(name);
console.log('pkgPath', pkgPath);

const pkgDistPath = resolvePath(name, true);
export default [
	// react
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${pkgDistPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				//生成package.json
				baseContents: ({ name, module, description, version }) => {
					return {
						name,
						module,
						sideEffects: false,
						description,
						version,
						main: 'index.js'
					};
				}
			})
		]
	},
	//jsx-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			{
				file: `${pkgDistPath}/jsx-runtime.js`,
				format: 'umd',
				name: 'jsx-runtime.js'
			},
			{
				file: `${pkgDistPath}/jsx-runtime.dev.js`,
				format: 'umd',
				name: 'jsx-runtime.dev.js'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];
