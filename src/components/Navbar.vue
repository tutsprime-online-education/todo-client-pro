<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container py-2">
            <a href="#" class="navbar-brand">
                <span>Toedoe</span>
                <strong>List</strong>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav" v-if="store.isLoggedIn">
                    <li class="nav-item">
                        <router-link :to="{ name: 'tasks' }" class="nav-link">Tasks</router-link>
                        <!-- <a href="#" @click.prevent="$router.push('/tasks')" class="nav-link">Tasks</a> -->
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'summary' }" class="nav-link">Summary</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <template v-if="!store.isLoggedIn">
                        <li class="nav-item">
                            <router-link :to="{ name: 'login' }" class="btn btn-outline-secondary ms-2">Login</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'register' }" class="btn btn-danger ms-2">Register</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <Dropdown class="nav-item">
                            <template #toggler="{ toggleClass, toggle }">
                                <a class="nav-link dropdown-toggle" :class="toggleClass" @click.prevent="toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ store.user.name }}
                                </a>
                            </template>
                            <template #menu="{ toggle }">
                                <li><a href="#" class="dropdown-item" @click.prevent="toggle(), logout()">Logout</a></li>
                            </template>
                        </Dropdown>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Dropdown from "./dropdown/Dropdown.vue";

const router = useRouter()
const store = useAuthStore()

const logout = async () => {
    await store.handleLogout()
    router.push({ name: 'login' })
}
</script>
<style scoped>
.nav-link.router-link-active {
    color: rgba(0,0,0,.9);
}
</style>