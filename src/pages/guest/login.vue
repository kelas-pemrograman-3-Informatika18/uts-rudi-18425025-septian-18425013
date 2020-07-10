<template>
  <q-layout class="bg-blue-grey-1" view="lHh Lpr Lff">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 co-xs-12 q-pa-md">
            <q-card flat class="text-blue-grey-14">
              <div class="row items-center">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="row">
                    <div class="col-md-8 offset-2">
                      <q-img src="~assets/undraw_Login_v483.svg"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <q-card-section>
                    <div class="text-h4">Info Seminar</div>
                    <div>Login Akun Admin</div>
                  </q-card-section>
                   <q-form
                   @submit="login"
                   >
                     <q-card-section>
                       <q-input v-model="username" label="username"/>
                       <q-input type="password" v-model="password" label="password"/>
                     </q-card-section>
                     <q-card-section>
                       <q-btn class="full-width" type="submit" color="primary" unelevated label="Login"/>
                       <q-btn class="full-width q-mt-md" :to="{ name: 'registerpage' }" flat color="primary" unelevated label="Register" />
                     </q-card-section>
                   </q-form>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login () {
      this.$axios.post('user/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$q.localStorage.set('datauser', res.data.data)
          if (res.data.data.level === 1) {
            this.$router.push({ name: 'dataDVD' })
          } else {
            this.$router.push({ name: 'dataDVD' })
          }
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
