<template>
    <div class="form-group m-0">
            <div>
                <span class="font-weight-bold pr-2">Buscar: </span>
            </div>
            <div>
                <input class="form-control w-auto" placeholder="Teclea tu búsqueda" type="text" @keyup.enter="search($event)" />
            </div>
    </div>
</template>
<script setup lang="ts">

const emit = defineEmits(["onSearch"]);

const search = (event:any) => {
    const data = event.target.value
    emit('onSearch', data)
}
</script>
<style lang="scss" scoped>
    .form-group {
        display: flex;
        align-items: center;
    }
</style>
  