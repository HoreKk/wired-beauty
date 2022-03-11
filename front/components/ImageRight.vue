<template>
  <div v-editable="blok" class="flex flex-col lg:flex-row">
    <div
      class="
        emeraldBg
        flex flex-col
        justify-between
        w-full
        p-14
        pr-20
        lg:w-1/3
        pb-20
      "
    >
      <div class="w-fit md:flex flex-col">
        <h1 class="text-2xl text-white">{{ blok.title }}</h1>
        <hr class="sleading-6 my-10 lg:my-7" />
        <p class="text-white text-xs mb-8 lg:mb-0">
          {{ blok.desc }}
        </p>
      </div>
      <div class="bg-white py-3 text-center w-26 lg:w-fit mx-0 px-6">
        <NuxtLink to="">{{ blok.titleLink.cached_url }}</NuxtLink>
      </div>
    </div>
    <div class="w-full emeraldBg lg:w-2/3">
      <img class="ml-auto" :src="blok.image" />
      <div class="FadeAway h-fit"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ComponentImageRight',
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
.emeraldBg {
  position: relative;
  z-index: 2;
  background: rgba(0, 70, 69, 1);
}
.FadeAway {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50%;
  background: linear-gradient(
    180deg,
    rgba(0, 70, 69, 1) 0%,
    rgba(0, 70, 69, 0) 100%
  );
}
@media (min-width: 1024px) {
  .FadeAway {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(0, 70, 69, 1) 0%,
      rgba(0, 70, 69, 0) 100%
    );
  }
}
</style>
