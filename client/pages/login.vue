<template>
  <div class="registerPage">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <div class="text-center">
            <nuxt-link to="/">
              <img src="/img/logo-name.jpg" />
            </nuxt-link>
          </div>
          <form class="mt-4">
            <div class="a-box a-spacing-extra-large">
              <div class="a-box-inner">
                <h1 class="a-spacing-small">Sign In</h1>
                <!-- Email -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label">Email</label>
                  <input type="email" id="ap_customer_email"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="email" />
                </div>
                <!-- Password -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label">Password</label>
                  <input type="password" id="ap_customer_password"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="password" />
                  <div class="a-alert-container">
                    <div class="a-alert-content">Password must be at least 6 characters</div>
                  </div>
                </div>
                <!-- Button -->
                <div class="a-row a-spacing-extra-large mb-4">
                  <span class="a-button-primary">
                    <span class="a-button-inner">
                      <span class="a-button-text" @click="onLogin">Continue</span>
                    </span>
                  </span>
                  <div class="a-row a-spacing-top-medium a-size-small">
                    <b>
                      By creating an account, you agree to EthadZone's
                      <a href="#">Conditions of Use</a> and
                      <a href="#">Privacy Notice</a>
                    </b>
                  </div>
                </div>
                <hr />
                <div class="a-row">
                  <b>
                    Don't have an account?
                    <nuxt-link to="/signup" class="a-link-emphasis">Signup</nuxt-link>
                  </b>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  middleware: "auth",
  auth: "guest",
  layout: "none",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async onLogin() {
      if (!this.email || !this.password) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter both email and password',
        });
        return;
      }

      try {
        let data = {
          email: this.email,
          password: this.password
        };
        let response = await this.$axios.$post("/api/auth/login", data);
        console.log(response);
        this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Login Success',
          text: 'You have successfully logged in',
        });
        this.$auth.$state.loggedIn = true
        this.$router.push("/");
      }
      catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Incorrect email or password',
        });
        console.log(err);
      }
    }
  },
};
</script>