const navMenu = document.getElementById("nav-headings");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    navToggle.style.display = "none";
    navClose.style.display = "inline-block";
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    navToggle.style.display = "inline-block";
    navClose.style.display = "none";
  });
}

const loginBtn = document.getElementById("login");
const Form = document.getElementById("form");
const usable = document.getElementById("usable");
console.log(loginBtn);

loginBtn.addEventListener("click", () => {
  Form.classList.add("show");
  usable.classList.add("another");
  // usable.classList.toogle('active');
  //  console.log(usable)
});

const loginClose = document.getElementById("login_close");
if (loginClose) {
  loginClose.addEventListener("click", () => {
    Form.classList.remove("show");
    usable.classList.remove("another");
  });
}

const sr = ScrollReveal({
  distance: "60px",
  duration: 1200,
  delay: 400,
  // reset:true
});

sr.reveal(".home_img", { delay: 250, origin: "left" });
sr.reveal(".home_title", { delay: 250, origin: "top" });
sr.reveal(".club_title", { delay: 250, origin: "top" });
sr.reveal(".home_subtitle ,.description", { delay: 250 });
sr.reveal("#home_btn", { delay: 250 });

sr.reveal(".highlights", { delay: 250 });
sr.reveal(".points_img", { delay: 250, origin: "top" });
sr.reveal(".footer_logo", { delay: 400, origin: "left" });
sr.reveal(".quick_links", { delay: 250, origin: "bottom" });
sr.reveal(".contact_details", { delay: 250, origin: "bottom" });
sr.reveal(".official,.memes", { delay: 250, origin: "top" });
sr.reveal(".socials_headline", { delay: 250, origin: "bottom" });
sr.reveal(".merch_box", { delay: 250, origin: "left" });
sr.reveal(".merch", { delay: 250, origin: "left" });
sr.reveal(".news_img", { delay: 250, origin: "right" });
sr.reveal(".news_description,.news_headline", { delay: 250, origin: "top" });

const slides = document.querySelectorAll(".slide");
const btns = document.querySelectorAll(".btn");
let currentSlide = 0;
let intervalId;

const showSlide = function (index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  btns.forEach((btn) => {
    btn.classList.remove("active");
  });

  slides[index].classList.add("active");
  btns[index].classList.add("active");
  currentSlide = index;
};

const nextSlide = function () {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
};

const startAutoSlideShow = function () {
  intervalId = setInterval(nextSlide, 3000);
};

const stopAutoSlideShow = function () {
  clearInterval(intervalId);
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    stopAutoSlideShow();
    showSlide(i);
  });
});

// Start automatic slideshow initially
startAutoSlideShow();

const shopIcon = document.querySelector(".shop_icon");
const cartTab = document.querySelector(".cartTab");
const cartClose = document.querySelector(".close");
let listproductsHTML = document.querySelector(".merch");
let listCartHTML = document.querySelector(".listCart");
let iconcartsSpan = document.querySelector(".shop_icon span");
let listProduct = [];
let carts = [];
// console.log(shopIcon);
// console.log(cartTab)

shopIcon.addEventListener("click", () => {
  cartTab.classList.toggle("cart_show");
});

// console.log(cartClose)
cartClose.addEventListener("click", () => {
  cartTab.classList.toggle("cart_show");
});

const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");

minus.addEventListener("click", () => {
  document.querySelector(".amount").innerHTML--;
});
plus.addEventListener("click", () => {
  document.querySelector(".amount").innerHTML++;
});

const adddatatoHTML = () => {
  listproductsHTML.innerHTML = "";
  if (listProduct.length > 0) {
    listProduct.forEach((product) => {
      let newproduct = document.createElement("div");
      newproduct.classList.add("merch_box");
      newproduct.dataset.id = product.id;
      newproduct.innerHTML = `
        <img src="${product.image}" alt="" class="merch_image">
      <h2 class="merch_caption">${product.name}</h2>
      <h3 class="merch_price">Rs ${product.price}</h3>
      <a href="" class="merch-btn button">Buy</a>`;
      listproductsHTML.appendChild(newproduct);
    });
  }
};

listproductsHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("merch-btn")) {
    event.preventDefault();
    let productId = positionClick.parentElement.dataset.id;
    addtoCart(productId);
  }
});

const addtoCart = (productId) => {
  let positionthisproductinCart = carts.findIndex(
    (value) => value.productId == productId
  );
  if (carts.length <= 0) {
    carts = [
      {
        productId: productId,
        quantity: 1,
      },
    ];
  } else if (positionthisproductinCart < 0) {
    carts.push({
      productId: productId,
      quantity: 1,
    });
  } else {
    carts[positionthisproductinCart].quantity =
      carts[positionthisproductinCart].quantity + 1;
  }
  // console.log(carts);
  addcarttoHTML();
  addcarttoMemory();
};

const addcarttoMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addcarttoHTML = () => {
  listCartHTML.innerHTML = "";
  let totalquantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalquantity = totalquantity + cart.quantity;
      let newcart = document.createElement("div");
      newcart.classList.add("item");
      newcart.dataset.id = cart.productId;
      let positionproduct = listProduct.findIndex(
        (value) => value.id == cart.productId
      );
      let info = listProduct[positionproduct];
      newcart.innerHTML = `
          <div class="image">
        <img src="${info.image}" alt="">
      </div>
      <div class="name">
        ${info.name}
      </div>
      <div class="totalprice">Rs ${info.price * cart.quantity}</div>
      <div class="quantity">
        <span class="minus">-</span>
        <span class="amount">${cart.quantity}</span>
        <span class="plus">+</span>
      </div>`;
      listCartHTML.appendChild(newcart);
    });
  }
  iconcartsSpan.innerText = totalquantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let productId = positionClick.parentElement.parentElement.dataset.id;
    //  alert(productId);
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    chnagequantity(productId, type);
  }
});

const chnagequantity = (productId, type) => {
  let positionitemincart = carts.findIndex(
    (value) => value.productId == productId
  );
  if (positionitemincart >= 0) {
    switch (type) {
      case "plus":
        carts[positionitemincart].quantity =
          carts[positionitemincart].quantity + 1;
        break;
      default:
        let valuechange = carts[positionitemincart].quantity - 1;
        if (valuechange > 0) {
          carts[positionitemincart].quantity = valuechange;
        } else {
          carts.splice(positionitemincart, 1);
        }
        break;
    }
  }
  addcarttoMemory();
  addcarttoHTML();
};
const initApp = () => {
  fetch("../products.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data;
      // console.log(listProduct)
      adddatatoHTML();

      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addcarttoHTML();
      }
    });
};

initApp();

let totalPay=0;

// console.log(TotalAmount)

function openForm() {

  if (carts.length > 0) {
    // let totalquantity = 0;
    carts.forEach((cart) => {
      // totalquantity = totalquantity + cart.quantity;
      let positionproduct = listProduct.findIndex(
        (value) => value.id == cart.productId
      );
      let info = listProduct[positionproduct];
      let add=info.price * cart.quantity;
      totalPay=totalPay+add;
    })
  }
  // let TotalAmount = document.getElementById("totalAmount");
  document.getElementById("totalAmount").value=totalPay;
  // TotalAmount = totalPay;
  // console.log(TotalAmount);
  
  document.getElementById("form22").classList.toggle("show");
}

function redirectToGooglePay() {

  window.location.href = `YOUR_GOOGLE_PAY_URL?amount=${totalPay}`;
}

function openQuery() {

  
  // TotalAmount = totalPay;
  // console.log(TotalAmount);
  event.preventDefault();
  document.getElementById("query_form").classList.toggle("show");
}


