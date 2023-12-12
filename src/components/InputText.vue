<template>
  <div :class="type == 'text' || type == 'number' ? 'form-group' : 'form-check'">
    <label v-if="type=='text' || type == 'number'" class="control-label" :for="id">{{ title }}</label>
    <input
    :class="type == 'text' || type == 'number' ? 'form-control' : 'form-check-input'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', type == 'text' ? ($event.target as HTMLInputElement).value :($event.target as HTMLInputElement).checked )"
      :name="name"
      :id="id"
      :type="type"
      :disabled="disabled"
      :checked="(modelValue?.toString() == 'true')"
    />
    <label v-if="type=='checkbox'" class="form-check-label pl-4" for="nombre">{{ title }}</label>
    <div class="ui basic label pointing red" v-if="error[name]">
      {{ error[name] }}
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps({
  title: {
    type: String,
    required: false,
    default: ""
  },
  placeholder: {
    type: String,
    required: false,
    default: ""
  },
  name: {
    type: String,
    required: false,
    default: ""
  },
  error: {
    type: Object,
    required:false,
    default:{}
  },
  id: {
    type: String,
    required: false,
    default: ""
  },
  modelValue: {
    required: false,
  },
  disabled:{
    type: Boolean,
    required: false,
    default: false
  },
  type: {
    type: String,
    required: false,
    default: "text",
  },
  checked: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>
