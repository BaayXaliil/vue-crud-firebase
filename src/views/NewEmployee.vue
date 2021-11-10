<template>
  <div id="new-employee">
    <h3>Nouvel Employer</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="employer_id" required />
            <label>ID employer:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nom" required />
            <label>Nom</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="departement" required />
            <label>Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
            <label>Position</label>
          </div>
        </div>
        <button type="submit" class="btn">Ajouter</button>
        <router-link to="/" class="btn grey">Annuler</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../components/firebaseConfig";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "new-employee",
  data: () => ({
    employer_id: "",
    nom: "",
    departement: "",
    position: "",
  }),
  methods: {
    saveEmployee() {
      db.collection("employers")
        .add({
          employer_id: this.employer_id,
          nom: this.nom,
          departement: this.departement,
          position: this.position,
        })
        .then((docRef) => {
          console.log("Client ajouter: ", docRef.id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Erreur d'ajout de client: ", error);
        });
    },
  },
};
</script>