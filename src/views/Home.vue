<template>
  <div id="home">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Employers</h4></li>
      <li
        v-for="employer in employers"
        :key="employer.id"
        class="collection-item"
      >
        <div class="chip">{{ employer.departement }}</div>
        {{ employer.employer_id }}: {{ employer.nom }}
        <router-link
          class="secondary-content"
          :to="{
            name: 'view-employee',
            params: { employer_id: employer.employer_id },
          }"
          ><i class="material-icons">visibility</i
        ></router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "../components/firebaseConfig";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      employers: [],
      loading: true,
    };
  },
  created() {
    db.collection("employers")
      .orderBy("position")
      .get()
      .then((querySnapshot) => {
        this.loading = false;
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            employer_id: doc.data().employer_id,
            nom: doc.data().nom,
            departement: doc.data().departement,
            position: doc.data().position,
          };
          this.employers.push(data);
        });
      });
  },
};
</script>
