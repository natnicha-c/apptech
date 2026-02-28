const companyList = document.getElementById("companyList");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("closeBtn");
const overlayLogo = document.getElementById("overlayLogo");
const overlayTitle = document.getElementById("overlayTitle");
const overlayDesc = document.getElementById("overlayDesc");
const overlayLink = document.getElementById("overlayLink");

function openOverlay() {
  overlay.style.display = "flex";
  document.body.classList.add("modal-open");
}

function closeOverlay() {
  overlay.style.display = "none";
  document.body.classList.remove("modal-open");
}

function handleOverlayClick(event) {
  if (!event.target.closest(".overlay-box")) {
    closeOverlay();
  }
}

function createCompanyCard(company) {
  const article = document.createElement("article");

  const logo = document.createElement("img");
  logo.src = company.img;

  const title = document.createElement("h2");
  title.textContent = company.name;

  const desc = document.createElement("p");
  desc.textContent = company.desc;

  const button = document.createElement("button");
  button.textContent = "รายละเอียด";

  button.addEventListener("click", () => {
    overlayLogo.src = company.img;
    overlayTitle.textContent = company.name;
    overlayDesc.textContent = company.desc;
    overlayLink.href = company.url;
    openOverlay();
  });

  article.append(logo, title, desc, button);
  return article;
}

fetch("web.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(company => {
      companyList.appendChild(createCompanyCard(company));
    });
  });

closeButton.addEventListener("click", closeOverlay);
overlay.addEventListener("click", handleOverlayClick);