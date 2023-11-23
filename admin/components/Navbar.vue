<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/">EthadZONE</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <nuxt-link to="/products" class="nav-link">Add Products</nuxt-link>
                <nuxt-link to="/category" class="nav-link">Add Categories</nuxt-link>
                <nuxt-link to="/owner" class="nav-link">Add Owners</nuxt-link>
                <nuxt-link to="/users" class="nav-link">Users</nuxt-link>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav } from 'bootstrap-vue'
export default {
    components: {
        BNavbar,
        BNavbarBrand,
        BNavbarToggle,
        BCollapse,
        BNavbarNav
    }
}
</script>