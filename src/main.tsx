import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import profileImage from './assets/profile.webp';
import './index.css';

const preload = document.createElement('link');
preload.rel = 'preload';
preload.as = 'image';
preload.href = profileImage;
preload.setAttribute('fetchpriority', 'low');
document.head.appendChild(preload);

createRoot(document.getElementById('root')!).render(<App />);
