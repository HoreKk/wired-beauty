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
        pb-10
      "
    >
      <div class="w-fit md:flex flex-col">
        <h1 class="text-xl text-white">{{ blok.title }}</h1>
        <hr class="sleading-6 my-10 lg:my-5" />
        <h1 class="text-xl text-white">{{ blok.secondTitle }}</h1>
        <p class="text-white text-xs mb-8 lg:my-3">
          {{ blok.desc }}
        </p>
        <p class="text-white text-2xs mb-8 lg:mb-3">
          {{ blok.secondDesc }}
        </p>
        <ul class="text-white text-2xs list-disc pl-5">
          <li> {{ blok.line1 }}</li>
          <li> {{ blok.line2 }}</li>
          <li> {{ blok.line3 }}</li>
          <li> {{ blok.line4 }}</li>
          <li> {{ blok.line5 }}</li>
        </ul>
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
  background: rgb(0, 0, 0);
}
.FadeAway {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50%;
  background: linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
}
.text-2xs{
  font-size: 0.5rem;
}
@media (min-width: 1024px) {
  .FadeAway {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
  }
}
</style>
