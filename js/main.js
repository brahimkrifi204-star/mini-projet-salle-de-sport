

burger.addEventListener("click", function () {
  menu.classList.toggle("ouvert");
  burger.setAttribute("aria-expanded", menu.classList.contains("ouvert"));
});


const boutons = document.querySelectorAll(".filtres button");
const cartes = document.querySelectorAll(".carte");

boutons.forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    const choix = bouton.dataset.filtre;

    boutons.forEach(function (b) { b.classList.remove("actif"); });
    bouton.classList.add("actif");

    cartes.forEach(function (carte) {
      if (choix === "tous" || carte.dataset.categorie === choix) {
        carte.classList.remove("cachee");
      } else {
        carte.classList.add("cachee");
      }
    });
  });
});


const form = document.getElementById("form-contact");


function verifier(champ, estValide, message) {
  const zone = document.getElementById("err-" + champ.id);
  zone.textContent = estValide ? "" : message;
  champ.classList.toggle("invalide", !estValide);
  return estValide;
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");
    const message = document.getElementById("message");

    const ok1 = verifier(nom, nom.value.trim().length >= 2, "Nom : 2 caractères minimum.");
    const ok2 = verifier(email, /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.value), "E-mail invalide (ex : nom@exemple.tn).");
    const ok3 = verifier(tel, /^\+216[0-9]{8}$/.test(tel.value), "Téléphone : +216 suivi de 8 chiffres.");
    const ok4 = verifier(message, message.value.trim().length >= 10, "Message : 10 caractères minimum.");

    const confirmation = document.getElementById("confirmation");
    if (ok1 && ok2 && ok3 && ok4) {
      confirmation.textContent = "Merci " + nom.value.trim() + ", votre message est bien reçu !";
      confirmation.hidden = false;
      form.reset();
    } else {
      confirmation.hidden = true;
    }
  });
}
