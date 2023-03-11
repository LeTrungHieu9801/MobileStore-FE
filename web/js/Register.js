function Register() {
    // Get username & password
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var Repassword = document.getElementById("Repassword").value;
    // validate


    if (!firstName) {
        showNameErrorMessage("Please input firstname!");
        return;
    }

    if (!lastName) {
        showNameErrorMessage("Please input lastname!");
        return;
    }

    if (!email) {
        showNameErrorMessage("Please input username!");
        return;
    }

    if (!password) {
        showNameErrorMessage("Please input password!");
        return;
    }
    if (!Repassword) {
        showNameErrorMessage("Please input Re-enter password!");
        return;
    }

    // validate username 6 -> 30 characters
    if (email.length < 6 || email.length > 50 || password.length < 6 || password.length > 50 
        || firstName.length < 0 || firstName.length > 15 || lastName.length < 0 || lastName.length > 15) 
    {
        // show error message
        showNameErrorMessage("Register fail!");
        return;
    }

    // Call API
   

    if(Repassword != password  )
    {
     showNameErrorMessage("Re-entered password does not match!");
    return;
    } 
    else
    addAccount();
  
}

function showNameErrorMessage(message) {
    document.getElementById("nameErrorMessage").style.display = "block";
    document.getElementById("nameErrorMessage").innerHTML = message;
}

function hideNameErrorMessage() {
    document.getElementById("nameErrorMessage").style.display = "none";
}

function addAccount() {

    // get data
    
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    // TODO validate
    // then fail validate ==> return;

    var user = {

        firstName:firstName,
        lastName: lastName,
        email: email,
        password: password 
    };
    

    $.ajax({
        url: 'http://localhost:8080/user/signup',
        type: 'POST',
        data: JSON.stringify(user), // body
        contentType: "application/json", // type of body (json, xml, text)
        // dataType: 'json', // datatype return
        success: function (data) {
            console.log(data);
            console.log("da tao thanh cong");
            alert("Tạo tài khoản thành công")
            // success
            document.location.href = document.location.origin + "/web/login.html"; 
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function returnHome()
{
    window.location.replace("http://127.0.0.1:5501/web/index.html"); 
}