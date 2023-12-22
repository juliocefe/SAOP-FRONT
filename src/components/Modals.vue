<!-- MyModal.vue -->
<template>
    <div>
        <div :class="{ 'show modal-backdrop': isModalOpen }"></div>
        <div class="modal" :class="{ 'show': isModalOpen }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="gridSystemModalLabel">{{ title }}</h4>
                        <button type="button" class="close" aria-label="Close" @click="toggleModal(false)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="toggleModal(false)">Close</button>
                        <button type="button" class="btn btn-primary" @click="toggleModal(false), emit('onSaveButton')">{{
                            saveButtonTitle }}</button>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" class="btn btn-primary" @click="toggleModal(true)" v-if="!isModalOpen">{{ openButtonTittle
        }}</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { title, saveButtonTitle, openButtonTittle } = defineProps(['title', 'saveButtonTitle', 'openButtonTittle']);
const emit = defineEmits(['onSaveButton']);
const isModalOpen = ref(false);

const toggleModal = (open: boolean) => {
    isModalOpen.value = open;
};

</script>

<style scoped></style>
