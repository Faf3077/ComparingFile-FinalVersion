import Vue from 'vue'
import VueRouter from 'vue-router'
import FileUpload from "../components/FileUpload"
import ComparingFiles from "../components/ComparingFiles"
import ResultComparing from "../components/ResultComparing"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: FileUpload
  },
  {
    path: '/ComparingFiles',
    component: ComparingFiles
  },
  {
    path: '/ResultComparing',
    component: ResultComparing
  },
]

const router = new VueRouter({
  routes
})


export default router;
