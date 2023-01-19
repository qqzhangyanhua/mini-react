import { getPackageJson, resolvePackage, getBasePlugin } from './utils.js';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import alias from '@rollup/plugin-alias';
import { version } from 'typescript';
const { name, module } = getPackageJson('react-dom');
console.log('pkgDistPath====', name, module);

const packPath = resolvePackage(name);
//react 产出物的路径
const pkgDistPath = resolvePackage(name, true);
//打包配置
export default [
	// react-dom
	{
		input: `${packPath}/${module}`,
		output: [
			{
				file: `${pkgDistPath}/index.js`,
				format: 'umd',
				name: 'index.js'
			},
			{
				file: `${pkgDistPath}/client.js`,
				format: 'umd',
				name: 'client.js'
			}
		],
		plugins: [
			...getBasePlugin(),
			alias({
				entries: {
					hostConfig: `${packPath}/src/hostConfig.ts`
				}
			}),
			generatePackageJson({
				outputFolder: pkgDistPath,
				inputFolder: packPath,
				baseContents: (pkg) => ({
					name: pkg.name,
					version: pkg.version,
					description: pkg.description,
					peerDependencies: {
						react: version
					},
					main: 'index.js'
				})
			})
		]
	}
];
