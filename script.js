document.addEventListener("DOMContentLoaded", function () {
    checkSession(); // Check login status on page load

    // Navigation for Home & Features
    document.getElementById('homeBtn').addEventListener('click', function () {
        document.getElementById('homeSection').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('featuresBtn').addEventListener('click', function () {
        document.getElementById('featuresSection').scrollIntoView({ behavior: 'smooth' });
    });

    // Login Modal
    document.getElementById('signInBtn').addEventListener('click', function () {
        document.getElementById('loginModal').style.display = 'flex';
    });

    document.getElementById('closeLogin').addEventListener('click', function () {
        document.getElementById('loginModal').style.display = 'none';
    });

    // Sign Up Modal
    document.getElementById('signUpBtn').addEventListener('click', function () {
        document.getElementById('signUpModal').style.display = 'flex';
    });

    document.getElementById('closeSignUp').addEventListener('click', function () {
        document.getElementById('signUpModal').style.display = 'none';
    });

    // Switching between Login and Sign Up modals
    document.getElementById('switchToSignUp').addEventListener('click', function () {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('signUpModal').style.display = 'flex';
    });

    document.getElementById('switchToSignIn').addEventListener('click', function () {
        document.getElementById('signUpModal').style.display = 'none';
        document.getElementById('loginModal').style.display = 'flex';
    });

    // Login Functionality
    document.getElementById("loginSubmit").addEventListener("click", function () {
        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;

        fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${email}&password=${password}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem("loggedIn", "true");
                location.reload(); // Reload page to show Profile & Logout
            } else {
                alert(data.message);
            }
        });
    });

    // Sign Up Functionality
    document.getElementById("signUpSubmit").addEventListener("click", function () {
        let name = document.getElementById("signUpName").value;
        let email = document.getElementById("signUpEmail").value;
        let password = document.getElementById("signUpPassword").value;

        fetch("signup.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `name=${name}&email=${email}&password=${password}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem("loggedIn", "true");
                location.reload(); // Reload page to show Profile & Logout
            } else {
                alert(data.message);
            }
        });
    });

    // Logout Functionality
    document.getElementById("logoutBtn").addEventListener("click", function () {
        fetch("logout.php").then(() => {
            sessionStorage.removeItem("loggedIn");
            location.reload(); // Reload to show Sign in & Sign up
        });
    });

    function checkSession() {
        if (sessionStorage.getItem("loggedIn")) {
            document.getElementById("signInBtn").style.display = "none";
            document.getElementById("signUpBtn").style.display = "none";
            document.getElementById("profileBtn").style.display = "inline";
            document.getElementById("logoutBtn").style.display = "inline";
        } else {
            document.getElementById("signInBtn").style.display = "inline";
            document.getElementById("signUpBtn").style.display = "inline";
            document.getElementById("profileBtn").style.display = "none";
            document.getElementById("logoutBtn").style.display = "none";
        }
    }
});
