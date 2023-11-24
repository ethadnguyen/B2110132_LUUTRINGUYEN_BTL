<template>
    <div>
        <Navbar />
        <div>
            <h1 class="display-4">Users</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user._id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
    components: {
        Navbar,
    },
    data() {
        return {
            users: [],
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await this.$axios.$get('http://localhost:3001/api/auth/users');
                this.users = response.users;
                console.log(this.users)
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
