<template>
  <div>
    {{ info }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'autoComplete',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    // axios
    //   .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //   .then(response => (this.info = response))
    axios({
      url: process.env.VUE_APP_GQL_URL,
      method: 'post',
      headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
      data: {
        query: `
            {
              member(limit:20) {
                id,
                title,
                name,
                lastname
              }
            }
          `
      }
    }).then((result) => {
      this.info = result.data.data.member
      console.log(result.data)
    })
  }
}
</script>
