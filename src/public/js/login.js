async function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    
    try {

       const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            // Si la respuesta es correcta, muestra un toastify de éxito
            Toastify({
                text: 'Sesión iniciada exitosamente',
                duration: 1000,
                backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                callback: function() {
                    // Redirect to login page after 2000 milliseconds
                    window.location.href = response.url;
                }
            }).showToast();
          
        } else{
            const result = await response.json()
            // Si la respuesta no es correcta, muestra un toastify de error
            Toastify({
                text: result.error,
                duration: 3000,
                backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
            }).showToast();
        }
                
    } catch (error) {
        console.log(error)
        // Si hay un error, muestra un toastify de error
        Toastify({
            text: 'Error al iniciar sesion',
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
        }).showToast();
    }
}