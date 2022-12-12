// import React from 'react';
import React from './react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from './react-dom';

import App from './App';
// import reportWebVitals from './reportWebVitals';

// reportWebVitals();
console.log('React==', App);
// console.log(jsx);
// console.log('PReact==', PReact);

//函数组件
// 组件必须使用前定义
//组件必须只能返回一个根元素
function Welcome(props) {
	return <h1 style={{ color: 'red' }}>Hello, {props.name}</h1>;
}

const jsx = (
	<div style={{ background: 'red' }}>
		hello <span style={{ color: 'red' }}>react</span>
	</div>
);

//类组件与类组件的更新
//可以在构造函数中给state赋值
//定义状态对象
//属性对象,父组件给的不能改变
//等时间函数处理完成之后,再批量更新,一次更新并渲染
//jsx时间处理函数是react控制的,只要归react控制就是批量更新
class Welcome2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 1
		};
	}
	handelClick = () => {
		this.setState({ name: this.state.name + 1 });
		this.setState({ name: this.state.name + 1 });
	};
	render() {
		return (
			<h1 style={{ color: 'red' }}>
				Hello, {this.state.name}
				<button onClick={this.handelClick}>按扭</button>
			</h1>
		);
	}
}
console.log('JSX==', JSON.stringify(jsx, null, 2));
ReactDOM.render(<Welcome2 name="王箫二" />, document.getElementById('root'));

// ReactDOM.render(<Welcome name="王箫二" />, document.getElementById('root'));

// ReactDOM.render(jsx, document.getElementById('root'));
// root.render(<App />);
