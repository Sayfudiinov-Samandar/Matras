const elArdrresList = document.querySelector(".swiper-wrapper");

async function GetTech() {
  try {
    const res = await fetch(`http://localhost:1212/api/address`);
    const data = await res.json();
    if (res.status == 200) {
      console.log(data);
      createArresCarusel(data);
    }
  } catch (error) {
    console.log(error);
  }
}

function createArresCarusel(data) {
//   elArdrresList.innerHTML = "";

//   data.forEach((elm) => {
//     elArdrresList.innerHTML += `

//     `
//   });
}
GetTech();
