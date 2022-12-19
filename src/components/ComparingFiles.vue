<template>
   <div class="form">
      <h2 class="name-form-comparing">Comparing</h2>
      <div class="form-comparing">
         <div class="column-first">
            <h3>{{ this.$store.state.fileName }}</h3>
            <div v-for="(countSelect, index) in dataMain" :key="countSelect">
               <select v-model="firstSelected[index]" @change="getSelectValue()"
                  v-if="firstSelected[index] !== 'index'">
                  <option v-for="nameTable in dataMain" :key="nameTable"> {{ nameTable }} </option>
               </select>
            </div>
         </div>
         <div class="column-second">
            <h3>{{ this.$store.state.fileNameSecond }}</h3>
            <div v-for="(countSelectSecond, index) in dataMainSecond" :key="countSelectSecond">
               <select v-model="secondSelected[index]" @change="getSelectValueSecond()"
                  v-if="secondSelected[index] !== 'index'">
                  <option v-for="nameTable1 in dataMainSecond" :key="nameTable1"> {{ nameTable1 }} </option>
               </select>
            </div>
         </div>
      </div>
      <div class="block__btn">
         <router-link to="/"><button class="btn btn1">Back</button></router-link>
         <router-link to="/ResultComparing"><button @click='result()' class="btn btn1">Next</button></router-link>
      </div>
   </div>
</template>
 
<script>
export default {
   data() {
      return {
         dataMain: [],//заголовки первого файла
         dataMainSecond: [],//заголовки второго файла
         file: this.$store.state.file,//данные первого файла 
         fileSecond: this.$store.state.fileSecond,//данные второго файла
         firstSelected: [], //выбранные параметры из первой таблицы
         secondSelected: [], //выбранные параметры из второй таблицы
         allMatched: [],//полное совпадение
         allMatchedSecond: [],
         almostMatched: this.$store.state.almostMatched,//частично совпавшие строки из первой таблицы 
         almostMatchedSecond: this.$store.state.almostMatchedSecond,//частично совпавшие строки из второй таблицы
         allNonMatched: this.$store.state.allNonMatched,//все несовпало в первой таблице 
         allNonMatchedSecond: this.$store.state.allNonMatchedSecond,//все несовпало во второй таблице 
         particalMatched: [],//переменная для удобства 
         valueRand: 0,
      }
   },
   mounted() {
      this.dataFillingOne();
      this.dataFillingTwo();
      this.getSelectValue();
      this.getSelectValueSecond();
      this.onload()
   },
   methods: {
      dataFillingOne() {
         for (const data in this.$store.state.file[0]) {
            this.dataMain.push(data)
            this.firstSelected.push(data)
         }
      },
      dataFillingTwo() {
         for (const dataSecond in this.$store.state.fileSecond[0]) {
            this.dataMainSecond.push(dataSecond)
            this.secondSelected.push(dataSecond)
         }
      },
      getSelectValue() {
         this.$store.commit('SET_FIRST_SELECTED', this.selected_1)
      },
      getSelectValueSecond() {
         this.$store.commit('SET_SECOND_SELECTED', this.selected_2)
      },
      //при обнавление страницы пользователя переносит на главную
      onload() {
         window.onload = (() => { window.location.href = "http://localhost:8080/#/" })
      },
      result() {
         this.$store.state.file.forEach((dataFirst) => {
            let completeMismatch = true; //полностью несовпавшие
            let almostMatched = true;
            this.$store.state.fileSecond.forEach((dataSecond) => {
               let allMatched = true;
               this.dataMain.forEach((firstHeadersTable, index) => {
                  let nameColumnfirstTable = firstHeadersTable;
                  let nameColumnsecondTable = this.dataMainSecond[index];
                  let tableCell = dataFirst[nameColumnfirstTable] + " ";
                  let tableCellSecond = dataSecond[nameColumnsecondTable] + " ";
                  if (tableCell.trim() != tableCellSecond.trim()) {
                     allMatched = false;
                     this.valueRand += 1;
                  }
               });
               if (allMatched) {
                  completeMismatch = false;
                  this.allMatched.push([dataFirst, dataSecond]);
                  almostMatched = false;
                  this.particalMatched = [];
               }
               if (this.valueRand == 1 && almostMatched) {
                  completeMismatch = false;
                  this.particalMatched.push([dataFirst, dataSecond]);
               }
               this.valueRand = 0;
            });
            this.$store.state.almostMatched = [
               ...this.particalMatched,
               ...this.$store.state.almostMatched,
            ];
            if (completeMismatch) {//если данные полностью несовпадают то пушатся в массив 
               this.allNonMatched.push(dataFirst);
            }
         });
         this.$store.state.fileSecond.forEach((dataSecond) => {
            let completeMismatch = true;
            this.$store.state.file.forEach((dataFirst) => {
               let allMatchedSecond = true;
               let almostMatchedSecond = true;
               this.dataMainSecond.forEach((SecondHeaders, index) => {
                  let nameColumnfirstTable = this.dataMain[index];
                  let nameColumnsecondTable = SecondHeaders;
                  let tableCell = dataFirst[nameColumnfirstTable] + " ";
                  let tableCellSecond = dataSecond[nameColumnsecondTable] + " ";
                  if (tableCell.trim() != tableCellSecond.trim()) {
                     allMatchedSecond = false;
                     this.valueRand += 1;
                  }
               });
               if (allMatchedSecond) {
                  completeMismatch = false;
                  this.allMatchedSecond.push([dataFirst, dataSecond]);
                  almostMatchedSecond = false;
               }
               if (this.valueRand == 1 && almostMatchedSecond) {
                  completeMismatch = false;
                  this.almostMatchedSecond.push([dataFirst, dataSecond]);
               }
               this.valueRand = 0;
            });
            if (completeMismatch) {//если данные полностью несовпадают то пушатся в массив 
               this.allNonMatchedSecond.push(dataSecond);
            }
         });
      },
   }
}
</script>
 
 
<style>
.block__btn {
   display: flex;
   justify-content: space-around;
}

h3 {
   margin-bottom: 20px;
   max-width: 200px;
}

.name-form-comparing {
   text-align: center;
}

.form-comparing {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 50px;
}

select {
   width: 200px;
   margin-bottom: 10px;
   border: 2px solid #419152;
   border-radius: 15px;
   padding: 3px 5px;
}
</style>