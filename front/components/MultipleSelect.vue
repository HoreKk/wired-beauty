<template>
  <section class="multiple-select" :class="{ 'has-label': selectLabel, disabled, 'mandatory': required, 'error': error }">
    <label v-show="selectLabel">{{ selectLabel }}</label>
    <multiple
      v-model="selectedItem"
      :class="[ notag ? 'no-tag': '' ]"
      :multiple="multiple"
      :placeholder="placeholder"
      :show-labels="showLabels"
      :allow-empty="allowEmpty"
      :limit="limit"
      :limit-text="limitText"
      :track-by="trackBy"
      :label="label"
      :options="options || []"
      :taggable="taggable"
      :close-on-select="!multiple || closeOnSelect"
      :disabled="disabled"
      v-bind="$attrs"
      @input="(value, id) => $emit('input', value)"
      @select="(value, id) => $emit('select', value)"
      v-on="$listeners"
    >
      <span slot="noResult"><slot name="no-result">{{ emptyLabel }}</slot></span>
      <span slot="noOptions"><slot name="no-options">{{ nofoundLabel }}</slot></span>

      <template slot="singleLabel" slot-scope="props">
        <slot name="singleLabel" :props="props"></slot>
      </template>
      <template slot="option" slot-scope="props">
        <slot name="option" :props="props"></slot>
      </template>
    </multiple>
    <div v-show="error" class="error-msg"><slot name="error-msg">{{ errorMessage }}</slot></div>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
  name: 'MultipleSelect',
  components: {
    multiple: Multiselect
  },
  props: {
    label: String,
    placeholder: String,
    options: Array,
    trackBy: String,
    showLabels: {
      type: Boolean,
      default: false
    },
    allowEmpty: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: Number,
    limitText: Function,
    taggable: {
      type: Boolean,
      default: false
    },
    notag: {
      type: Boolean,
      default: true
    },
    closeOnSelect: Boolean,
    value: {
      type: [ Object, Array, String, Number ]
    },
    selectLabel: {
      type: String
    },
    disabled: Boolean,
    required: Boolean,
    error: Boolean,
    errorMessage: String,
    emptyLabel: {
      type: String,
      default: 'This list is empty.'
    },
    nofoundLabel: {
      type: String,
      default: 'Elements not found.'
    }
  },
  data() {
    return {
      selectedItem: this.value
    };
  },
  watch: {
    value() {
      this.selectedItem = this.value;
    }
  }
};
</script>

<style>
/* TAGS */
.multiselect,
.multiselect__tags {
  border-radius: 5px;
  height: 100%;
  color: var(--select-text-color, #4c515d);
  min-height: 2rem;
  @apply bg-indigo-500;
}

.multiselect__tags {
  position: relative;
  border: none;
  height: 100%;
  padding: 0 0.5rem;
  color: var(--select-text-color, #4c515d);
  font-family: inherit;
  font-weight: normal;
  letter-spacing: 0.01em;
  background-color: transparent;
  margin-right: 2rem;
}

.multiselect__tag {
  @apply bg-indigo-500;
}

.multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
  @apply bg-indigo-500;
  color: var(--select-tag-text-color, #ffffff);
}

.multiselect__tags input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: var(--select-bg-color, #fefefe);
  padding-left: 0.5rem !important;
}

/* NO TAGS */
.multiselect.no-tag .multiselect__tag {
  color: inherit;
  background-color: transparent;
  padding: 0;
  margin: 0;
  min-height: 2rem;
  height: 2rem;
  line-height: 2rem;
}
.multiselect.no-tag .multiselect__strong {
  padding: 0;
}
.multiselect.no-tag .multiselect__tag span {
  display: inline-block;
  height: 100%;
}

.multiselect.no-tag .multiselect__tag i {
  display: none;
}

/* SELECT INPUT */
.multiselect,
.multiselect__input,
.multiselect__single {
  font-size: inherit;
  background-color: var(--select-bg-color, #fefefe);
}

.multiselect__strong,
.multiselect__placeholder,
.multiselect__tags-wrap,
.multiselect__input,
.multiselect__single {
  color: var(--select-text-color, #4c515d);
  background: transparent;
  margin: 0;
  padding: 0;
  min-height: 2rem;
  height: 2rem;
  line-height: 2rem;
  font-weight: 400;
  letter-spacing: 0.14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* MANDATORY MARKER */
.multiselect.mandatory .multiselect__placeholder::after {
  display: inline-block;
  margin-left: 0.1rem;
  line-height: 1rem;
  font-size: 1rem;
  color: var(--select-mandatory-color, #f44336);
  content: '*';
  vertical-align: middle;
}

.multiselect__select {
  top: 0;
  right: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 2rem;
  height: 2rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--select-arrow-color, #ffffff);
  @apply bg-indigo-500;
}
.multiselect__select:before {
  top: 0;
  right: 0;
  color: var(--select-arrow-color, #ffffff);
  border-color: var(--select-arrow-color, #ffffff) transparent transparent;
  transition: transform .2s ease, -webkit-transform .2s ease;
}
.multiselect--active .multiselect__select {
  transform: none;
}
.multiselect--active .multiselect__select::before {
  transform: rotate(180deg);
}

/* Wrapper */
.multiselect__content-wrapper {
  /* display: block !important; */
  min-width: 100%;
  width: auto;
  box-shadow: var(--app-ctn-shadow);
  background-color: var(--select-dropdown-background, #fefefe);
}

.multiselect__option.multiselect__option--group {
  /* Silly, forced due to vue-multiselect */
  background: transparent !important;
  color: var(--select-text-color, #4c515d) !important;
  font-weight: 600;
  padding-left: 0.9rem;
}
.multiselect__option {
  padding-left: 2rem;
}

.multiselect__option.multiselect__option--highlight {
  color: var(--select-hover-color, #ffffff);
  box-shadow: var(--app-ctn-shadow);
  @apply bg-indigo-500;
}

/* Multiselect */
.multiselect__tags {
  line-height: 2rem;
  height: 2rem;
}

.multiselect__option--selected {
  font-weight: 600;
  color: var(--select-selected-color, #ffffff);
  @apply bg-indigo-500;
}
/* Label */
.multiple-select.has-label {
  position: relative;
}
.multiple-select.has-label label {
  position: absolute;
  font-size: 10px;
  font-weight: normal;
  pointer-events: none;
  top: -16px;
  white-space: nowrap;
  z-index: 20;
  @apply bg-indigo-500 mr-2;
}
.multiple-select.disabled.has-label label {
  color: var(--select-text-color, #4c515d);
}
.multiple-select.mandatory.has-label label::after {
  display: inline-block;
  margin-left: 0.1rem;
  line-height: 1rem;
  font-size: 1rem;
  color: var(--select-mandatory-color, #f44336);
  content: '*';
  vertical-align: middle;
}
.multiple-select.disabled.mandatory.has-label label::after {
  color: var(--select-text-color, #4c515d);
}

.multiple-select {
  border-style: solid;
  border-left-width: 1px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-right-width: 0px;
  border-radius: 0.5rem;
  @apply bg-indigo-500;
}
.multiple-select .multiselect,
.multiple-select .multiselect__tags {
  border-top-left-radius: .5rem;
  border-bottom-left-radius: .5rem;
}
.multiple-select .multiselect__tags {
  overflow: hidden;
}

/* Error state */
.multiple-select.error {
  border-color: var(--select-label-error-border-color, #f44336);
}

/* Error message */
.error-msg {
  display: inline-block;
  font-weight: 500;
  color: var(--select-error-msg-color, #e00202);
  font-size: .875rem;
  margin-top: .5rem;
}
</style>
