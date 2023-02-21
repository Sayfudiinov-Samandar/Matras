const elTmpActivProduct = document.querySelector(".active-product").content;
let alActiveProductList = document.querySelector(".main-list");
//orders
const elFormMadalOrder = document.querySelector(".madal-order-add-form");
const elOrderName = document.querySelector(".order-name-inp");
const elOderPhone = document.querySelector(".order-tel-inp");
const elOrderProductName = document.querySelector(".order-name-input-product");

const elOrderProductBox = document.querySelector(".madal-box");
const elOrderProductSeccsesBox = document.querySelector(".order-succses-box");

const elOrderProductCategoryList = document.querySelector(".hero-cotegory-list");



// count
const elOrderProductCountMin = document.querySelector(".madal-count-min");
const elOrderProductCountPls = document.querySelector(".madal-count-pls");
const elOrderProductCount = document.querySelector(".madal-count-summ");

/// contact
const elContactForm=document.querySelector(".contact-form")
const elContactInp=document.querySelector(".contact-submit-inp")


elContactForm.addEventListener("submit",(evt)=>{
  evt.preventDefault()

  const contactObj={
    "number":elContactInp.value.trim()
 }
  postContact(contactObj)
})


async function postContact(dataInfo) {
  try {
    const response = await fetch(`http://localhost:1212/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataInfo),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}



var count = 0;
elOrderProductCountMin.addEventListener("click", () => {
  if (count) {
    count--;
    elOrderProductCount.textContent = count;
  } else {
    elOrderProductCount.textContent = 0;
  }
});

elOrderProductCountPls.addEventListener("click", () => {
  count++;
  elOrderProductCount.textContent = count;
});

elFormMadalOrder.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const orderData = {
    name: elOrderName.value.trim(),
    number: elOderPhone.value.trim(),
    productName: elOrderProductName.value.trim(),
    count: count,
  };
  postProduct(orderData);
});

async function postProduct(dataInfo) {
  try {
    const response = await fetch(`http://localhost:1212/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataInfo),
    });

    const data = await response.json();
    if (response.status===201) {
      console.log(response);
      elOrderProductBox.classList="order-none"
      elOrderProductSeccsesBox.classList=""
    }
  } catch (error) {
    console.log(error);
  }
}

async function GetProduct() {
  try {
    const res = await fetch(`http://localhost:1212/api/products`);
    const data = await res.json();
    if (res.status == 200) {
      console.log(data);
      MakeListProduct(data.products);
    }
  } catch (error) {
    console.log(error);
  }
}

function MakeListProduct(arrayMatras) {
  alActiveProductList.innerHTML = "";

  let fragment = document.createDocumentFragment();

  arrayMatras.forEach((element) => {
    let cloneTemplate = elTmpActivProduct.cloneNode(true);
    const img = element.product_images
      .replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll('"', "")
      .split(",")[0];



    cloneTemplate.querySelector(
      ".product-img",
    ).src = `http://localhost:1212/${img}`;

    cloneTemplate.querySelector(".main_list-title").textContent = element.name;
    cloneTemplate.querySelector(".size-product").textContent = element.size;
    cloneTemplate.querySelector(".product-waryanty").textContent =
      element.warranty + "yil";
    cloneTemplate.querySelector(".weight-product").textContent =
      element.weight + " kg";
    cloneTemplate.querySelector(".capacity-product").textContent =
      element.capacity + " kishilik";
    cloneTemplate.querySelector(".main-list-matras-info").textContent =
      element.body;
    cloneTemplate.querySelector(".main-list-mahsulot-price").textContent =
      element.cost + " so'm";
    cloneTemplate.querySelector(".main-list-to-order-btn").dataset.productId =
      element.id;

    cloneTemplate.querySelector(".main-list-to-order-btn").addEventListener("click",()=>{
      elOrderProductBox.classList="madal-box"
      elOrderProductSeccsesBox.classList="order-none"
    });

    fragment.appendChild(cloneTemplate);
  });
  alActiveProductList.appendChild(fragment);
}



GetProduct();
