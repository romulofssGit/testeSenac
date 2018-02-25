if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./serviceWorker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

const publicKey = 'BHR_KlKwm1SQd9qCCxIlxHz86Qch70V4kszQVOCKTCJkFh2gRSmp33J7hqSwHuLgDC7a8gaWMIN-rhSQyyTcTSc';
// = 'Aca8mYiAJgDmKyt-OR3M1D7UqY4p8dhvH_ps8oIgIrE';

navigator.serviceWorker && navigator.serviceWorker.ready.then(
	function(serviceWorkerRegistration) {  
  		serviceWorkerRegistration.pushManager.getSubscription()  
    		.then(function(subscription) {  
      		
			     if (subscription) {
			        console.info('O usuário já está inscrito', subscription);
			        window.subscription = subscription;
			        return
			      }

			      const applicationServerKey = urlB64ToUint8Array(publicKey);
			      serviceWorkerRegistration.pushManager.subscribe({
			          userVisibleOnly: true,
			          applicationServerKey,
			      })
			        .then(function(subscription) { 
			          console.info('Usuário acabou de se inscrever!', subscription);
			          window.subscription = subscription;
			        });

    	});
	}
);