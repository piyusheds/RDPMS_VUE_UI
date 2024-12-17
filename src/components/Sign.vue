<template>
    <div class=" position-relative bg-white d-flex p-0">
      <div class="container-fluid sign-in-container" >
        <div
          class="row h-100 align-items-center "
          style="min-height: 100vh;     margin-left: 40px; 
      justify-content: start !important;"
        >
          <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div class="rounded sign-in-form p-4 p-sm-5 my-4 mx-3" style="background: #3c7c691f;">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <a href="index.html" class="">
                  <h3 class="text-primary" ><img src="src/assets/howrahlogo1.jpeg" alt="" style="    width: 57px;
      border-radius: 30px;"></h3>
                </a>
                <h3>Sign In</h3>
              </div>
              <!-- <div class="form-floating mb-3">
                <input
                  type="input"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Station Name</label>
              </div> -->
              <div class="form-floating mb-3">
                <input
                  type="input"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput"> Station Code</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="input"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">User Name</label>
              </div>
              <div class="form-floating mb-4">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Password</label>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-4">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1"
                    >Check me out</label
                  >
                </div>
                <a href="">Forgot Password</a>
              </div>
              <button type="submit"  class="btn btn-primary py-3 w-100 mb-4" @click="signIn">
                Sign In
              </button>
              <p class="text-center mb-0">
                Don't have an Account? <a href="" @click.prevent="goToRegister">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  /* Apply the background image to the sign-in container */
  .sign-in-container {
    background-image: url(src/assets/oldtrain.jpg);
    background-size: cover;
    background-position: center;
    position: relative;
    min-height: 100vh;
  }
  
  
  /* Set the background of the form to be transparent with a slight blur effect */
  .sign-in-form {
    background-color: rgba(255, 255, 255, 0.7); /* Slight transparency */
    backdrop-filter: blur(5px); /* Optional: adds a blur effect behind the form */
    border-radius: 10px; /* Optional: rounded corners for the form */
  }
  
  /* Button transition effect */
  .btn-action {
    transition: all 0.3s ease; 
  }
  
  .btn-action:active {
    transform: scale(0.95); 
    background-color: #004085; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  </style>
  
  <script setup>



  const emit = defineEmits()
  
  const signIn = () => {
    emit('signedIn')
  }

  const goToRegister = () => {
  // Use Vue Router to navigate to the /register route
  router.push('/Register')
}
  </script>