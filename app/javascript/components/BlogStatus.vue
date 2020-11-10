<template>
  <div>
    <BlogAllStatus></BlogAllStatus>
    <ShitsAllCount></ShitsAllCount>
  </div>
</template>

<script>
  import BlogAllStatus from './BlogAllStatus.vue'
  import ShitsAllCount from './ShitsAllCount.vue'

  export default {
    components: {
      BlogAllStatus,
      ShitsAllCount
    }
  }
</script>
