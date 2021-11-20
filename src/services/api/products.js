import client from "../client";

class Products {
  constructor() {
    this.url = "/products";
  }

  async getAll() {
    return client.get(this.url);
  }

  async createProduct(product) {
    return client({
      url: this.url,
      method: "POST",
      data: product,
    });
  }
}

export default new Products();
