document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.querySelector(".submit-btn");
    const loginBtn = document.querySelector(".login-btn");

    if (registerBtn) {
        registerBtn.addEventListener("click", async () => {
            const name = document.querySelector(".name").value;
            const email = document.querySelector(".email").value;
            const password = document.querySelector(".password").value;

            if (!name || !email || !password) {
                alert("Please fill all fields!");
                return;
            }

            try {
                const response = await fetch("/register-user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();
                alert(data);

                if (data === "email already exists") {
                    alert("Email already exists. Try another one.");
                } else if (data === "fill all the fields") {
                    alert("Please fill all fields.");
                } else {
                    alert("Registration successful! Redirecting to login...");
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            const email = document.querySelector(".email").value;
            const password = document.querySelector(".password").value;

            if (!email || !password) {
                alert("Please enter email and password.");
                return;
            }

            try {
                const response = await fetch("/login-user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                alert(data);

                if (data === "email or password is incorrect") {
                    alert("Invalid email or password. Try again.");
                } else {
                    alert(`Welcome, ${data.name}! Redirecting to homepage...`);
                    window.location.href = "/";
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }
});
