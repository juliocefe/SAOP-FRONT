<template>
  <Transition name="view">
    <!--
        <div v-if="show" class="home-container">
            <div class="container cont-home pad-50">
                <div class="row cont-page">
                    <div class="col-md-12 col-sm-6 col-xs-12 col-lg-12 col-xl-6">
                        <div class="cont-card-home">
                            <div class="row">
                                <div class="col-xs-12 col-md-6 col-sm-5 col-xl-5 col-lg-6 text-center">
                                    <img src="../assets/images/imgInicio1.png" width="140" class="mx-auto" alt="imagen inicio" />
                                </div>
                                <div class="col-xs-12 col-md-6 col-sm-7 col-xl-7 col-lg-6">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eos vel quis,
                                        <b>doloremque</b>
                                        debitis quisquam tempore odit nisi accusamus at sunt officiis, quod magni voluptas
                                        unde
                                        autem ratione <b>delectus</b> dolores!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-sm-6 col-xs-12 col-lg-12 col-xl-6 ">
                        <div class="cont-card-home">
                            <div class="row">
                                <div class="col-xs-12 col-md-6 col-sm-5 col-xl-5 col-lg-6 text-center">
                                    <img src="../assets/images/imgInicio2.svg" width="170" class="mx-auto" alt="imagen inicio" />
                                </div>
                                <div class="col-xs-12 col-md-6 col-sm-7 col-xl-7 col-lg-6">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eos vel quis,
                                        <b>doloremque</b>
                                        debitis quisquam tempore odit nisi accusamus at sunt officiis, quod magni voluptas
                                        unde
                                        autem ratione <b>delectus</b> dolores!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    -->
    <div>
      <section class="mb-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-9">
              <h3 class="font-weight-bold mb-0">{{ usuario }}</h3>
              <h6 class="text-muted">Revisa tu información</h6>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-4">
                  <h6 class="text-muted">Rol de usuario</h6>
                  <h5 class="font-weight-bold">En proceso</h5>
                  <h6 class="text-success subs">Usuario SAOP</h6>
                </div>
                <div class="col-lg-4">
                  <h6 class="text-muted">Email</h6>
                  <h5 class="font-weight-bold">{{ email }}</h5>
                  <h6 class="text-success subs">Email verificado</h6>
                </div>
                <div class="col-lg-4">
                  <h6 class="text-muted">Último acceso</h6>
                  <h5 class="font-weight-bold">{{ last_login }}</h5>
                  <h6 class="text-success subs">Hora CDMX</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Transition>
</template>
<script setup lang="ts">
/* import router from "@/router"; */
import { onMounted, ref } from "vue";
// import { saveUnidad,saveTipo,saveMail } from "@/utils/helpers/authenticationHelper";
import useAuthenticationStore from "@/store/authenticationStore";
const authStore = useAuthenticationStore();

const show = ref(false);

/* const handleDetail = () => router.push({ name: "solicitudes" }); */

let usuario = ref("Bienvenido");
let last_login = ref("No disponible");
let email = ref("No disponible");

onMounted(() => {
  show.value = true;
  console.log("Auth: ", authStore.getUser);
  usuario.value = authStore.getUser;
  email.value = authStore.getUser;
  /* getDatasWOR({}).then((response: any) => {
    usuario.value = usuario.value + " " + response.user.full_name;
    email.value = response.user.email;
    last_login.value = response.user.last_login;
    if(response.c_dgpop==true){
      authStore.saveInfoUser(response.unidad_administrativa.clave,response.unidad_administrativa.nombre,response.user.email,'Si');
    }else{
      authStore.saveInfoUser(response.unidad_administrativa.clave,response.unidad_administrativa.nombre,response.user.email,'No');
    }
   
  }); */
});
</script>
<style scoped>
.home-container {
  padding-top: 100px;
}
.subs {
  font-weight: 400;
}
</style>
