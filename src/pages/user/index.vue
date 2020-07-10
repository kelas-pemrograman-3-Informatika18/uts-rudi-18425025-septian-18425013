<template>
  <q-page padding>
    <div class="q-mb-md">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        autoplay
        swipeable
        arrows
        transition-prev="jump-up"
        transition-next="rotate"
      >
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
    </div>
    <div class="col text-h2 text-bold text-blue-5  bg-yellow-5 q-mb-md">
      Daftar seminar
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-md-3 col-xs-12" v-for="(movie, i) in data" :key="i">
        <q-card>
          <q-img
            :src="`${$baseImageURL}/${movie.image}`"
            :ratio="16/9"
          />

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
            </div>
            <div class="text-subtitle1">
              {{ movie.genre }}
            </div>
            <div @click="movie.expanded = !movie.expanded" class="text-caption text-blue cursor-pointer">
              <u>
              Tampilkan Deskripsi
              </u>
            </div>
            <q-slide-transition>
              <div v-show="movie.expanded">
                <div class="text-grey text-caption">
                  {{ movie.deskripsi }}
                </div>
              </div>
            </q-slide-transition>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat round icon="event" />
        <q-btn flat>
          7:30PM
        </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog" v-if="dialog" position="bottom">
      <q-card class="fixed-center" style="width: 500px">
        <q-card-section>
          <div class="text-h6">Judul Seminar</div>
        </q-card-section>
        <q-card-section style="max-height: 50vh;" class="scroll">
          {{ activeData.judulFilm }}
          <q-form class="q-mt-md">
            <div>Info Seminar : 08974665051</div>

          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      stars: 5,
      image: null,
      dialog: false,
      data: [],
      activeData: null,
      jumlah: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('movie/getall')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(movie => {
              return Object.assign(movie, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('datauser')._id,
        idFilm: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>
