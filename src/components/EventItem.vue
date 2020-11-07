<template>
  <div class="eventItem my-2 text-sm leading-tight">
        {{ label }}
        {{ label ? '(':'' }}
        {{ number }}
        {{ unit }}{{ number > 1 ? 's' : ''}}
        {{ period }}
        {{ label ? ')':'' }}
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    label: String,
    unit: String,
    every: { type: Number, default: 0 },
    number: { type: Number, default: 1 },
  },
  computed: {
    period(){
      return this.every 
        ? this.every === 1 
          ? 'every week' 
          : `every ${this.every} weeks` 
        : ''
    }
  }
};
</script>
