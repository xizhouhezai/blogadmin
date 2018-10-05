<template>
<div>
  <Upload
    action="http://localhost:3333/v1/upload"
    :on-success="upload"
  >
    <Button icon="ios-cloud-upload-outline">Upload files</Button>
  </Upload>
</div>
</template>
<script>
import { Upload, Button } from 'iview'

export default {
  components: {
    Button,
    Upload
  },
  methods: {
    upload (response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
    }
  }
}
</script>
<style></style>
