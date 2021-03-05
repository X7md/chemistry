let main =  Vue.component('cm-main', {
    data: function () {
      return {
        arr: []
      }
    },
    mounted: function () {
      fetch("data/feed-home.json").then((rep)=> rep.json()).then((json_) => this.arr = json_)
    }
    ,
    template: `
    <div class="row">
    <div class="col">
              <!--
                Cards
              -->
              <div v-for="item in arr" :key="item.title">
              <div class="card" :disabled="!item.link">
                <div class="card-body d-inline-flex">
                  <div class="info-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                  <p class="card-text">{{ item.description }}</p>
                  </div>
                  <button class="btn me-auto go-to">
                    <span class="material-icons-round">west</span>
                  </button>
                </div>
              </div>
              </div>
              <!--
                Cards
              -->
              <!--
                Info
              -->
            </div>
            <div class="col-4 m-auto">
              <div class="card info">
                <div class="card-body">
                  <h5 class="card-title">ضايع وحايس في الكيمياء؟</h5>
                  <p class="card-text">شُّويّة كيمياء هنا عشان تساعدك... عشان تستذكر ما نسيته أو ما لم تفهمه بشكل جيد...</p>
                  <a href="#" class="card-link">عن المشروع</a>
                </div>
              </div>
            </div>
            <!--
                Info
              -->
            </div>
            </div>
    `
  })

  const routes = [
    { path: '/', component: main },
  ]
  
  const router = new VueRouter({
    routes
  })
  
  
  const app = new Vue({
    router
  }).$mount('#app')