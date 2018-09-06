<template>
  <div class="upload">
    <p>上传图片</p>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$http.get({
      name: 'login',
      params: {
        name: 'admin',
        password: '123456'
      }
    }).then(res => {
      console.log(res)
    })
    // this.$http.post({
    //   name: 'sign',
    //   data: {
    //     name: 'zhangsan',
    //     password: '123456'
    //   }
    // })
  }
}
</script>
