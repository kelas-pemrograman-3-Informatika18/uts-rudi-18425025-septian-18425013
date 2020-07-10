<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
            </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">data seminar</div>
              <div>Data Katalog seminar</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
        <q-table
          title="Treats"
          :data="data"
          :columns="columns"
          row-key="name"
          flat
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="Info Seminar" :props="props">
                {{ props.row.judulFilm}}
              </q-td>
              <q-td key="tahun" :props="props">
                {{ props.row.tahun}}
              </q-td>
              <q-td key="genre" :props="props">
                {{ props.row.genre}}
              </q-td>
              <q-td key="deskripsi" :props="props">
                <div class="ellipsis" style="max-width: 100px;">
                  {{ props.row.deskripsi}}
                </div>
              </q-td>
              <q-td key="gambar" :props="props">
                <q-img
                :src="`${$baseImageURL}/${props.row.image}`"
                spinner-color="white"
                />
              </q-td>
              <q-td key="aksi" :props="props">
                <q-btn :to="{ name: 'formedit', params: { id:props.row._id }}" label="Edit" icon="edit" color="warning" unelevated />
                <q-btn @click="deleteMovie(props.row._id)" label="Hapus" icon="delete" color="negative" class="q-ml-md" unelevated />
              </q-td>
            </q-tr>
          </template>
        </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'JudulSeminar', align: 'left', label: 'Judul Seminar', field: 'judulFilm', sortable: true },
        { name: 'waktu', align: 'left', label: 'Tahun', field: 'waktu', sortable: true },
        { name: 'deskripsi', align: 'left', label: 'Deskripsi', field: 'deskripsi', sortable: true },
        { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],

      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('movie/getall')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          } else {
            this.showNotif(res.data.pesan, 'negative')
          }
        })
    },
    deleteMovie (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Apakah Anda Yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`movie/delete/${id}`)
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      })
    }
  }
}
</script>
<style scoped>
.left {
  width: 3px;
  height: 100%;
  background-color: rgb(3, 7, 63);
}
</style>
