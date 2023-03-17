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
  if (
    username.length < 6 ||
    username.length > 50 ||
    password.length < 6 ||
    password.length > 50
  ) {
    // show error message
    showNameErrorMessage("Login fail!");
    return;
  }

  var user = {
    email: email,
    password: password,
  };

  // Call API
  $.ajax({
    url: "http://localhost:8080/admin/signin",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(user), // datatype return
    // beforeSend: function (xhr) {
    //     xhr.setRequestHeader("Authorization", "Basic " + btoa(email + ":" + password));
    // },
    success: function (data) {
      console.log(data);
      // save data to storage
      // https://www.w3schools.com/html/html5_webstorage.asp
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);

      console.log(data);

      // redirect to home page
      // https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
      document.location.href =
        document.location.origin + "/web/Admin-Product.html";
    },
    error(jqXHR, textStatus, errorThrown) {
      if (jqXHR.status == 401) {
        showNameErrorMessage("Login fail!");
      } else {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
    },
  });
  localStorage.removeItem("Token");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
}

function showNameErrorMessage(message) {
  document.getElementById("nameErrorMessage").style.display = "block";
  document.getElementById("nameErrorMessage").innerHTML = message;
}

function hideNameErrorMessage() {
  document.getElementById("nameErrorMessage").style.display = "none";
}

function isLoginAdmin() {
  if (localStorage.getItem("firstName")) {
    return true;
  }
  return false;
}

function showDeleteButton() {
  //ẩn button Thêm vào giỏ hàng và Single đồng thời hiển thị Delete
  var elements1 = document.querySelectorAll(".addcart");
  for (var i = 0; i < elements1.length; i++) {
    elements1[i].style.display = "none";
  }
  var elements = document.querySelectorAll(".single");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  var elements2 = document.querySelectorAll(".delete");
  for (var i = 0; i < elements2.length; i++) {
    elements2[i].style.display = "block";
  }
}

// Phần thêm sản phẩm

function resetFormAdd() {
  document.getElementById("titleModal").innerHTML = "Thêm Sản Phẩm";
  document.getElementById("id").value = "";
  document.getElementById("name1").value = "";
  document.getElementById("Price1").value = "";
  document.getElementById("Description1").value = "";
  document.getElementById("Category1").value = "";
}
function openAddModal() {
  openModal();
  resetFormAdd();
}
function openModal() {
  document.getElementById("myModal").style.display = "block";
}
function hidenModal() {
  document.getElementById("myModal").style.display = "none";
}

function addProduct() {
  // upload ảnh
  var fileInput = document.getElementById("myFile");
  var file = fileInput.files[0];

  var formData = new FormData();
  formData.append("image", file);
  var image1;
  $.ajax({
    url: "http://localhost:8080/files/image",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log("Kết quả trả về:", data);
      image1 = data;
    },
    error: function (jqXHR, textStatus, errorMessage) {
      console.log("Lỗi khi gọi API:", errorMessage);
    },
  });

  setTimeout(() => {
    // get data
    var name = document.getElementById("name1").value;
    var Category1 = document.getElementById("Category1").value;
    var Price1 = document.getElementById("Price1").value;
    var description = document.getElementById("Description1").value;

    var Product = {
      productName: name,
      category: Category1,
      price: Price1,
      description: description,
      image: image1, //data này lấy từ hàm uploadFile() với data = tên ảnh được tải sau khi lưu vào server
    };

    $.ajax({
      url: "http://localhost:8080/ListProduct",
      type: "POST",
      data: JSON.stringify(Product), // body
      contentType: "application/json", // type of body (json, xml, text)
      success: function (data1, textStatus, xhr) {
        console.log(data1);
        // success
        hidenModal();
        alert("Thêm sản phẩm thành công !");
        $("#GetAllProduct").empty();
        getListProducts();
        if (
          document.location.href ==
          document.location.origin + "/web/Admin-Product.html"
        ) {
          setTimeout(() => {
            showDeleteButton();
          }, 100);
        }
      },
      error(jqXHR, textStatus, errorThrown) {
        alert("Sản phẩm bạn thêm có thể đã tồn tại !");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      },
    });
  }, 100);
}
