<template>
    <div>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="etiquetas-tab"
            data-bs-toggle="tab"
            data-bs-target="#etiquetas"
            type="button"
            role="tab"
            aria-controls="etiquetas"
            aria-selected="true"
            @click=""
          >
            Etiquetas
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="valor_tab-tab"
            data-bs-toggle="tab"
            data-bs-target="#valor_tab"
            type="button"
            role="tab"
            aria-controls="valor_tab"
            @click=""
          >
            Valores
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <h4 class="view-name">
          <!-- {{ viewName }} -->
        </h4>
        <hr class="red" />
        <div class="row app-options-bar">
          <div
            class="d-flex align-items-center buttons-component align-items-center"
          >
            <div class="col-md-8">
              <ButtonBarComponent
               
                :show-subactions="false"
                custom-label="Etiquetas"
                custom-icon="bi bi-tag"
              />
              <!-- <Modal
                v-if="modal"
                :title="`Agregar ${viewName}`"
                saveButtonTitle="Aceptar"
                openButtonTittle="Crear"
                :large-modal="true"
                @onCloseModal="modal = false"
                @onSave="saveForm"
              >
                <PublicacionForm
                  v-if="viewName === 'Publicaciones'"
                  @update-data="dataPublicacionForm"
                  :existingData="existingPublicacionData"
                />
                <LibroForm
                  v-if="viewName === 'Libros'"
                  @update-data="dataLibroForm"
                  :existingData="existingLibroData"
                />
                <TemaForm
                  v-if="viewName === 'Temas'"
                  @update-data="dataTemaForm"
                  :existingData="existingTemaData"
                />
                <ParteForm
                  v-if="viewName === 'Parte'"
                  @update-data="dataParteForm"
                  :existingData="existingParteData"
                />
                <TituloForm
                  v-if="viewName === 'Titulos'"
                  @update-data="dataTituloForm"
                  :existingData="existingTituloData"
                />
                <CapituloForm
                  v-if="viewName === 'Capitulos'"
                  @update-data="dataCapituloForm"
                  :existingData="existingCapituloData"
                />
              </Modal>
              <Modal
                v-if="modalDelete"
                :title="`Eliminar ${viewName}`"
                saveButtonTitle="Eliminar"
                :large-modal="true"
                @onCloseModal="modalDelete = false"
                @onSave="deleteForm"
              >
                <div class="card">
                  <div class="card-body text-center">
                    <h5 class="card-title">¿Estás Seguro?</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      El registro será eliminado permanetemente.
                    </h6>
                    <p class="card-text">
                      {{ dataDelete.descripcion }}
                    </p>
                  </div>
                </div>
              </Modal> -->
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade show active"
          id="etiquetas"
          role="tabpanel"
          aria-labelledby="etiquetas-tab"
        >
          <div v-if="showView">
            <!-- <DataTableComponent
              rowId="id"
              :columns="columns"
              :data="arrayDataPublicacion.data"
              :pagination="arrayDataPublicacion.pagination"
              :showDelete="true"
              :showEdit="true"
              :row-select="true"
              :fixed-actions="true"
              :prefix="publicacionPrefix"
              @onPaginate="handlePaginate"
              @onEdit="handleEdit"
              @onDelete="handleDelete"
              @onCreate="handleCreate"
              @onGetID="(data) => (publicacionId = data.id)"
            /> -->
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="valor_tab"
          role="tabpanel"
          aria-labelledby="valor_tab-tab"
        >
          <!-- <DataTableComponent
            v-if="!arrayDataLibro.loading && publicacionId"
            rowId="id"
            :columns="columnsLibro"
            :data="arrayDataLibro.data"
            :pagination="arrayDataLibro.pagination"
            :showDelete="true"
            :showEdit="true"
            :row-select="true"
            :fixed-actions="true"
            :prefix="libroPrefix"
            @onPaginate="handlePaginateLibro"
            @onEdit="handleEdit"
            @onDelete="handleDelete"
            @onCreate="handleCreate"
            @onGetID="(data) => (libroId = data.id)"
          /> -->
        </div>
      </div>
    </div>
  </template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

const showView = ref(false);

onMounted(async () => {
    showView.value = true;
//   await getDatasPublicacion({ page: 1 }).then(() => {
//   });
//   addClickListener(handleClick);
});
</script>