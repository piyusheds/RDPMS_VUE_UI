<template>
  <div class="position-relative bg-white d-flex p-0">
    <div class="container-fluid sign-in-container">
      <div class="row h-100 align-items-center"
        style="min-height: 100vh; margin-left: 40px; justify-content: start !important;">
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div class="rounded sign-in-form p-4 p-sm-5 my-4 mx-3" style="background: #3c7c691f;">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <a href="index.html" class="">
                <h3 class="text-primary">
                  <img class="rounded-circle" :src="train" alt="" style="width: 40px; height: 40px;">

                </h3>
              </a>
              <h3>Sign In</h3>
            </div>

            <div class="form-floating mb-3">
              <input type="input" class="form-control" v-model="stationCode" placeholder="Station Code" />
              <label for="floatingInput">Station Code</label>
            </div>

            <div class="form-floating mb-3">
              <input type="input" class="form-control" v-model="username" placeholder="User Name" />
              <label for="floatingInput">User Name</label>
            </div>

            <div class="form-floating mb-4">
              <input type="password" class="form-control" v-model="password" placeholder="Password" />
              <label for="floatingPassword">Password</label>
            </div>

            <div class="d-flex align-items-center justify-content-between mb-4">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <router-link to="/forgetPsw">Forgot Password</router-link>
            </div>

            <button type="submit" class="btn btn-primary py-3 w-100 mb-4" @click="signIn">
              Sign In
            </button>
            <p class="text-center mb-0">
              Don't have an Account? <router-link to="/register">Sign Up</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginService from '../Services/LoginService';
import train from '/assets/howrahlogo1.jpeg';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      stationCode: '',
      username: '',
      password: '',
      train,
    };
  },
  methods: {
    async signIn() {
      const toast = useToast();

      try {
        if (!this.stationCode || !this.username || !this.password) {
          toast.error('All fields are required!');
          return;
        }

        const credentials = {
          railwayStationCode: this.stationCode,
          userId: this.username,
          password: this.password,
        };

        const response = await LoginService.login(credentials);

        const token = response; // Assuming LoginService returns the token

        if (token) {
          toast.success('Login successful!');

          // Store the token
          localStorage.setItem('authToken', token);

          // Redirect to the home page
          this.$router.push({ name: 'home' });

          this.$emit('signedIn');
        } else {
          toast.error('Login failed: Invalid credentials!');
        }
      } catch (error) {
        // Handle specific errors based on API response or error message
        if (error.response && error.response.status === 401) {
          toast.error('Invalid username or password!');
        } else if (error.response && error.response.status === 404) {
          toast.error('User not found!');
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
        console.error('Login failed:', error);
      }
    },
  },
};
</script>


<style>
.sign-in-container {
  background-image: url(/assets/oldtrain.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 100vh;
}

.sign-in-form {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 10px;
}

.btn-action {
  transition: all 0.3s ease;
}

.btn-action:active {
  transform: scale(0.95);
  background-color: #004085;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
