<template>
    <div class="registerPage">
        <div class="container">
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <div class="text-center">
                        <nuxt-link to="/">
                            <img src="/img/logo-black.png" />
                        </nuxt-link>
                    </div>
                    <form class="mt-4">
                        <div class="a-box a-spacing-extra-large">
                            <div class="a-box-inner">
                                <h1 class="a-spacing-small">Create account</h1>
                                <!-- Name -->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Your name</label>
                                    <input type="text" id="ap_customer_name"
                                        class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                        v-model="name" />
                                </div>
                                <!-- Password -->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Password</label>
                                    <input type="password" id="ap_customer_password"
                                        class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                        v-model="password" />
                                    <div class="a-alert-container">
                                        <div class="a-alert-content">
                                            Password must be at least 6 characters
                                        </div>
                                    </div>
                                </div>
                                <!-- Address -->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Address</label>
                                    <input type="text" id="ap_customer_address"
                                        class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                        v-model="address" />
                                </div>
                                <!-- Phone Number -->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Phone Number</label>
                                    <input type="text" id="ap_customer_phone_number"
                                        class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                        v-model="phoneNumber" />
                                </div>
                                <!-- Position -->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Position</label>
                                    <input type="text" id="ap_customer_position"
                                        class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                        v-model="position" />
                                </div>
                                <!-- Env Var -->
                                <div class="a-row a-spacing-base">
                                    <label for="ap_customer_name" class="a-form-label">Secret Code</label>
                                    <input type="text" id="ap_customer_secret_code"
                                        class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                                        v-model="envVar" />
                                </div>
                                <!-- Button -->
                                <div class="a-row a-spacing-extra-large mb-4">
                                    <span class="a-button-primary">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onSignup">
                                                Create your Admin account
                                            </span>
                                        </span>
                                    </span>
                                </div>
                                <hr />
                                <div class="a-row">
                                    <b>
                                        <nuxt-link to="/login" class="a-link-emphasis">Sign in</nuxt-link>
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
export default {
    middleware: "auth",
    auth: "guest",
    layout: "none",
    data() {
        return {
            name: "",
            password: "",
            address: "",
            phoneNumber: "",
            position: "",
            envVar: "",
        };
    },
    methods: {
        async onSignup() {
            try {
                let data = {
                    name: this.name,
                    password: this.password,
                    address: this.address,
                    phoneNumber: this.phoneNumber,
                    position: this.position,
                    envVar: this.envVar,
                };
                let response = await this.$axios.$post("/api/admin/signup", data);
                console.log(response);
                if (response.success) {
                    this.$auth.loginWith("local", {
                        data: {
                            email: this.name,
                            password: this.password,
                            envVar: this.envVar,
                        }
                    });
                    this.$router.push("/");
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
};    </script>
