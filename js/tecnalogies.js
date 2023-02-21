
const elTmpTechnalogies = document.querySelector(".technalogies-tpmt").content;
const elTechnalogyBox=document.querySelector(".pro-tech_list")

async function GetTech() {
    try {
      const res = await fetch(`http://localhost:1212/api/technology`);
      const data = await res.json();
      if (res.status == 200) {
        console.log(data);
        getTechnalogies(data);
      }
    } catch (error) {
      console.log(error);
    }
  }


function getTechnalogies(arrayMatras) {
    elTechnalogyBox.innerHTML = "";
  
    let fragment = document.createDocumentFragment();
  
    arrayMatras.forEach((element) => {
      let cloneTemplate = elTmpTechnalogies.cloneNode(true);
      cloneTemplate.querySelector(".pro-tech_list-title").textContent = element.name;
      cloneTemplate.querySelector(".pro-tech_list-text").textContent = element.description;
      cloneTemplate.querySelector(".pro-tech-iframe").src = `https://www.youtube.com/embed/${element.link}`;
      fragment.appendChild(cloneTemplate);
    });
    elTechnalogyBox.appendChild(fragment);
  }


  GetTech()