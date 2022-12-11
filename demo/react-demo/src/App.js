const jsx = (
	<div>
		hello <span>react</span>
	</div>
);
console.log('jsx==', jsx);
function App() {
	return <div className="App">{jsx}</div>;
}

export default App;
