<template>
  <div>
    <Navbar />
    <main>
      <div class="a-spacing-large"></div>
      <div class="container-fluid browsing-history">
        <div class="row">
          <div class="col-sm-8 col-8">
            <h1 class="a-size-large a-spacing-none a-text-normal">All products</h1>
            <div class="a-spacing-large"></div>
            <!-- Listing page -->
          </div>
        </div>
      </div>
      <div class="a-spacing-large"></div>
      <div class="container-fluid browsing-history">
        <div class="row">
          <div v-for="(product, index) in products" :key="product._id"
            class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 br bb">
            <div class="history-box">
              <!-- Product image -->
              <a href="#" class="a-link-normal">
                <img :src="product.photo" class="img-fluid" />
              </a>
              <!-- Product title -->
              <div class="a-spacing-top-base asin-title">
                <span class="a-text-normal">
                  <div class="p13n-sc-truncated">{{ product.title }}</div>
                </span>
              </div>
              <!-- Product rating -->
              <div class="a-row">
                <a href="#">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </a>
                <span class="a-letter-space"></span>
                <span class="a-color-tertiary a-size-small asin-reviews">(1732)</span>
              </div>
              <!-- Product price -->
              <div class="a-row">
                <span class="a-size-base a-color-price">
                  <span class="p13n-sc-price">${{ product.price }}</span>
                </span>
              </div>
              <!-- Product Buttons -->
              <div class="a-row">
                <nuxt-link :to="`/products/${product._id}`" class="a-button-history margin-right-10">Update</nuxt-link>
                <a href="#" class="a-button-history margin-right-10" @click="onDeleteProduct(product._id, index)">
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    Navbar
  },
  middleware: ['auth'],
  methods: {
    logout() {
      this.$auth0.logout({
        returnTo: window.location.origin + process.env.AUTH0_CALLBACK_ROUTE
      })
    }
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3001/api/products");
      console.log(response);
      return {
        products: response.products
      };
    } catch (err) { }
  },
  methods: {
    async onDeleteProduct(id, index) {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        if (result.isConfirmed) {
          let response = await this.$axios.$delete(
            `http://localhost:3001/api/products/${id}`
          );
          if (response.status) {
            // remove
            this.products.splice(index, 1);
          }
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
