<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-bg-dark">
            <router-link to="/" class="navbar-brand">
                <img style="max-height:40px;" src="../assets/logo.png" />
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" exact>
                            Home
                        </router-link>
                    </li>
                    <!-- IF LOGGED IN -->
                    <li v-if="$store.state.isLoggedIn" class="nav-item">
                        <router-link to="/shop" class="nav-link" exact>
                            Shop
                        </router-link>
                    </li>
                    <li v-if="$store.state.isLoggedIn" class="nav-item">
                        <router-link :to="{ name: 'OrderHistory', params: { id: $store.state.userId } }" class="nav-link" exact>
                            Order History
                        </router-link>
                    </li>
                    <!-- IF ADMIN -->
                    <li v-if="$store.state.isLoggedIn && $store.state.isAdmin" class="nav-item">
                        <router-link to="/create_item" class="nav-link" exact>
                            Create Item
                        </router-link>
                    </li>
                    <li v-if="$store.state.isLoggedIn && $store.state.isAdmin" class="nav-item">
                        <router-link to="/manage_kitchen" class="nav-link" exact>
                            Manage Kitchen
                        </router-link>
                    </li>
                    <li v-if="$store.state.isLoggedIn && $store.state.isAdmin" class="nav-item">
                        <router-link to="/process_submission" class="nav-link" exact>
                            Process Submissions
                        </router-link>
                    </li>
                    <!-- IF NOT LOGGED IN -->
                    <li v-if="!$store.state.isLoggedIn" class="nav-item">
                        <router-link to="/register" class="nav-link" exact>
                            Register
                        </router-link>
                    </li>
                    <li v-if="!$store.state.isLoggedIn" class="nav-item">
                        <router-link to="/login" class="nav-link" exact>
                            Login
                        </router-link>
                    </li>
                    <li v-if="$store.state.isLoggedIn" class="nav-item">
                        <a v-on:click.prevent="logout()" class="nav-link" href="#">Logout</a>
                    </li>
                    <li class="nav-item">
                        <!-- Display the current user's username in the navbar -->
                        <a class="nav-link" href="#">
                            {{ this.$store.state.username ? this.$store.state.username : 'User' }}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
    import * as auth from '../services/AuthService'

    export default {
        name: 'Navbar',
        methods: {
            logout: function() {
                auth.logout()
                this.$router.push({ name: 'Home' })
            }
        }
    }
</script>