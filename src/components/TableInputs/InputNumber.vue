<template>
    <input type="text" class="form-control" :value="vModel" @input="handleInput" @copy="$event.preventDefault()"
        @paste="$event.preventDefault()" @cut="$event.preventDefault()"
        @keypress="isNumberTable(vModel, $event, typeTableProp, undefined)" @blur="handleBlur" />
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import { TypeTable } from "@/utils/enums/TypeTableEnums";
import type { PropType } from 'vue';
import { isNumberTable } from "@/utils/helpers";
const {
    typeTableProp,
    vModel
} = defineProps({
    typeTableProp: {
        type: String,
        required: true,
    },
    vModel: {
        type: [String, Number] as PropType<string | number>,
        required: true
    }
})

const emit = defineEmits(['updateTotal', 'update:vModel'])

const handleInput = (event: any) => {
    emit('update:vModel', event.target.value);

    if (typeTableProp === TypeTable.RED_CAPUFE_AUTOPISTAS) {
        emit('updateTotal', event.target.value);
    }
}

const handleBlur = (value: any) => {

    if (typeTableProp === TypeTable.RED_CAPUFE_PUENTES || typeTableProp === TypeTable.RED_CAPUFE_AUTOPISTAS) {
        if (value.target.value === '') {
            emit('update:vModel', "0.00");
        } else if (value.target.value === '.') {
            emit('update:vModel', "0.00");
        } else if (value.target.value < 0) {
            emit('update:vModel', "0.00");
        }
        else {
            emit('update:vModel', Number(value.target.value).toFixed(2));
        }
    }
}

</script>