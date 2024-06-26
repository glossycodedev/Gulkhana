class querySellers {
  sellers = [];
  query = {};
  constructor(sellers, query) {
    this.sellers = sellers;
    this.query = query;
  }

  categoryQuery = () => {
    this.sellers = this.query.category
      ? this.sellers.filter((c) => c.category === this.query.category)
      : this.sellers;
    
    return this;
  };

  searchQuery = () => {
    this.sellers = this.query.searchValue
      ? this.sellers.filter(
          (p) =>
            p.name.toUpperCase().indexOf(this.query.searchValue.toUpperCase()) >
            -1
        )
      : this.sellers;

    return this;
  };

  skip = () => {
    let { pageNumber } = this.query;
    const skipPage = (parseInt(pageNumber) - 1) * this.query.parPage;
    let skipSeller = [];

    for (let i = skipPage; i < this.sellers.length; i++) {
      skipSeller.push(this.sellers[i]);
    }
    this.sellers = skipSeller;
    return this;
  };

  limit = () => {
    let temp = [];
    if (this.sellers.length > this.query.parPage) {
      for (let i = 0; i < this.query.parPage; i++) {
        temp.push(this.sellers[i]);
      }
    } else {
      temp = this.sellers;
    }
    this.sellers = temp;
    return this;
  };

  getSellers = () => {
    return this.sellers;
  };

  countSellers = () => {
    return this.sellers.length;
  };
}

module.exports = querySellers;
