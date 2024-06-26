import React from 'react';
import { createRoot } from 'react-dom/client';  
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';


const container = document.getElementById('root');

if (container !== null) {
    const root = createRoot(container);  
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
} else {
    console.error('Failed to find the root element');
}
