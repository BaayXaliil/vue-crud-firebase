<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ nom }}</h4>
      </li>
      <li class="collection-item">Employer ID#: {{ employer_id }}</li>
      <li class="collection-item">Department: {{ departement }}</li>
      <li class="collection-item">Position: {{ position }}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteEmployee" class="btn red">Supprimer</button>

    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{
          name: 'edit-employee',
          params: { employer_id: employer_id }
        }"
        class="btn-floating btn-large red"
      >
        <i class="material-icons">edit</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "../components/firebaseConfig";

export default {
  name: "view-employee",
  data: () => ({
    employer_id: null,
    nom: null,
    departement: null,
    position: null,
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
    deleteEmployee() {
      if (confirm("Etes-vous sûre ?")) {
        db.collection("employers")
          .where("employer_id", "==", this.$route.params.employer_id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete()
              this.$router.push("/");
            });
          });
      }
    },
  },
};
</script>