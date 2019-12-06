// make sure srvice worker is avliable
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator
        .serviceWorker
        .register('sw.js')
        .then(registred => console.log('Service Worker Registred'))
        .catch(err => console.log(err));
    })
};