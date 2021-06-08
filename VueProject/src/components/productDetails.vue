<template>
  <div >
    <div v-if="isLoaded">
      <h2>Product Details</h2>
      <div class="container" >
        <div class="image-column">
          <img
            v-bind:src="selectedItem.PhotoNameThumbnails"
          />
        </div>
        <div class="column" >
          <p><b>ID:</b> {{ selectedItem.ProductID }}</p>
          <p><b>Name: </b> {{ selectedItem.ItemName }}</p>
          <p><b>Description: </b> {{selectedItem.Description ? selectedItem.Description : 'NA'}}</p>
          <p><b>Dimensions :</b> {{ selectedItem.Dimensions}}</p>
          <p><b>BasePrice:</b> $ {{ selectedItem.BasePrice }}</p>
        </div>
      </div>
    </div>
    <div>
      <h2>Manufacturer Details</h2>
      <div class="container">
        <div class="image-column">
          <img v-bind:src="cmplogo"  />
        </div>
        <div class="column" v-if="productItems.SalesRep">
          <h2>Sales Rep</h2>
          <p><b>Company Name:</b> {{ productItems.SalesRep.CompanyName }}</p>
          <p><b>State </b> {{ productItems.SalesRep.State }}</p>
          <p><b>City </b> {{ productItems.SalesRep.City }}</p>
          <p><b>Email Address :</b> {{ productItems.SalesRep.EmailAddress }}</p>
          <p><b>Created By :</b> {{ productItems.SalesRep.CreatedBy }}</p>
          <p><b>Phone :</b> {{ productItems.SalesRep.Phone }}</p>
          <p><b>Postal Code:</b> {{ productItems.SalesRep.PostalCode }}</p>
          <p><b>CellPhone : </b> {{ productItems.SalesRep.CellPhone }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProductDetails",
  data() {
    return {
      productItems: {},
      selectedItem: {},
      isLoaded: false,
      cmplogo: "",
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
          this.productItems = resp.data;
          resp.data.items.forEach((eachRow) => {
            if (String(eachRow.ProductID) === String(this.$route.params.itemID)) {
              eachRow.PhotoNameThumbnails = `${eachRow.PhotoName}?w=300&h=300`;
              this.selectedItem = eachRow;
            }
          });
          this.cmplogo =
            "http://images.repzio.com/productimages/" +
            this.productItems.ManufacturerID +
            "/logo" +
            this.productItems.ManufacturerID +
            "_lg.jpg";
            this.isLoaded = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  text-align: left;
}
.container .image-column{
    text-align: center;
}
@media only screen and (max-width: 767px){
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
