<template>
  <div>
    <Banner />
    <div class="main-container">
      <h1>Make your burger:</h1>
      <BurgerForm />
    </div>
  </div>
</template>


<script>
import BurgerForm from "@/components/BurgerForm.vue";
import Banner from "../components/Banner.vue";

export default {
  name: "HomeView",
  components: { Banner, BurgerForm },
};
</script>
