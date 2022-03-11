<template>
  <div class="bg-white header px-5" style="z-index:10; position:relative;">
    <div class="hidden md:flex justify-between">
      <select
        class="
          text-base
          placeholder-gray-600
          appearance-none
          focus:shadow-outline
        "
      >
        <option>EN</option>
        <option>GR</option>
        <option>FR</option>
        <option>CH</option>
        <option>KR</option>
      </select>
      <div class="space-x-6 uppercase text-xs mr-0">
        <NuxtLink hidden to="/test">Contact us</NuxtLink>
        <NuxtLink to="/test">Log in</NuxtLink>
        <NuxtLink to="/test">Become a panelist</NuxtLink>
      </div>
    </div>
    <div class="hidden md:block text-center">
      <h1 class="uppercase titleFont text-4xl">Wired Beauty</h1>
    </div>
    <div class="hidden md:flex space-x-8 text-sm justify-center py-3">
      <NuxtLink to="/whatwedo">WHAT WE DO</NuxtLink>
      <NuxtLink to="/test">NEW NOMADIC LABGRADE DEVICE& APP</NuxtLink>
      <NuxtLink to="/test">WHO WE ARE</NuxtLink>
      <NuxtLink to="/test">SCIENTIFIC VALIDATION</NuxtLink>
      <NuxtLink to="/test">STUDIES and DEVICES</NuxtLink>
    </div>
    <div id="responsiveNav" class="flex py-5 md:hidden">
      <input type="checkbox" id="menu_checkbox" />
      <label for="menu_checkbox" class="z-20" v-on:click="toggleMenuSlider()">
        <div></div>
        <div></div>
        <div></div>
      </label>
      <div class="mx-auto">
        <h1 class="uppercase text-4xl titleFont text-center">Wired Beauty</h1>
      </div>
    </div>
    <div id="sliderMenu" class="bg-white border w-1/2 h-screen close md:hidden">
      <div>
        <ul class="text-center mt-20 space-y-8">
          <li><NuxtLink to="/test">WHAT WE DO</NuxtLink></li>
          <li>
            <NuxtLink to="/test">NEW NOMADIC LABGRADE DEVICE& APP</NuxtLink>
          </li>
          <li><NuxtLink to="/test">WHO WE ARE</NuxtLink></li>
          <li><NuxtLink to="/test">SCIENTIFIC VALIDATION</NuxtLink></li>
          <li><NuxtLink to="/test">STUDIES and DEVICES</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtHeader',
  methods: {
    toggleMenuSlider() {
      const Menu = document.getElementById('sliderMenu')
      if (Menu.classList.contains('open')) {
        Menu.classList.remove('open')
      } else {
        Menu.classList.add('open')
      }
    },
  },
}
</script>
<style>
.titleFont {
  font-family: 'Noto Serif';
}
#sliderMenu {
  position: absolute;
  top: 0px;
  transition: all 0.5s;
}
.close {
  left: -50%;
}
.open {
  left: 0px;
}

/* Menu Btn */
#menu_checkbox {
  display: none;
}

label {
  position: absolute;
  top: 10px;
  right: 5px;
  left: 10px;
  display: block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: black;
}

label div {
  position: relative;
  top: 0;
  height: 5px;
  background-color: black;
  margin-bottom: 5px;
  transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width,
    0.3s ease right;
  border-radius: 2px;
}

label div:first-child {
  transform-origin: 0;
}

label div:last-child {
  margin-bottom: 0;
  transform-origin: 30px;
}

label div:nth-child(2) {
  right: 0;
  width: 30px;
}

#menu_checkbox:checked + label div:first-child {
  top: -6px;
  transform: rotateZ(45deg);
}

#menu_checkbox:checked + label div:last-child {
  top: 4px;
  transform: rotateZ(45deg);
}

#menu_checkbox:checked + label div:nth-child(2) {
  width: 40px;
  top: 0;
  right: 7px;
  transform: rotateZ(-45deg);
}
</style>
