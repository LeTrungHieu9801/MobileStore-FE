// paging
var product = [];
var currentPage = 1;
var size = 8;


function getListProducts() {
  var url = "http://localhost:8080/ListProduct";
  //pageable
 
  url += "?page=" + currentPage + "&size=" + size;
  // //search
  if(search)
  {
    url += "&search=" + search ;
  }
  // call API from server
  $.get(url, function (data1, status) {
    // reset list products
    product = [];

    // error
    if (status == "error") {
      // TODO
      alert("Error when loading data");
      return;
    }

    // success 
    // products = data1.content; dùng khi có pageable
    product = data1.content;
    console.log(data1);
    product .forEach(function (item) {
      $("#GetAllProduct").append(
        `<div class= "grid_1_of_4 images_1_of_4 products-info">` +
          `<img onclick = "single(` +
          item.id +
          `)" src="images/` +
          item.image +
          ` ">` +
          `<a href="single.html">` +
          item.productName +
          `</a>` +
          `<h3 class = "text"> $` +
          item.price +
          `</h3>` +
          `<ul>` +
          `<li><a onclick =" addCart(` +
          item.id +
          `) "  class="cart" href="#"> </a></li>` +
          `<li><a  class="i" onclick = "single(` +
          item.id +
          `)"> </a></li>` +
          `</ul>` +
          `</div>`
      );
    });
    pagingTable(data1.totalPages);
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
  $("#GetAllProduct").empty();
  getListProducts();
}

var hotproducts = [];
function getAllHotProducts() {
  // call API from server
  $.get("http://localhost:8080/listHotProduct", function (data, status) {
    // reset list products
    console.log(data);
    
    hotproducts = [];

    // error
    if (status == "error") {
      // TODO
      alert("Error when loading data");
      return;
    }

    // success
    hotproducts = data;
    console.log(data);
    hotproducts.forEach(function (item) {
      $("#GetAllProduct").append(
        `<div class= "grid_1_of_4 images_1_of_4 products-info">` +
          `<img onclick = "single(` +
          item.id +
          `)" src="images/` +
          item.image +
          ` ">` +
          `<a href="single.html">` +
          item.productName +
          `</a>` +
          `<h3> $` +
          item.price +
          `</h3>` +
          `<ul>` +
          `<li><a onclick =" addCart(` +
          item.id +
          `) " class="cart" href="#"> </a></li>` +
          `<li><a  class="i" onclick = "single(` +
          item.id +
          `)" href="#"> </a></li>` +
          `</ul>` +
          `</div>`
      );
    });
  });
}

function addCart(productId) {
  var qty = 1;

 var CartItem={ 
  productId: productId,
  qty: qty
 };
 
  $.ajax({
    url: 'http://localhost:8080/cart/add?token='+ localStorage.getItem("Token"),
    type: 'POST',
    contentType: "application/json",
    data: JSON.stringify(CartItem), // datatype return
  
    success: function (data) {
      console.log(localStorage.getItem("Token"));
  
        console.log(data)
   // fill data
   alert("add successfully!");
   $("#totalitems").empty();
   TotalQuantity();
  
    }

});

}

function single(id) {
  document.location.href = document.location.origin + "/web/details.html?product_id=" + id;
}

var search = "";
function ProductSearch()
{
  var s = document.getElementById("textSearch").value;
  console.log(s);
  if(search != s)
  {
    search = s;
    $("#GetAllProduct").empty();
    getListProducts();
  }
  else if (search != "" && search == s)
  {
    
  }
  else
  {
    document.location.href = document.location.origin + "/web/Store.html";
  }
 
 
}

function EnterDeTimKiemNhanh(event)
{
  if(event.keyCode === 13)
  {
    event.preventDefault();
    ProductSearch();
  }
}