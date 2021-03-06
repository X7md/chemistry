let main =  Vue.component('cm-main', {
    data: function () {
      return {
        arr: [] // array of objects {title: "", description: "", link: ""}
      }
    },
    mounted: function () {
      // get feed of home page cards (( Arrayb of JSON objects ))
      fetch("data/feed-home.json", {cache: "no-cache"}).then((rep)=> rep.json()).then((json_) => this.arr = json_) // set to arr
    },
    updated: function () {
      this.$nextTick(function () {
        var alertNode = this.$refs["alert"]
        var alert = bootstrap.Alert.getInstance(alertNode)
        this.$refs[".btn-close"].addEventListener("click", e => {alert.close()})
      })
    },
    template: `
    <div class="row">
    <div class="col">
              <!--
                Cards
              -->
              <div v-for="item in arr" :key="item.title" :class="!item.link ? 'x-none' : ''">
              <div class="card" :disabled="!item.link">
                <div class="card-body d-inline-flex">
                  <div class="info-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                  <p class="card-text">{{ item.description }}</p>
                  </div>
                  <router-link class="me-auto" :to="{ name: 'go-to', params: { title: item.link }}">
                  <button class="btn go-to">
                    <span class="material-icons-round">west</span>
                  </button>
                  </router-link>
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
let subject =  Vue.component('cm-subject', {
    data: function () {
      return {
        html_: "" // html raw text
      }
    },
    mounted: function () {
      // get feed of info
      fetch("data/explain/" + this.$route.params["title"] + ".html", {cache: "no-cache"}).then((rep)=> rep.text()).then((html) => this.html_ = html) // set to arr
    },
    template: `
    <div class="row">
    <div class="col">
      <div class="card" dir="rtl">
        <div class="card-body">
          <div v-html="html_"></div>
        </div>
      </div>
    </div>
    </div>
    `
  })

  const routes = [
    { path: '/', component: main },
    { path: '/explain/:title', component: subject, name: "go-to" }
  ]
  
  const router = new VueRouter({
    routes
  })
  
  
  const app = new Vue({
    router
  }).$mount('#app')