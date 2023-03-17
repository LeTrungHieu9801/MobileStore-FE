var product = [];
var currentPage = 1;
var size = 4;
function getAllPayment() {
  // Hiển thị danh sách giỏ hàng từ database
  $.get("http://localhost:8080/payment/getListPayment?token="+ localStorage.getItem("Token") +"&page=" + currentPage + "&size=" + size, (data) => {
    product = data.content;
    console.log(data);
    var totalamount = 0;
  //   // Hiển các sản phẩm vào bảng
    const row_container = $("#datarow");

    product.forEach((item, index) => {
      totalamount += item.product.price * item.qty; // tổng tiền

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
          `<a id="delete_1" onclick="DeleteOneItem1(` +
          item.id +
          `)" data-sp-ma="2" class="btn btn-danger btn-delete-sanpham">` +
          `<i class="fa fa-trash" aria-hidden="true"></i> Delete` +
          ` </a>` +
          `</td>` +
          `</tr>`
      );
    });
     pagingTable(data.totalPages);
    // Hiển thị tổng tiền
    $("#Totalamount").append(
      `Total Amount: ` + `<span id="totalprice"> $` + totalamount + `</span>`
    );
  });
}

function pagingTable(pageAmount) {
  var pagingStr = "";

  if (pageAmount > 1 && currentPage > 1) {
    pagingStr +=
      '<li class="page-item">' +
      '<a class="page-link" onClick="prevPaging()">Previous</a>' +
      "</li>";
  }

  for (i = 0; i < pageAmount; i++) {
    pagingStr +=
      '<li class="page-item ' +
      (currentPage == i + 1 ? "active" : "") +
      '">' +
      '<a class="page-link" onClick="changePage(' +
      (i + 1) +
      ')">' +
      (i + 1) +
      "</a>" +
      "</li>";
  }

  if (pageAmount > 1 && currentPage < pageAmount) {
    pagingStr +=
      '<li class="page-item">' +
      '<a class="page-link" onClick="nextPaging()">Next</a>' +
      "</li>";
  }

  $("#pagination").empty();
  $("#pagination").append(pagingStr);
}
function resetPaging() {
  currentPage = 1;
  size = 4;
}

function prevPaging() {
  changePage(currentPage - 1);
}

function nextPaging() {
  changePage(currentPage + 1);
}

function changePage(page) {
  if (page == currentPage) {
    return;
  }
  currentPage = page;
  $("#datarow").empty();
  $("#Totalamount").empty();
  getAllPayment();
}

function DeleteOneItem1(id) {
  $.ajax({
    url: "http://localhost:8080/payment/" + id,
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
      getAllPayment();
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
          ids.push(product[i].id);
          console.log(ids);
          names.push(product[i].productName);
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
