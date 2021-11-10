<template>
  <div id="new-employee">
    <h3>Edit Employee</h3>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" disabled v-model="employer_id" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nom" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="departement" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
          </div>
        </div>
        <button type="submit" class="btn">Envoyer</button>
        <router-link to="/" class="btn grey">Annuler</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../components/firebaseConfig";

export default {
  name: "edit-employee",
  data: () => ({
    employer_id: null,
    nom: null,
    position: null,
    departement: null,
  }),
  beforeRouteEnter(to, from, next) {
    db.collection("employers")
      .where("employer_id", "==", to.params.employer_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((vm) => {
            vm.employer_id = doc.data().employer_id;
            vm.nom = doc.data().nom;
            vm.departement = doc.data().departement;
            vm.position = doc.data().position;
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      db.collection("employers")
        .where("employer_id", "==", this.$route.params.employer_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.employer_id = doc.data().employeer_id;
            this.nom = doc.data().nom;
            this.departement = doc.data().departement;
            this.position = doc.data().position;
          });
        });
    },
    updateEmployee() {
      db.collection("employers")
        .where("employer_id", "==", this.$route.params.employer_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                employer_id: this.employer_id,
                nom: this.nom,
                departement: this.departement,
                position: this.position,
              })
              .then(
                () => {
                  this.$router.push({
                    name: "view-employee",
                    params: { employer_id: this.employer_id },
                  });
                },
                (error) => {
                  console.error(error);
                }
              );
          });
        });
    },
  },
};
</script>