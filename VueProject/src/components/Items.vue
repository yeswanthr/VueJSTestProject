<template>
  <div class="container">
    <div
      v-for="item in productItems.items"
      class="card-item"
      v-on:click="clickedItem(item)"
    >
      <img v-bind:src="item.PhotoNameThumbnails" />

      <div class="card-details">
        <h2>{{ item.ItemName }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Items",
  data() {
    return {
      productItems: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(
          "https://raw.githubusercontent.com/RepZio/TestApplication/master/test.json"
        )
        .then((resp) => {
          resp.data.items.forEach((eachRow, index) => {
            resp.data.items[
              index
            ].PhotoNameThumbnails = `${eachRow.PhotoName}?w=250&h=200`;
          });
          this.productItems = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clickedItem(data) {
      this.$router.push({
        name: "itemDetails",
        params: { itemID: data.ProductID },
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}

.card-details {
  padding: 10px;
}

h2 {
  color: #03a9f4;
}

.card-item {
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
}

.card-item img {
  width: 100%;
}

/* Extra small devices (phones, 600px and down) */

@media only screen and (max-width: 600px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */

@media only screen and (min-width: 600px) and (max-width: 767px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Medium devices (landscape tablets, 768px and up) */

@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
