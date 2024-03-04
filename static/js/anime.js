const populate = () => {
  const obj = JSON.parse(sessionStorage.getItem("obj")).results;
  const cards = document.querySelector(".cards");

  // console.log(obj);

  obj.forEach((result) => {
    const card = document.createElement("div");

    const card__image = document.createElement("div");
    card__image.classList.add("card-image");
    const image = document.createElement("img");
    image.src = result.img;

    image.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `show/${result.id}`;
    });

    card__image.appendChild(image);
    card.appendChild(card__image);

    const card__details = document.createElement("div");
    card__details.classList.add("card-details");
    const card_name = document.createElement("div");
    card_name.innerText = result.title;
    const released = document.createElement("div");
    released.innerText = result.releaseDate.split("Released: ")[1];
    card__details.appendChild(card_name);
    card__details.appendChild(released);

    card.appendChild(card__details);
    cards.appendChild(card);
  });
};
