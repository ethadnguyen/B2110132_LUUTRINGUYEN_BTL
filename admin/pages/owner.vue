<template>
  <div>
    <Navbar />
    <main>
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="a-spacing-top-medium"></div>
            <h2>Add a new owner</h2>
            <form>
              <!-- Name -->
              <div class="a-spacing-top-medium">
                <label>Name</label>
                <input class="a-input-text" style="width: 100%" v-model="name" />
              </div>

              <!-- About -->
              <div class="a-spacing-top-medium">
                <label>About</label>
                <input class="a-input-text" style="width: 100%" v-model="about" />
              </div>

              <!-- Photo file -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Add Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="onFileSelected" />
                    <p style="margin-top: -70px">{{ fileName }}</p>
                  </label>
                </div>
              </div>

              <!-- Button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onAddOwner">Add Owner</span>
                  </span>
                </span>
              </div>
            </form>
            <br />
            <ul class="list-group">
              <li v-for="owner in owners" :key="owner._id" class="list-group-item">
                {{ owner.name }}
                <button class="btn btn-danger btn-sm float-right" @click="confirmDeleteOwner(owner._id)">Delete</button>
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
      let response = await $axios.$get("http://localhost:3001/api/owners");
      return {
        owners: response.owners
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      name: "",
      about: "",
      selectedFile: null,
      fileName: ""
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    async onAddOwner() {
      try {
        let data = new FormData();
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.selectedFile, this.selectedFile.name);
        let response = await this.$axios.$post(
          "http://localhost:3001/api/owners",
          data
        );
        this.owners.push(this.name);
        console.log(this.owners);
        Swal.fire({
          title: 'Success!',
          text: 'Owner has been successfully created.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteOwner(id) {
      try {
        let response = await this.$axios.$delete(`http://localhost:3001/api/owners/${id}`);
        this.owners = this.owners.filter(owner => owner._id !== id);
      } catch (err) {
        console.log(err);
      }
    },
    confirmDeleteOwner(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteOwner(id);
          Swal.fire(
            'Deleted!',
            'Your owner has been deleted.',
            'success'
          )
        }
      })
    }
  }
};
</script>