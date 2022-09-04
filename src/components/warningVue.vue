<template>
  <transition name="fade">
    <div
      class="rounded-sm font-otaku-bold fixed top-40 left-1/2 transform -translate-x-1/2 p-2 max-w-2xl min-w-[320px] bg-darkblue text-white"
    >
      <Close class="absolute top-1 right-1 cursor-pointer" />
      <img
        src="@/assets/img/welcome.png"
        alt="konata"
        class="absolute top-0 left-0 w-32 transform -translate-y-full"
      />
      oi
    </div>
  </transition>
</template>

<script>
import Close from "../../node_modules/vue-material-design-icons/Close.vue";
export default { components: { Close } };
</script>

<style></style>
