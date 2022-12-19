<template>
   <div class="form">
      <div class="block-form">
         <h1>Results</h1>
         <h2>non-matching strings</h2>
      </div>
      <div class="result__block">
         <div class="content-result"
            v-if="JSON.stringify(this.$store.state.file) !== JSON.stringify(this.$store.state.fileSecond)">
            <div class="block__result-item" v-for="elem in almostMatched" :key="elem">
               <span v-for="(elemSecond, index) in elem" :key="elemSecond">
                  <span v-if="index === 0">
                     <span>Файл "<b>{{ fileNameSecondUse }}</b>", содержащий </span>
                     <span v-for="(elemThird, indexSecond) in elemSecond" :key="elemThird">
                        <span v-if="indexSecond !== 'index'"><b>{{ indexSecond }}</b>: {{ elemThird }} </span>
                     </span>
                     <span>, частично совпадает</span> с
                  </span>
                  <span v-else>
                     <span>файлом "<b>{{ fileNameUse }}</b>", содержащий </span>
                     <span v-for="(elemThird, indexSecond) in elemSecond" :key="elemThird">
                        <span v-if="indexSecond !== 'index'"><b>{{ indexSecond }}</b>: {{ elemThird }} </span>
                     </span>
                  </span>
               </span>
            </div>
            <div class="block__result-item" v-if="allNonMatched != ''">
               Полностью отсутствующие данные в файле "<b>{{ fileNameSecondUse }}</b>"
               <span v-for="noData in allNonMatched" :key="noData.id">
                  <div>
                     <span v-for="(noData1, index) in noData" :key="noData1.id">
                        <b> {{ index }}</b> - {{ noData1 }};</span>
                  </div>
               </span>
            </div>
            <div class="block__result-item" v-if="allNonMatchedSecond != ''">
               Полностью отсутствующие данные в файле "<b>{{ fileNameUse }}</b>"
               <span v-for="noData in allNonMatchedSecond" :key="noData.id">
                  <div>
                     <span v-for="(noData1, indexSecond) in noData" :key="noData1.id">
                        <b> {{ indexSecond }}</b> - {{ noData1 }};</span>
                  </div>
               </span>
            </div>
         </div>
         <div v-else><b>Все данные совпали</b></div>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         fileNameUse: this.$store.state.fileName,//имя файла 1
         fileNameSecondUse: this.$store.state.fileNameSecond,//имя файла 2
         allNonMatched: this.$store.state.allNonMatched,//полностью несовпавшие данные
         allNonMatchedSecond: this.$store.state.allNonMatchedSecond,//полностью несовпавшие данные
         almostMatched: this.$store.state.almostMatched//частично совпавшие строки
      }
   },
   mounted() {
      this.onload()
   },

   methods: {
      //при обнавление страницы пользователя переносит на главную
      onload(){
         window.onload = (() => {window.location.href="http://localhost:8080/#/"})
      },
   }
}
</script>

<style>
.block-form {
   text-align: center;
}

.result__block {
   border: 2px solid #419152;
   max-width: 400px;
   max-height: 200px;
   margin: 0 auto;
   border-radius: 15px;
   overflow: auto;
   padding: 10px;

}

.block__result-item {
   border-bottom: 2px solid #419152;
   border-top: 2px solid #419152;
   margin: -2px 0;
   padding: 10px 0;
}
</style>