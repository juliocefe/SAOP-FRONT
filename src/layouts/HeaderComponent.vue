<template>
    <nav fixed="top" class="navbar navbar-expand-md navbar-dark bg-light sub-navbar navbar-fixed-top">
        <div class="options-bar container">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'table' }">
                        Inicio
                    </router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" @click="toggleCatalogueMenu" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Catálogos
                    </a>
                    <ul class="dropdown-menu catalogue-dropdown" v-show="showCatalogueMenu">
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'listar-tipo-obra' }"
                                @click="toggleCatalogueMenu">
                                Tipo de obras
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'listar-prioridades' }"
                                @click="toggleCatalogueMenu">
                                Prioridades
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'listar-niveles-area' }"
                                @click="toggleCatalogueMenu">
                                Niveles por area
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'listar-cat_tipoProyecto' }"
                                @click="toggleCatalogueMenu">
                                Tipo de proyectos
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'listar-cat_tipoDocumento' }"
                                @click="toggleCatalogueMenu">
                                Tipo de documentos
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" @click="toggleAccountMenu" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Cuenta
                    </a>
                    <ul class="dropdown-menu account-dropdown" v-show="showAccountMenu">
                        <li>
                            <a class="dropdown-item btn" @click="handleLogout">
                                Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup lang="ts">
import {
    ref
} from 'vue';
import useAuthStore from '@/store/authenticationStore';

const authStore = useAuthStore();
const showAccountMenu = ref(false);
const showCatalogueMenu = ref(false);

const toggleAccountMenu = () => {
    showAccountMenu.value = !showAccountMenu.value
}

const toggleCatalogueMenu = () => {
    showCatalogueMenu.value = !showCatalogueMenu.value
}

const handleLogout = () => {
    authStore.logout().then(response => {
        if (response) {
            window.location.href = '/saop/'
        }
    }).catch(error => {
        console.error(error)
    })
}
</script>

<style lang="scss" scoped>
nav {
    justify-content: end;
}

.nav-link {
    outline: none;
    margin-left: 5px;
    margin-right: 5px;
}

.exact-active-link {
    color: #DDC9A3 !important;
    font-weight: bold !important;
    outline: none !important;
}

.options-bar {
    text-align: center;

    ul {
        width: 100%;
        justify-content: end;
    }
}

.catalogue-dropdown,
.account-dropdown {
    width: auto !important;
}
</style>
