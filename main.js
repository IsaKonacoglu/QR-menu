import { buttonsData, menu } from "./js/db.js";
import { calculatePrice, elements } from "./js/helpers.js";

const renderMenuItems = (menuItems) => {
  
  let menuHTML = menuItems.map(
    (item) =>
      `
      <a
      href="/productDetail.html?id=${item.id}"
      class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
      id="card"
      >
          <img src="${item.img}" class="rounded shadow" />
          <div>
          <div class="d-flex justify-content-between">
              <h5>${item.title}</h5>
              <p class="text-success">${calculatePrice(item.price)} ₺</p>
          </div>
          <p class="lead">
              ${item.desc}
          </p>
          </div>
      </a>`
  );
  //   let menuHTML = menuItems.map((item) => {
  //     return `
  //     <a
  //     href="productDetail.html?id=2"
  //     class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
  //     id="card"
  //     >
  //         <img src="${item.img}" class="rounded shadow" />
  //         <div>
  //         <div class="d-flex justify-content-between">
  //             <h5>${item.title}</h5>
  //             <p class="text-success">${item.price} ₺</p>
  //         </div>
  //         <p class="lead">
  //             ${item.desc}
  //         </p>
  //         </div>
  //     </a>`;
  //   });
  menuHTML = menuHTML.join("");
  elements.menuArea.innerHTML = menuHTML;
};

const searchCategory = (e) => {
  const category = e.target.dataset.category;

  const filtredMenu = menu.filter((item) => item.category === category);

  if (category == "undefined") {
    return;
  } else if (category === "all") {
    renderMenuItems(menu);
  } else {
  
    renderMenuItems(filtredMenu);
  }

  renderButtons(category);
};

const renderButtons = (active) => {
  console.log(active);

  elements.buttonsArea.innerHTML = "";
  
  buttonsData.forEach((btn) => {
    console.log(btn);
    const buttonEle = document.createElement("button");
    
    buttonEle.className = "btn btn-outline-dark filter-btn";
   
    buttonEle.textContent = btn.text;
    
    buttonEle.dataset.category = btn.value;
 
    if (btn.value === active) {
      buttonEle.classList.add("bg-dark", "text-light");
    }
 
    elements.buttonsArea.appendChild(buttonEle);
  });
};


document.addEventListener("DOMContentLoaded", () => {
  renderButtons("all");
  renderMenuItems(menu);
});
elements.buttonsArea.addEventListener("click", searchCategory);