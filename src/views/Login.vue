<template>
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel green white-text center">
            <h3>Login</h3>
            <form @submit.prevent="login">
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="email" id="email" v-model="email" />
                <label class="white-text" for="email">Email Address</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input type="password" id="password" v-model="password" />
                <label class="white-text" for="password">Password</label>
              </div>
              <button
                type="submit"
                class="btn btn-large btn-extended grey lighten-4 black-text"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "login",
  data: () => ({
    email: null,
    password: null,
  }),
  methods: {
    login(e) {
      e.preventDefault();
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (userCredential) => {
            alert(`Vous êtes connecté avec : ${userCredential.user.email}`);
            this.$router.push('/')
          },
          (err) => {
            alert(err.message);
          }
        );
    },
  },
};
</script>