function login() {
    // Get username & password
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // validate
    if (!email) {
        showNameErrorMessage("Please input username!");
        return;
    }

    if (!password) {
        showNameErrorMessage("Please input password!");
        return;
    }


    // validate username 6 -> 30 characters
    if (username.length < 6 || username.length > 50 || password.length < 6 || password.length > 50) {
        // show error message
        showNameErrorMessage("Login fail!");
        return;
    }

    var user = {
        email: email,
        password: password 
    };
    
    // Call API
    $.ajax({
        url: 'http://localhost:8080/user/signin',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(user), // datatype return
        success: function (data) {
       localStorage.setItem("Token",data.token);
       localStorage.setItem("firstName",data.user.firstName);
       localStorage.setItem("lastName",data.user.lastName);
      
            console.log(data)
            document.location.href = document.location.origin + "/web/index.html"; 
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                showNameErrorMessage("Login fail!");
            } else {
                showNameErrorMessage("Bạn đã điền sai thông tin đăng nhập");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });
}

function showNameErrorMessage(message) {
    document.getElementById("nameErrorMessage").style.display = "block";
    document.getElementById("nameErrorMessage").innerHTML = message;
}

function hideNameErrorMessage() {
    document.getElementById("nameErrorMessage").style.display = "none";
}