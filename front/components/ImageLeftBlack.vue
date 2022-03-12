<template>
  <div v-editable="blok" class="flex flex-col-reverse lg:flex-row">
    <div class="w-full emeraldBg lg:w-2/3">
      <img class="ml-auto" :src="blok.image" />
      <div class="FadeAway2 h-fit"></div>
    </div>
    <div
      class="
        emeraldBg
        flex flex-col
        justify-between
        w-full
        p-14
        pr-20
        lg:w-1/3
      "
    >
      <div class="w-fit md:flex flex-col">
        <h1 class="text-2xl text-white mb-5">{{ blok.title }}</h1>
        <ul class="text-white text-xs list-disc pl-5">
          <li>{{ blok.line1 }}</li>
          <li>{{ blok.line2 }}</li>
          <li>{{ blok.line3 }}</li>
          <li>{{ blok.line4 }}</li>
          <li>{{ blok.line5 }}</li>
          <li>{{ blok.line6 }}</li>
        </ul>
      </div>
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
  background: rgb(0, 0, 0);
}
.FadeAway2 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50%;
  background: linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
}
.text-2xs {
  font-size: 0.5rem;
}
@media (min-width: 1024px) {
  .FadeAway2 {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
  }
}
</style>
