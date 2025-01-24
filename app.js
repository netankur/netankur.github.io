// Check if the browser supports service workers and the beforeinstallprompt event
if ('serviceWorker' in navigator && window.matchMedia('(display-mode: browser)').matches) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/home/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }, function(err) {
            console.log('Service Worker registration failed:', err);
        });
    });

    let deferredPrompt;
    const installButton = document.getElementById('installButton');

    window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        event.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = event;
        // Show the install button
        installButton.style.display = 'block';
    });

    installButton.addEventListener('click', (event) => {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                // Hide the install button
                installButton.style.display = 'none';
            }
            deferredPrompt = null;
        });
    });
}