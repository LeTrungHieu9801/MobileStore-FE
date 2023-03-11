var products = [];
function LoadListShoppingCart() {
  // Hiển thị danh sách giỏ hàng từ database
  $.get("http://localhost:8080/api/v1/cart/listCart", (data, status) => {
    products = data;
   
    var totalamount = 0;
    // Hiển các sản phẩm vào bảng
    const row_container = $("#datarow");

    data.forEach((item, index) => {
      totalamount += item.price * item.qty; // tổng tiền

      row_container.append(
        `<tr>` +
          `<td>` +
          `<input type="checkbox" id="checkbox-` +
          index +
          `" onClick="onChangeCheckboxItem()">` +
          `</td>` +
          `<td>` +
          item.productId +
          `</td>` +
          `<td>` +
          `<img src="./images/` +
          item.image +
          `" class="hinhdaidien">` +
          ` </td>` +
          `<td>` +
          item.name +
          `</td>` +
          ` <td class="text-right"> <input onblur=" " value="${item.qty}"></td>` +
          `<td class="text-right">` +
          item.price +
          `</td>` +
          `<td class="text-right">` +
          item.price * item.qty +
          `</td>` +
          `<td>` +
          `<a id="delete_1" onclick="DeleteOneItem(` +
          item.productId +
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
  $.get("http://localhost:8080/api/v1/cart/listCart", (data, status) => {
   

    var TotalQuantity = 0;
    // Hiển các sản phẩm vào bảng

    data.forEach((item) => {
      TotalQuantity += item.qty; // tổng tiền
      console.log(TotalQuantity);
    });
    // Hiển thị tổng tiền
    var b = TotalQuantity > 1 ? "items" : "item";
    $("#totalitems").append(
      `<span id="totalprice"> &nbsp;` + TotalQuantity + `&nbsp;` + b + `</span>`
    );
  });
}

function DeleteOneItem(id) {
  $.ajax({
    url: "http://localhost:8080/api/v1/cart/" + id,
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

function AddPayment() {
  // get checked
  var ids = [];
  var names = [];
  var i = 0;
  while (true) {
    var checkboxItem = document.getElementById("checkbox-" + i);
    if (checkboxItem !== undefined && checkboxItem !== null) {
      if (checkboxItem.checked) {
        ids.push(products[i].productId);
        // console.log(ids);
        names.push(products[i].name);
        // console.log(names);
      }
      i++;
    } else {
      break;
    }
  }

  // open confirm ==> bạn có muốn xóa bản ghi ...
  
  $.get("http://localhost:8080/api/v1/payment/" + ids, (data, status) => {
    products = data;
    console.log(data);
    
  });
	
}



