var product = [];
function LoadListShoppingCart() {
  // Hiển thị danh sách giỏ hàng từ database
  $.get("http://localhost:8080/cart/listCart?token="+ localStorage.getItem("Token"), (data, status) => {
    product = data.cartItems;
    console.log(data);
    var totalamount = data.totalCost;
    // Hiển các sản phẩm vào bảng
    const row_container = $("#datarow");

    product.forEach((item, index) => {
      // totalamount += item.price * item.qty; // tổng tiền

      row_container.append(
        `<tr>` +
          `<td>` +
          `<input type="checkbox" id="checkbox-` +
          index +
          `" onClick="onChangeCheckboxItem()">` +
          `</td>` +
          `<td>` +
          item.product.id +
          `</td>` +
          `<td>` +
          `<img src="./images/` +
          item.product.image +
          `" class="hinhdaidien">` +
          ` </td>` +
          `<td>` +
          item.product.productName +
          `</td>` +
          ` <td class="text-right"> <input onblur=" " value="${item.qty}"></td>` +
          `<td class="text-right">` +
          item.product.price +
          `</td>` +
          `<td class="text-right">` +
          item.product.price * item.qty +
          `</td>` +
          `<td>` +
          `<a id="delete_1" onclick="DeleteOneItem2(` +
          item.id +
          `)" data-sp-ma="2" class="btn btn-danger btn-delete-sanpham">` +
          `<i class="fa fa-trash" aria-hidden="true"></i> Delete` +
          ` </a>` +
          `</td>` +
          `</tr>`
      );
    });
    // Hiển thị tổng tiền
    $("#Totalamount").append(
      `Total Amount: ` + `<span id="totalprice"> $` + totalamount + `</span>`
    );
  });
}

function TotalQuantity() {
  $.get("http://localhost:8080/cart/listCart?token="+ localStorage.getItem("Token"),(data, status) => {
  

    var TotalQuantity = 0;
    // Hiển các sản phẩm vào bảng
    a=data.cartItems;
    a.forEach((item) => {
      TotalQuantity += item.qty; // tổng tiền
    });
    // Hiển thị tổng tiền
    var b = TotalQuantity > 1 ? "items" : "item";
    $("#totalitems").append(
      `<span id="totalprice"> &nbsp;` + TotalQuantity + `&nbsp;` + b + `</span>`
    );
  });
}

function DeleteOneItem2(id) {
  $.ajax({
    url: "http://localhost:8080/cart/" + id,
    type: "DELETE",
    success: function (result) {
      // error
      if (result == undefined || result == null) {
        alert("Error when loading data");
        return;
      }

      // success
      alert("Delete successfully!");
      $("#datarow").empty();
      $("#Totalamount").empty();
      LoadListShoppingCart();
    },
  });
}

function onChangeCheckboxItem() {
  var i = 0;
  while (true) {
    var checkboxItem = document.getElementById("checkbox-" + i);
    if (checkboxItem !== undefined && checkboxItem !== null) {
      if (!checkboxItem.checked) {
        document.getElementById("checkbox-all").checked = false;
        return;
      }
      i++;
    } else {
      break;
    }
  }
  // document.getElementById("checkbox-all").checked = true;
}

function onChangeCheckboxAll() {
  var i = 0;
  while (true) {
    var checkboxItem = document.getElementById("checkbox-" + i);
    if (checkboxItem !== undefined && checkboxItem !== null) {
      // checkboxItem.checked = document.getElementById("checkbox-all").checked
      if (document.getElementById("checkbox-all").checked) {
        checkboxItem.checked = true;
      } else {
        checkboxItem.checked = false;
      }
      i++;
    } else {
      break;
    }
  }
}

function DeleteAllCheckboxSelector() {
  // get checked
  var ids = [];
  var names = [];
  var i = 0;
  while (true) {
    var checkboxItem = document.getElementById("checkbox-" + i);
    if (checkboxItem !== undefined && checkboxItem !== null) {
      if (checkboxItem.checked) {
        ids.push(product[i].id);
        console.log(ids);
        names.push(product[i].product.productName);
        console.log(names);
      }
      i++;
    } else {
      break;
    }
  }

  // open confirm ==> bạn có muốn xóa bản ghi ...
  
  var confirm1 = confirm("You want to delete " + " " + names + " ?"); // tip hay
  if (confirm1) {
	
    // call API
    $.ajax({
      url: "http://localhost:8080/cart?ids=" + ids,
      type: "DELETE",
      success: function (result) {
        // console.log(result);
        // error
        if (result == undefined || result == null) {
          alert("Error when loading data");
          return;
        }

        // success

        $("#datarow").empty();
        $("#Totalamount").empty();
        LoadListShoppingCart();
        alert("Delete successfully!");
      }
    });
	
  }
//   else
//   {
// 	 confirm("You haven't added the target to delete yet!");
//   }
}
