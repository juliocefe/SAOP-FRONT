<!-- MyModal.vue -->
<template>
  <div>
    <div
      :class="{ 'show modal-backdrop': isModalOpen }"
      v-if="isModalOpen"
    ></div>
    <div
      class="modal fade"
      :class="{ ' show ': isModalOpen }"
      v-if="isModalOpen"
    >
      <div :class="['modal-dialog', sizeModal]" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="gridSystemModalLabel">
              {{ props.title }}
            </h4>
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="toggleModal(false)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default"
              @click="toggleModal(false)"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="toggleModal(false), emit('onSaveButton')"
            >
              {{ props.saveButtonTitle }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="btn btn-primary"
      @click="toggleModal(true)"
      v-if="!isModalOpen"
    >
      {{ props.openButtonTittle }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "My Modal Title",
  },
  saveButtonTitle: {
    type: String,
    default: "Save",
  },
  openButtonTittle: {
    type: String,
    default: "Open",
  },
  largeModal: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["onSaveButton"]);
const isModalOpen = ref(false);

const toggleModal = (open: boolean) => {
  isModalOpen.value = open;
};

const sizeModal = props.largeModal ? "modal-lg" : "";
</script>

<style scoped></style>
