<template>
  <div class="home">
    <HomeComponent msg="Home de consumo da API de Boletos de Pagamento."/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeComponent from '@/components/HomeComponent.vue'; // @ is an alias to /src

@Component({
  components: {
    HomeComponent,
  },
})
export default class HomeView extends Vue {}
</script>
<style scoped>
.home {
  text-align: center;
}
</style>