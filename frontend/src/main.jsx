import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            {/* <QueryClientProvider client={queryClient}> */}
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
            {/* </QueryClientProvider> */}
        </Provider>
    </StrictMode>
);
