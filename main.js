import Vue from "vue";

import App from "./App";
import router from "./router";
import axios from "./axios";
import VueTouch from "vue-touch";
import fun from "./assets/js/fun";
import globalFun from "./utils/globalFun";
import { Notify, Toast, Lazyload, Dialog } from "vant";
import store from "./store";
import VueCookies from "vue-cookies";
import "./utils/filters";
import Vant from "vant";
import "vant/lib/index.css";

// import Directives from './directives/index'
// Vue.use(Directives)
// import draggable from
// import { Input, Select, Option } from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// import hybrid_app from '../src/assets/js/hybrid_app'

// Vue.use(Input);
// Vue.use(Select);
// Vue.use(Option);
Vue.directive("drag", {
  inserted(el, binding, vnode) {
    console.log(el,binding,vnode)
    el.style.position = "absolute";
    el.style.left = 0;
    el.style.top = 0;
    let x = 0; // 记录元素拖拽时候的初始x轴位置
    let y = 0; // 记录元素拖拽时候的初始y轴位置
    el.ontouchstart = function (es) {
      // console.log(es)
      // el.offsetLeft dom距离左侧的偏移量
      // el.offsetTop dom距离顶部的偏移量
      x = es.touches[0].pageX - el.offsetLeft;
      y = es.touches[0].pageY - el.offsetTop;
      document.ontouchmove = function (em) {
        console.log(3333);
        let left = em.touches[0].pageX - x + "px";
        let top = em.touches[0].pageY - y + "px";
        el.style.left = left;
        el.style.top = top;
        document.body.addEventListener('touchmove', function(e){
          e.preventDefault();
        }, { passive: false }); 
      };
    };
 
    el.ontouchend = function () {
      document.ontouchmove = null;
    };
  },
});

Vue.use(Vant);
// Vue.use(hybrid_app)

import indexScss from "./style/index.scss";

//自动化全局注册组件
import components from "@/plugins/components";
Vue.use(components);

Object.entries(indexScss).forEach(([key, value]) => {
  //把scss变量设为vue全局变量
  Vue.prototype[`$${key}`] = value;
});
Vue.prototype.$bus = new Vue();

// 这是移动端控制台调试工具，需要调试就打开Vue.use(vConsole),不用就注释
// import Vconsole from "vconsole";
// const vConsole = new Vconsole();
// Vue.use(vConsole);

Vue.use(VueCookies);
//注册全局方法
Vue.use(globalFun);

Vue.use(Lazyload, {
  preLoad: 2,
});
Vue.config.productionTip = false;
Vue.config.silent = true;
Vue.prototype.$http = axios;
Vue.prototype.$fun = fun;
Vue.prototype.$notify = Notify;
Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;

Vue.use(VueTouch, { name: "v-touch" });

VueTouch.config.swipe = {
  hreshold: 100, //手指左右滑动距离
};

//连接webSocket
// Vue.prototype.$connectSocket();

Vue.filter("NumFormat", function(value) {
  if (!value) return "0.00";
  return Number(value).toFixed(2); //获取整数部分
});
new Vue({
  el: "#app",
  router,
  components: {
    App,
  },
  store,
  template: "<App/>",
});
