<template>
  <div>
    <Navbar />
    <main>
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="a-spacing-top-medium"></div>
            <h2>Add a new category</h2>
            <form>
              <div class="a-spacing-top-medium">
                <label>Type</label>
                <input class="a-input-text" style="width: 100%" v-model="type" />
              </div>

              <!-- Button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onAddCategory">Add category</span>
                  </span>
                </span>
              </div>
            </form>
            <br />
            <ul class="list-group">
              <li v-for="category in categories" :key="category._id" class="list-group-item">
                {{ category.type }}
                <button class="btn btn-danger btn-sm float-right" @click="deleteCategory(category._id)">Delete</button>
              </li>
            </ul>
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    </main>
  </div>
</template>
    
<script>
import Swal from 'sweetalert2';
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar,
  },
  middleware: 'auth',
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3001/api/categories");
      return {
        categories: response.categories
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    async onAddCategory() {
      try {
        let data = { type: this.type };
        let response = await this.$axios.$post(
          "http://localhost:3001/api/categories",
          data
        );
        this.categories.push(data);
        console.log(this.categories);
        await Swal.fire({
          icon: 'success',
          title: 'Category created successfully',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCategory(id) {
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
            `http://localhost:3001/api/categories/${id}`
          );
          this.categories = this.categories.filter(category => category._id !== id);
          console.log(this.categories);
          Swal.fire(
            'Deleted!',
            'Your category has been deleted.',
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