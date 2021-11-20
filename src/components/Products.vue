<template>
  <div>
    <div class="products" v-if="!products || products.length">
      <article v-for="product in products" :key="product.id">
        <h1>{{ product.title }}</h1>
        <p>{{ product.description }}</p>
      </article>
    </div>
    <div v-else>There is no products</div>
    <form class="form" @submit.prevent="createProduct">
      <h3>Create Product</h3>
      <template v-if="formError">
        <p class="form__error" v-for="error in formError" :key="error">
          {{ error }}
        </p>
      </template>
      <div>
        <label for="title">Title</label
        ><input type="text" v-model="productTitle" />
      </div>
      <div>
        <label for="description">Description</label
        ><input type="text" v-model="productDescription" />
      </div>
      <div>
        <button>Create Product</button>
      </div>
    </form>
  </div>
</template>

<script>
import productsService from "../services/api/products";
export default {
  name: "Products",

  data() {
    return {
      products: [],
      productDescription: "",
      productTitle: "",
      formError: false,
    };
  },

  created() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      productsService
        .getAll()
        .then((resp) => {
          this.products = resp.data;
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
    createProduct() {
      if (this.productTitle && this.productDescription) {
        this.formError = false;
        productsService
          .createProduct({
            title: this.productTitle,
            description: this.productDescription,
          })
          .then(() => {
            console.log("trtgrg kkk");
            this.getProducts();
          })
          .catch((err) => {
            console.log(Object.keys(err), "err create");
            this.formError = err.response.data.message;
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.form {
  width: 600px;
  margin: 0 auto;
  margin-top: 3rem;
}

.form__error {
  color: red;
  font-size: 14px;
  margin: 0.4rem 0;
}
</style>
