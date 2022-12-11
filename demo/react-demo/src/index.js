// import React from 'react';
import React from './react';
import ReactDOM from 'react-dom/client';

import App from './App';
// import reportWebVitals from './reportWebVitals';

// reportWebVitals();
console.log('React==', App);
// console.log(jsx);
// console.log('PReact==', PReact);
const jsx = (
	<div>
		hello <span>react</span>
	</div>
);
console.log('JSX==', JSON.stringify(jsx, null, 2));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
