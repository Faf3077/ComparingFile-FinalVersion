<template>
  <div id="app">
    <div class="form">
      <h2>Compare it</h2>
      <div class="fileUpload">
        <label class="input-file">
          <input type="file" name="file" v-on:change="fileToJson" />
          <span v-if="this.$store.state.file == ''">Выберите первый файл</span>
          <span v-else>{{ this.$store.state.fileName }}</span>
        </label>
        <label class="input-file">
          <input type="file" name="file" v-on:change="fileToJsonSecond" />
          <span v-if="this.$store.state.fileSecond == ''">Выберите второй файл</span>
          <span v-else>{{ this.$store.state.fileNameSecond }}</span>
        </label>
      </div>
      <div class="btn__block-next" v-if="this.$store.state.file != '' && this.$store.state.fileSecond != ''">
        <router-link to="/ComparingFiles"><button class="btn btn1">Next</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
export default {
  data() {
    return {
      
    }
  },
  methods: {
    fileToJson(e) {
      const files = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        wb.SheetNames.forEach((num) => {
          this.file = XLSX.utils.sheet_to_json(wb.Sheets[num])
        })
        this.$store.commit("GET_DATA_FILE_FIRST", this.file)
        console.log(this.$store.state.file)
      }
      reader.readAsBinaryString(files);
      this.$store.state.fileName = files.name;
    },
    fileToJsonSecond(a) {
      const files = a.target.files[0];
      const reader = new FileReader();
      reader.onload = (a) => {
        const bstr = a.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        wb.SheetNames.forEach((num) => {
          this.fileSecond = XLSX.utils.sheet_to_json(wb.Sheets[num])
        })
        this.$store.commit("GET_DATA_FILE_SECOND", this.fileSecond)
        console.log(this.$store.state.fileSecond)
      }
      reader.readAsBinaryString(files);
      this.$store.state.fileNameSecond = files.name;
    }
  }
}
</script>

<style>
.form {
  margin: 0 auto;
  border: 2px solid #419152;
  border-radius: 15px;
  padding: 30px;
  width: 450px;
  position: absolute;
  top: 25%;
  left: 35%;
}
h2{
  text-align: center;
}
.btn__block-next{
  text-align: center;
}
.fileUpload {
  width: 370px;
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
}

.input-file {
  position: relative;
  display: inline-block;
}

.input-file span {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  font-size: 14px;
  vertical-align: middle;
  color: rgb(255 255 255);
  text-align: center;
  border-radius: 4px;
  background-color: #419152;
  line-height: 22px;
  height: 40px;
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
  margin: 0;
  transition: background-color 0.2s;
}

.input-file input[type=file] {
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
}

.input-file:hover span {
  background-color: #59be6e;
}

.input-file:active span {
  background-color: #2E703A;
}

.btn {
  transition-duration: 0.4s;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 12px;
}
.btn1 {
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
  border-radius: 10px;
}
.btn:hover {
  background-color: #4CAF50;
  color: white;
}
</style>
