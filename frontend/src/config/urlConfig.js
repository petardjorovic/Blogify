export const urlConfig = {
    frontend: import.meta.env.MODE === 'production' ? 'https://mysocialnet.onrender.com' : 'http://localhost:5173',
    backend: import.meta.env.MODE === 'production' ? 'https://backendmysocialnet.onrender.com' : 'http://localhost:4000',
};
