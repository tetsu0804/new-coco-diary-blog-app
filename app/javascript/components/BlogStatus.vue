<template>
  <div>
    <BlogAllStatus></BlogAllStatus>
    <BlogBreakFirst></BlogBreakFirst>
    <ShitsAllCount></ShitsAllCount>
  </div>
</template>

<script>
  import BlogAllStatus from './BlogAllStatus.vue'
  import ShitsAllCount from './ShitsAllCount.vue'
  import BlogBreakFirst from './BlogBreakFirst.vue'

  export default {
    components: {
      BlogAllStatus,
      ShitsAllCount,
      BlogBreakFirst
    }
  }
</script>
