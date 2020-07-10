<template>
  <q-page padding class="bg-indigo-10 glossy">
    <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      class="my-card text-white"
      style="background: transparent"
      flat
    >
      <q-card-section>
        <div class="text-h6">Tentang Aplikasi</div>
        <div class="text-subtitle2">info aplikasi</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ tentang }}
      </q-card-section>
      <div class="q-pa-md row items-start q-gutter-md">
      </div>
    </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      tentang: 'info seminar merupakan aplikasi yang digunakan untuk mencari info tentang seminar nasional dan internasional'
    }
  }
}
</script>
