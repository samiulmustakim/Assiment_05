document.getElementById('signinBtn').addEventListener('click', () => {
    const userId = document.getElementById("user-id")
    const userValue = userId.value
    

    const userpass = document.getElementById("user-pass")
    const pin = userpass.value
    

    if (userValue === "admin" && pin === "admin123") {
        window.location.assign("./home.html")
    } else {
        alert("Login Failed")
        userId.value = ""
        userpass.value = ""
        return
    }
})