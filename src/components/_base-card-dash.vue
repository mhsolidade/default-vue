<template>
  <BaseCard>
    <template v-slot:title>
      <v-skeleton-loader
        :loading="loading"
        transition="scale-transition"
        class="mx-auto"
        max-width="400"
        type="paragraph"
      >
        <div class="text-center">
          <p class="ma-0">
            <slot name="subtitle-1"></slot>
          </p>
          <h1 class="my-4"><slot name="title"></slot></h1>
          <p class="ma-0">
            <slot name="subtitle-2"></slot>
          </p>
        </div>
      </v-skeleton-loader>
    </template>
  </BaseCard>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
}
</script>
