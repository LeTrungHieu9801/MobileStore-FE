// logout
function logout()
{
    localStorage.removeItem("Token");
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
  

    document.location.href=document.location.origin + "/web/index.html";

}

// Xét xem có tồn tại account nào đăng nhập không
function isLogin() {
    if (localStorage.getItem("Token")) {
        return true;
    }
    return false;
}

