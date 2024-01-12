async function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    
    try {

       const response = await fetch('/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if(response.ok){
            Toastify({
                text: 'Sesion iniciada correctamente',
                duration: 3000,
                backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
            }).showToast();
            const result = await response.json();
            window.location.href = result.redirect;
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