 <template>
  <nav>
    <div class="nav-wrapper green">
      <div class="container">
        <router-link to="/" class="">Employee Manager</router-link>
        <ul class="right">
          <li v-if="isLoggedIn">
            <span class="email black-text">{{ currentUser }}</span>
          </li>
          <li v-if="isLoggedIn">
            <router-link :to="{ path: '/' }">Dashboard</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{ path: 'login' }">Login</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'register' }">Register</router-link>
          </li>
          <li v-if="isLoggedIn">
            <button @click="logout" class="btn black">Logout</button>
          </li>
        </ul>
        <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
        <transition name="mobile-nav">
          <ul class="mobile-nav" v-show="mobileNav">
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" to="#">Blogs</router-link>
          </ul>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import MenuIcon from "../assets/Icons/bars-regular.svg";

export default {
  name: "navbar",
  data: () => ({
    isLoggedIn: false,
    currentUser: false,
    mobile: null,
    mobileNav: null,
    windowWidth: null,
  }),
  components: {
    MenuIcon,
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  watch: {
    $route: "refresh",
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
          window.location.reload();
        });
    },
    refresh() {
      console.log("refresh");
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
      }
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
      console.log(this.mobileNav);
    },
  },
};
</script>
<style lang="scss" scoped>
.email {
  padding-right: 10px;
}
.container {
  position: relative;
}
.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 25px;
  height: 25px;
  width: auto;
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
  z-index: 10;
  .link {
    padding: 15px 0;
    color: #fff;
  }
}
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}
.mobile-nav-enter {
  transform: translateX(-250px);
}
.mobile-nav-enter-to {
  transform: translateX(0px);
}
.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
