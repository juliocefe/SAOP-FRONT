<template>
    <div>
        <h4 class="view-name">{{ viewName }}</h4>
        <hr class="red">
        <div class="row app-options-bar">
            <div class="d-flex align-items-center buttons-component align-items-center">
                <div class="col-md-8">
                    <!-- <ButtonBarComponent @onCreate="handleCreate" :show-subactions="false" /> -->
                </div>
                <AccionesCartera />
            </div>
        </div>
        <div class="d-flex">
            <div class="col-6">
                <SelectComponent :disabled="readOnlyView === true" v-model="data.anio_base" title="Año Base:"
                    placeholder="Seleccione..." name="anio_base" id="anio_base" :error="errors" class="col-sm-12 mb-5"
                    :options="YEARS" :optionText="'value'" />

                <strong class="px-4" style="font-size: 2rem;">Montos de Inversión</strong>

                <InputText :disabled="readOnlyView" v-model.trim="data.financiamiento_adicional"
                    title="Financiamiento Adicional:" placeholder="0.00" name="financiamiento_adicional"
                    id="financiamiento_adicional" :error="errors" class="col-sm-12 mt-4" />
                <InputText :disabled="readOnlyView" v-model.trim="data.inversion_total" title="Inversión Total:"
                    placeholder="0.00" name="inversion_total" id="inversion_total" :error="errors" class="col-sm-12" />
                <InputText :disabled="readOnlyView" v-model.trim="data.gastos_de_estimaciones_operacionales"
                    title="Gastos de Estimaciones Operacionales:" placeholder="0.00"
                    name="gastos_de_estimaciones_operacionales" id="gastos_de_estimaciones_operacionales" :error="errors"
                    class="col-sm-12" />
                <InputText :disabled="readOnlyView" v-model.trim="data.otros_costos" title="Otros Costos:"
                    placeholder="0.00" name="otros_costos" id="otros_costos" :error="errors" class="col-sm-12" />
                <InputText :disabled="readOnlyView" v-model.trim="data.valor_presente_neto" title="Valor Presente Neto:"
                    placeholder="0.00" name="valor_presente_neto" id="valor_presente_neto" :error="errors"
                    class="col-sm-12" />
                <InputText :disabled="readOnlyView" v-model.trim="data.costo_anual_equivalente"
                    title="Costo Anual Equivalente:" placeholder="0.00" name="costo_anual_equivalente"
                    id="costo_anual_equivalente" :error="errors" class="col-sm-12" />
                <InputText :disabled="readOnlyView" v-model.trim="data.aportacion_estatal" title="Aportación Estatal:"
                    placeholder="0.00" name="aportacion_estatal" id="aportacion_estatal" :error="errors"
                    class="col-sm-12" />
            </div>
            <div class="d-flex flex-column col-6">
                <strong style="font-size: 2rem;">Indicadores Financieros</strong>
                <InputText :disabled="readOnlyView" v-model.trim="data.tasa_interna_de_retorno"
                    title="Tasa Interna de Retorno:" placeholder="0.00" name="tasa_interna_de_retorno"
                    id="tasa_interna_de_retorno" :error="errors" class="mt-5" />
                <InputText :disabled="readOnlyView" v-model.trim="data.tasa_de_rendimiento_inmediata"
                    title="Tasa de Rendimiento Inmediata:" placeholder="0.00" name="tasa_de_rendimiento_inmediata"
                    id="tasa_de_rendimiento_inmediata" :error="errors" />
                <InputText :disabled="readOnlyView" v-model.trim="data.tasa_de_descuento" title="Tasa de Descuento:"
                    placeholder="0.00" name="tasa_de_descuento" id="tasa_de_descuento" :error="errors" />

                <div class="text-right pr-2 flex-grow-1 mt-5">
                    <button title="Crear" class="dt-button btn btn-primary active btn-crear" type="button"
                        @click="handleSubmit()">
                        <span><i class="bi bi-plus"></i> <b>Crear</b></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import AccionesCartera from '@/components/AccionesCarteraPoyectos.vue'
import SelectComponent from "@/components/SelectComponent.vue";
import InputText from "@/components/InputText.vue";
import { useFormValidation } from "@/composables/useFormValidation";
import { financialDataValidations } from "@/utils/validations/financialDataValidations";
import {  useRouter } from "vue-router";
import { IFinancialData, defaultValues } from "@/utils/models/financialDataModel";
import usePetition from "@/composables/usePetition";
//TODO YEARS will be replaced with data from DB
import { YEARS } from "@/utils/constants/exampleYears";

const props = defineProps({
    idRow: {
        type: Number,
    }
})

const viewName = 'Datos Financieros'
const readOnlyView = ref(false)
const router = useRouter();

const { createData } = usePetition("informacion_financiera/");

const data = reactive<IFinancialData>(defaultValues);
const { formState, isValid, errors } = useFormValidation(data, financialDataValidations);
const itemId = ref("");
// const props = defineProps({
//     viewName: {
//         type: Boolean,
//     }
// })
const handleSubmit = async () => {
  data.cartera_proyecto_inversion = props.idRow!!
  if (isValid.value) {
    if (itemId.value) {
    //   updatePriority({ ...data }).then(() => {
    //     resetValues();
    //     router.push({ name: "listar-prioridades" });
    //   });
    } else {
        await createData(formState.value);
    }
    router.push({ name: "listar-proyecto_de_inversion" });
  }
};
</script>