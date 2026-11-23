
document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".slideshow .slide");
    const dotsContainer = document.getElementById("slideDots");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");

    if (slides.length > 0) {
        let currentSlide = 0;

        if (dotsContainer) {
            dotsContainer.innerHTML = "";

            slides.forEach((slide, index) => {
                const dot = document.createElement("button");
                dot.type = "button";
                dot.className = "dot";
                dot.setAttribute("aria-label", "ภาพที่ " + (index + 1));

                dot.addEventListener("click", function () {
                    showSlide(index);
                });

                dotsContainer.appendChild(dot);
            });
        }

        function showSlide(index) {
            currentSlide = (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === currentSlide);
            });

            if (dotsContainer) {
                dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
                    dot.classList.toggle("active", i === currentSlide);
                });
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", function () {
                showSlide(currentSlide - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                showSlide(currentSlide + 1);
            });
        }

        showSlide(0);

        // เปลี่ยนภาพทุก 3 วินาที
        if (slides.length > 1) {
            setInterval(function () {
                showSlide(currentSlide + 1);
            }, 3000);
        }
    }

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;
            const role = document.getElementById("role").value;
            const message = document.getElementById("loginMessage");

            const member = (
                username === "demo" &&
                password === "demo123" &&
                role === "member"
            );

            const admin = (
                username === "admin" &&
                password === "admin123" &&
                role === "admin"
            );

            if (member || admin) {
                sessionStorage.setItem("travelUser", username);
                sessionStorage.setItem("travelRole", role);

                message.textContent = "เข้าสู่ระบบสำเร็จ!";
                message.style.color = "green";

                setTimeout(function () {
                    window.location.href = "index.html";
                }, 1000);

            } else {
                message.textContent = "ชื่อผู้ใช้ รหัสผ่าน หรือประเภทผู้ใช้ไม่ถูกต้อง";
                message.style.color = "red";
            }
        });
    }

    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", function () {
            const isHidden = passwordInput.type === "password";

            passwordInput.type = isHidden ? "text" : "password";
            togglePassword.textContent = isHidden ? "ซ่อน" : "แสดง";
        });
    }


    const username = sessionStorage.getItem("travelUser");
    const loginMenu = document.getElementById("loginMenu");
    const userMenu = document.getElementById("userMenu");
    const welcomeUser = document.getElementById("welcomeUser");
    const logoutBtn = document.getElementById("logoutBtn");

    if (username) {
        if (loginMenu) loginMenu.style.display = "none";
        if (userMenu) userMenu.style.display = "flex";

        if (welcomeUser) {
            welcomeUser.textContent = "สวัสดี, " + username;
        }
    } else {
        if (loginMenu) loginMenu.style.display = "";
        if (userMenu) userMenu.style.display = "none";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            sessionStorage.removeItem("travelUser");
            sessionStorage.removeItem("travelRole");

            window.location.href = "login.html";
        });
    }

});
