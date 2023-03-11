// logout
function logout()
{
    localStorage.removeItem("Token");
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
  

    window.location.replace("http://127.0.0.1:5501/web/index.html"); 

}

// Xét xem có tồn tại account nào đăng nhập không
function isLogin() {
    if (localStorage.getItem("Token")) {
        return true;
    }
    return false;
}

