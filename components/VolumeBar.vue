<template>
<div class="container">
  <span v-for="e in props.prompt_text">{{e}}</span>
  <span></span>
  <span></span>
  <div class="box-1"></div>
  <div class="box-2"></div>
  <div class="box-3"></div>
  <div class="box-4"></div>
  <div class="box-5"></div>
  <div class="sep"></div>
  <div class="sep"></div>
  <div class="bar" :style="bar_style"><slot></slot></div>
</div>
</template>

<script setup lang="ts">

interface IProps{
  prompt_text?: string[],
  value?: number,
  bar_color?: string
}

const props = withDefaults(defineProps<IProps>(), {
  prompt_text: () => ["", "20", "30", "40", "50"],
  value: 0,
  bar_color: "#fbb03b"
});

const bar_style = computed(() => {
  let val = Math.floor(props.value * 100)
  val = val >= 0 ? val : 0
  val = val <= 100 ? val : 100
  return {
    width: `${val}%`,
    "background-color": props.bar_color
  }
});

</script>

<style scoped lang="scss">
@use "sass:list";

.container{
  display: grid;
  grid-template-columns: repeat(5, 1fr) 4px 4px;
  grid-template-rows: min-content auto;

  @for $i from 1 through 5 {
    .box-#{6-$i} {
      background-color: lighten(gray, 10% * $i);
      grid-row: 2;
      grid-column: list.slash(6-$i, 6-$i);
    }
  }

  .sep {
    background-color: black;
    width: 2px;
    justify-self: right;
  }

  .bar {
    grid-row: 2;
    grid-column: 1/5;
    height: 25px;
  }
}

.container span{
  font: small;
  color: grey;
  text-align: right;
  margin-top: auto;
}
</style>