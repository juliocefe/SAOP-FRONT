<template>
  <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
          @click="handlePublicacion()"
        >
          Publicacion
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="publicacionId === ''"
          class="nav-link"
          id="libro_tab-tab"
          data-bs-toggle="tab"
          data-bs-target="#libro_tab"
          type="button"
          role="tab"
          aria-controls="libro_tab"
          @click="handleLibros()"
        >
          Libros
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="libroId === ''"
          class="nav-link"
          id="temas_tab-tab"
          data-bs-toggle="tab"
          data-bs-target="#temas_tab"
          type="button"
          role="tab"
          aria-controls="temas_tab"
          @click="handleTemas()"
        >
          Temas
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="temaId === ''"
          class="nav-link"
          id="parte_tab-tab"
          data-bs-toggle="tab"
          data-bs-target="#parte_tab"
          type="button"
          role="tab"
          aria-controls="parte_tab"
          @click="handleParte()"
        >
          Parte
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="parteId === ''"
          class="nav-link"
          id="titulo_tab-tab"
          data-bs-toggle="tab"
          data-bs-target="#titulo_tab"
          type="button"
          role="tab"
          aria-controls="titulo_tab"
          @click="handleTitulo()"
        >
          Titulo
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="tituloId === ''"
          class="nav-link"
          id="capitulo_tab-tab"
          data-bs-toggle="tab"
          data-bs-target="#capitulo_tab"
          type="button"
          role="tab"
          aria-controls="capitulo_tab"
          @click="handleCapitulo()"
        >
          Capitulo
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <h4 class="view-name">
        {{ viewName }}
      </h4>
      <hr class="red" />
      <div class="row app-options-bar">
        <div
          class="d-flex align-items-center buttons-component align-items-center"
        >
          <div class="col-md-8">
            <Modal
              :title="`Agregar ${viewName}`"
              saveButtonTitle="Aceptar"
              openButtonTittle="Crear"
              :large-modal="true"
              iconClasses="bi bi-plus"
              @onSaveButton="saveActionTrigger"
              >
              <component :is="dynamicComponent" :saveTrigger="modal"></component>
              <!-- < /> -->
            </Modal>
          </div>
        </div>
      </div>
      <div class="d-flex px-2">
        <div class="pr-3 col-md-1" style="font-size: 30px">
          <i class="px-2 bi bi-funnel-fill"></i>
        </div>
        <div class="flex-grow-1 d-flex justify-content-end">
          <div class="form-group">
            <div class="d-flex align-items-center form-group m-0">
              <div>
                <span class="font-weight-bold pr-2">Buscar: </span>
              </div>
              <div>
                <input
                  class="form-control w-auto"
                  placeholder="Buscar..."
                  type="text"
                  v-model="inputSolicitud"
                  @keyup.enter="handleFilter()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div v-if="showView">
          <DataTableComponent
            v-if="!arrayDataPublicacion.loading"
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
          />
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="libro_tab"
        role="tabpanel"
        aria-labelledby="libro_tab-tab"
      >
        <DataTableComponent
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
        />
      </div>
      <div
        class="tab-pane fade"
        id="temas_tab"
        role="tabpanel"
        aria-labelledby="temas_tab-tab"
      >
        <DataTableComponent
          v-if="!arrayDataTemas.loading && libroId"
          rowId="id"
          :columns="columnsTemas"
          :data="arrayDataTemas.data"
          :pagination="arrayDataTemas.pagination"
          :showDelete="true"
          :showEdit="true"
          :row-select="true"
          :fixed-actions="true"
          :prefix="temaPrefix"
          @onPaginate="handlePaginateTemas"
          @onEdit="handleEdit"
          @onDelete="handleDelete"
          @onCreate="handleCreate"
          @onGetID="(data) => (temaId = data.id)"
        />
      </div>
      <div
        class="tab-pane fade"
        id="parte_tab"
        role="tabpanel"
        aria-labelledby="parte_tab-tab"
      >
        <DataTableComponent
          v-if="!arrayDataParte.loading && temaId"
          rowId="id"
          :columns="columnsParte"
          :data="arrayDataParte.data"
          :pagination="arrayDataParte.pagination"
          :showDelete="true"
          :showEdit="true"
          :row-select="true"
          :fixed-actions="true"
          :prefix="partePrefix"
          @onPaginate="handlePaginateParte"
          @onEdit="handleEdit"
          @onDelete="handleDelete"
          @onCreate="handleCreate"
          @onGetID="(data) => (parteId = data.id)"
        />
      </div>
      <div
        class="tab-pane fade"
        id="titulo_tab"
        role="tabpanel"
        aria-labelledby="titulo_tab-tab"
      >
        <DataTableComponent
          v-if="!arrayDataParte.loading && parteId"
          rowId="id"
          :columns="columnsTitulo"
          :data="arrayDataTitulo.data"
          :pagination="arrayDataTitulo.pagination"
          :showDelete="true"
          :showEdit="true"
          :row-select="true"
          :fixed-actions="true"
          :prefix="tituloPrefix"
          @onPaginate="handlePaginateTitulo"
          @onEdit="handleEdit"
          @onDelete="handleDelete"
          @onCreate="handleCreate"
          @onGetID="(data) => (tituloId = data.id)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, shallowRef } from "vue";
import usePetition from "@/composables/usePetition";
import DataTableComponent from "@/components/DataTableComponent.vue";
import TituloForm from "@/components/forms/Titulo.vue";
import CapituloForm from "@/components/forms/Capitulo.vue";
import router from "@/router";
import Modal from "@/components/Modals.vue";
import {
  addClickListener,
  removeClickListener,
} from "@/utils/listeners/clickListener";

// forms
var dynamicComponent = shallowRef(CapituloForm);

const viewName = ref("Publicaciones");
const selectedCat = ref("cat_publicacion/");
/* Consultas  */
const {
  arrayData: arrayDataPublicacion,
  getDatas: getDatasPublicacion,
  searchData: searchDataPublicacion,
} = usePetition("cat_publicacion/");
const {
  arrayData: arrayDataLibro,
  getDatas: getDatasLibro,
  searchData: searchDataLibro,
} = usePetition("cat_libro/");
const {
  arrayData: arrayDataTemas,
  getDatas: getDatasTemas,
  searchData: searchDataTemas,
} = usePetition("cat_tema/");
const {
  arrayData: arrayDataParte,
  getDatas: getDatasParte,
  searchData: searchDataParte,
} = usePetition("cat_parte/");
const {
  arrayData: arrayDataTitulo,
  getDatas: getDatasTitulo,
  searchData: searchDataTitulo,
} = usePetition("cat_titulo/");
const {
  arrayData: arrayDataCapitulo,
  getDatas: getDatasCapitulo,
  searchData: searchDataCapitulo,
} = usePetition("cat_capitulo/");

const publicacionPrefix = "publicacion";
const publicacionId = ref("");
const libroPrefix = "libro";
const libroId = ref("");
const temaPrefix = "tema";
const temaId = ref("");
const partePrefix = "parte";
const parteId = ref("");
const tituloPrefix = "titulo";
const tituloId = ref("");
const capituloPrefix = "capitulo";
const capituloId = ref("");

const searchTerm = ref("");
const idRow = ref("");
const selectedProyect = ref("");
const showView = ref(false);
const handleCreate = () => router.push({ name: "crear-proyecto_de_inversion" });
const handleEdit = (data: any) =>
  router.push({ name: "editar-proyecto_de_inversion", params: { id: data } });
const handleDelete = (data: any) =>
  router.push({ name: "eliminar-proyecto_de_inversion", params: { id: data } });

const handleClick = (event?: MouseEvent) => {
  //solo aplica si se esta en la pantalla de datatable
  const homeTab = document.getElementById("home");
  if (homeTab && !homeTab.classList.contains("show")) {
    return;
  }
  // Verificar si el clic proviene del componente DataTable
  const isDataTableClick =
    (event?.target as HTMLElement).closest(".datatable") !== null ||
    (event?.target as HTMLElement).closest(".nav-item") !== null;
  if (isDataTableClick) {
    return;
  }
  const selected = document.querySelector(".selectedRow");
  if (selected) {
    selected.classList.remove("selectedRow");
    idRow.value = "";
    selectedProyect.value = "";
  }
};
//Catalogo publicacion
const handlePublicacion = () => {
  viewName.value = "Publicaciones";
  selectedCat.value = "cat_publicacion/";
  libroId.value = "";
  temaId.value = "";
  parteId.value = "";
};
//Catalogo libros
const handleLibros = () => {
  if (viewName.value !== "Libros" && libroId.value === "") {
    searchDataLibro({ page: 1, search: publicacionId.value });
  }
  viewName.value = "Libros";
  selectedCat.value = "cat_libro/";
  temaId.value = "";
};
const handlePaginateLibro = (page: number) => {
  if (searchTerm.value) {
    searchDataLibro({ page: page, search: searchTerm.value });
  } else {
    getDatasLibro({ page });
  }
};

//Catalogo Temas
const handleTemas = () => {
  if (viewName.value !== "Temas" && temaId.value === "") {
    searchDataTemas({ page: 1, search: temaId.value });
  }
  viewName.value = "Temas";
  selectedCat.value = "cat_tema/";
};
const handlePaginateTemas = (page: number) => {
  if (searchTerm.value) {
    searchDataTemas({ page: page, search: searchTerm.value });
  } else {
    getDatasTemas({ page });
  }
};

//Catalogo Parte
const handleParte = () => {
  searchDataParte({ page: 1, search: temaId.value });
  viewName.value = "Parte";
  selectedCat.value = "cat_parte/";
};
const handlePaginateParte = (page: number) => {
  if (searchTerm.value) {
    searchDataParte({ page: page, search: searchTerm.value });
  } else {
    getDatasParte({ page });
  }
};

//Catalogo titulo
const handleTitulo = () => {
  searchDataTitulo({ page: 1});
  viewName.value = "Titulo";
  selectedCat.value = "cat_titulo/";
  dynamicComponent.value = TituloForm;
};
const handlePaginateTitulo = (page: number) => {
  if (searchTerm.value) {
    searchDataTitulo({ page: page, search: searchTerm.value });
  } else {
    getDatasTitulo({ page });
  }
};

//Catalogo capitulo
const handleCapitulo = () => {
  searchDataCapitulo({ page: 1, search: temaId.value });
  viewName.value = "Capitulo";
  selectedCat.value = "cat_capitulo/";
};
const handlePaginateCapitulo = (page: number) => {
  if (searchTerm.value) {
    searchDataCapitulo({ page: page, search: searchTerm.value });
  } else {
    getDatasCapitulo({ page });
  }
};

const handlePaginate = (page: number) => {
  if (searchTerm.value) {
    searchDataPublicacion({ page: page, search: searchTerm.value });
  } else {
    getDatasPublicacion({ page });
  }
};

const handleFilter = () => {
  let searchFilter = "";
  if (cbEntidad.value.length) searchFilter += cbEntidad.value;
  if (cbUnidad.value.length) {
    if (searchFilter.length) searchFilter += " ,";
    searchFilter += cbEntidad.value;
  }
  if (inputSolicitud.value.length) {
    if (searchFilter.length) searchFilter += " ,";
    searchFilter += inputSolicitud.value;
  }
  searchDataPublicacion({ page: 1, search: searchFilter });
};

const cbEntidad = ref<string>("");
const cbUnidad = ref<string>("");
const inputSolicitud = ref<string>("");

const modal = ref(false);
const saveActionTrigger = () => {
  modal.value = !modal.value;
  console.log(modal.value)
}

//Colunas
const columns = [
  { title: "Publicacion", data: "id", align: "center" },
  { title: "Tipo", data: "tipo", align: "center" },
  { title: "Descripción de Publicaciones", data: "descripcion", align: "left" },
];
const columnsLibro = [
  { title: "Publicacion", data: "publicacion", align: "center" },
  { title: "Libro", data: "id", align: "center" },
  { title: "Libro", data: "libro", align: "center" },
  { title: "Descripción de Libro", data: "descripcion", align: "left" },
];
const columnsTemas = [
  { title: "Publicacion", data: "publicacion", align: "center" },
  { title: "Libro", data: "libro", align: "center" },
  { title: "Tema", data: "id", align: "center" },
  { title: "Tema", data: "tema", align: "center" },
  { title: "Descripción de Tema", data: "descripcion", align: "left" },
];
const columnsParte = [
  { title: "Publicacion", data: "publicacion", align: "center" },
  { title: "Libro", data: "libro", align: "center" },
  { title: "Tema", data: "tema", align: "center" },
  { title: "Parte", data: "id", align: "center" },
  { title: "Descripción de Parte", data: "descripcion", align: "left" },
];
const columnsTitulo = [
  { title: "Publicacion", data: "publicacion", align: "center" },
  { title: "Libro", data: "libro", align: "center" },
  { title: "Tema", data: "tema", align: "center" },
  { title: "Parte", data: "parte", align: "center" },
  { title: "Titulo", data: "id", align: "center" },
  { title: "Descripción titulo", data: "descripcion", align: "left" },
];

onMounted(async () => {
  await getDatasPublicacion({ page: 1 }).then(() => {
    showView.value = true;
  });
  addClickListener(handleClick);
});
onBeforeUnmount(() => {
  removeClickListener(handleClick);
});
</script>
