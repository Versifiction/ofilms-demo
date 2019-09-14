import React, { useEffect } from "react";
import "../../App";

import Nav from "../../components/Nav";

function Faq() {
  useEffect(() => {
    document.getElementsByClassName("sidenav-overlay")[0].style.opacity = "0";
    for (
      let i = 0;
      i < document.getElementsByClassName("collapsible-body").length;
      i++
    ) {
      document.getElementsByClassName("collapsible-body")[i].style.color =
        "white";
    }
  });

  return (
    <>
      <Nav />
      <div className="container">
        <h2>FAQ</h2>
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">
              <i class="material-icons colored">question_answer</i>Comment
              s'inscrit-on ?
            </div>
            <div class="collapsible-body">
              <span>
                Pour s'inscrire, il suffit de se rendre{" "}
                <a href="/inscription">ici</a>, et de remplir le formulaire
                d'inscription.
              </span>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="material-icons colored">question_answer</i>Le site
              est-il gratuit ?
            </div>
            <div class="collapsible-body">
              <span>
                Toutes les fonctionnalités présentes sur le site sont
                effectivement gratuites, cependant certaines nécessitent d'avoir
                un compte et être connecté.
              </span>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="material-icons colored">question_answer</i>Comment
              puis-je contacter les administrateurs et/ou les modérateurs du
              site ?
            </div>
            <div class="collapsible-body">
              <span>
                Vous pouvez contacter les administrateurs et/ou les modérateurs
                du site en soumettant votre message ainsi que son objet,{" "}
                <a href="/contact">ici</a>.
              </span>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="material-icons colored">question_answer</i>Pourquoi mon
              compte a été suspendu ?
            </div>
            <div class="collapsible-body">
              <span>
                Tout compte ne respectant pas les règles élémentaires de
                savoir-vivre peut se voir suspendu.
              </span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Faq;
