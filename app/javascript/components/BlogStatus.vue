<template>
  <div>
    <BlogAllStatus></BlogAllStatus>
    <BlogBreakFirst></BlogBreakFirst>
    <BlogDinner></BlogDinner>
    <ShitsAllCount></ShitsAllCount>
  </div>
</template>

<script>
  import BlogAllStatus from './BlogAllStatus.vue'
  import ShitsAllCount from './ShitsAllCount.vue'
  import BlogBreakFirst from './BlogBreakFirst.vue'
  import BlogDinner from './BlogDinner.vue'

  export default {
    components: {
      BlogAllStatus,
      ShitsAllCount,
      BlogBreakFirst,
      BlogDinner
    }
  }
</script>
