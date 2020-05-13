import React from 'react';
import ReactDOM from 'react-dom';

const helloElement = document.getElementById('hello');

if (helloElement) {
    import(/* webpackChunkName: "hello" */ './components/Hello').then(
        ({ default: Hello }) => {
            ReactDOM.render(React.createElement(Hello), helloElement);
        }
    );
}
