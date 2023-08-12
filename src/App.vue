<template>
  <div class="w-screen h-screen bg-gray-100 text-dark overflow-y-auto">
    <router-view></router-view>
  </div>
</template>

<style>
div {
  /* Initial value */
  scrollbar-gutter: auto;

  /* "stable" keyword, with optional modifier */
  scrollbar-gutter: stable;
  scrollbar-gutter: stable both-edges;

  /* Global values */
  scrollbar-gutter: inherit;
  scrollbar-gutter: initial;
  scrollbar-gutter: revert;
  scrollbar-gutter: revert-layer;
  scrollbar-gutter: unset;
}
</style>