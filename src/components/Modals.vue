<!-- MyModal.vue -->
<template>
    <div>
        <div :class="{ 'show modal-backdrop': isModalOpen }"></div>
        <div class="modal" :class="{ 'show': isModalOpen }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="gridSystemModalLabel">{{ title }}</h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="closeModal">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" class="btn btn-primary" @click="openModal" v-if="!isModalOpen">Open Modal</button>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const { title } = defineProps(['title']);
const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const saveChanges = () => {
    isModalOpen.value = false;
};
</script>

<style scoped>

</style>
