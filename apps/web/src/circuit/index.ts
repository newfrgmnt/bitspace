if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = 'https://rsms.me/';
    document.head.appendChild(preconnectLink);

    const stylesheetLink = document.createElement('link');
    stylesheetLink.rel = 'stylesheet';
    stylesheetLink.href = 'https://rsms.me/inter/inter.css';
    document.head.appendChild(stylesheetLink);
}

export * from './components/Connection/Connection.types';
export * from './components/Canvas/Canvas.types';
export * from './components/Node/Node.types';
export * from './containers/Circuit/Circuit';
export * from './stores/CanvasStore/CanvasStore';
export * from './stores/CanvasStore/CanvasStore.types';
