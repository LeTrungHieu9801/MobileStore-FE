var products = [];
function GetAllPayment()
{
  $.get("http://localhost:8080/api/v1/payment/Allpayments", (data, status) => {

   
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
          `<a id="delete_1" onclick="DeleteOneItem1(` +
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
      `<b> Tổng Tiền : </b> ` + `<span id="totalprice">$` + totalamount + `</span>`
    );
  });
}

  
  function DeleteOneItem1(id) {
    $.ajax({
      url: "http://localhost:8080/api/v1/payment/" + id,
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
        GetAllPayment();
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
    while (true) 
    {
      var checkboxItem = document.getElementById("checkbox-" + i);
      if (checkboxItem !== undefined && checkboxItem !== null) {
        if (checkboxItem.checked) {
          ids.push(products[i].productId);
          console.log(ids);
          names.push(products[i].name);
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
        url: "http://localhost:8080/api/v1/payment?ids=" + ids,
        type: "DELETE",
        success: function (result) {
          console.log(result);
          // error
          if (result == undefined || result == null) {
            alert("Error when loading data");
            return;
          }
  
          // success
  
          $("#datarow").empty();
          $("#Totalamount").empty();
          GetAllPayment();
          alert("Delete successfully!");
        }
      });
    
    }
  }

  // NÚT NHẤN ĐỂ HOÀN THÀNH QUÁ TRÌNH MUA HÀNG
function completePayment()
{
  var total = document.getElementById("totalprice").innerHTML;
  console.log(total);
  if(total == "$0")
  {
    alert("Không có sản phẩm nào để thanh toán . Vui lòng thêm sản phẩm!");
    return;
  }else
  {
    var a = document.getElementById('Number').value;
  var b = document.getElementById('Customer').value;
  var c = document.getElementById('address').value;
  var d = document.getElementById('email').value;
  console.log(a);
  if(a !== "" && a.length ==10 && b !== "" && c !== "" && d !== "" )
 {
  document.getElementById('checkout').style.display = "none";
  document.getElementById('baothanhcong').style.display = "block";
  document.getElementById('baothanhcong1').innerHTML = "Chúng tôi đã nhận được yêu cầu đặt hàng của bạn . Nhân viên của chúng tôi sẽ gọi điện đến số <span id='sdt'>"+a+"</span> mà bạn vừa nhập để xác nhận đơn hàng. Vui lòng chờ chúng tôi trong ít phút "
 } 
 else if(a.length <10 || a.length >10){
 alert("Bạn nhập SĐT chưa đúng định dạng (SĐT cần có 10 số!)");
 }
 else
 {
  alert("Bạn chưa điền đầy đủ thông tin giao hàng. Vui lòng nhập đầy đủ!!!");
 }
  }
  
}
