<template>
  <div class="bg-black text-white header px-5">
    <div class="flex justify-between">
      <div>
        <h1 class="uppercase titleFont">Wired Beauty</h1>
      </div>
      <div class="space-x-8 text-sm my-auto">
        <NuxtLink to="/test">NEW NOMADIC LABGRADE DEVICE& APP</NuxtLink>
        <NuxtLink to="/test">WHO WE ARE</NuxtLink>
        <NuxtLink to="/test">SCIENTIFIC VALIDATION</NuxtLink>
        <NuxtLink to="/test">STUDIES and DEVICES</NuxtLink>
      </div>
      <div class="space-x-6 uppercase text-xs mr-0">
        <NuxtLink to="/test">Contact us</NuxtLink>
        <NuxtLink to="/test">Log in</NuxtLink>
        <NuxtLink to="/test">Become a panelist</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtHeader',
}
</script>
<style>
.titleFont {
  font-family: 'Noto Serif';
  font-size: 38px;
}
.header {
}
</style>
