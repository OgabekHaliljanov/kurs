document.addEventListener('DOMContentLoaded', () => {
    const inputForm = document.getElementById('inputForm');

    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Example validation (replace with your own authentication logic)
        if (username === "admin" && password === "1234") {
            // Redirect to another page (welcome.html in this case)
            window.location.href = 'gl.html';
        } else {
            alert("Неправильное имя пользователя или пароль. Попробуйте снова.");
        }
        if (username === "admin" && password === "1234") {
            // Redirect to another page (welcome.html in this case)
            window.location.href = 'gl.html';
        } else {
            alert("Неправильное имя пользователя или пароль. Попробуйте снова.");
        }
    });
});