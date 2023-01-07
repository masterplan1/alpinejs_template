document.addEventListener('alpine:init', () => {
  Alpine.store("header", {
    cartItems: 0,
    watchingItems: [],
    get watchlistItems() {
      return this.watchingItems.length
    },
  });

  Alpine.data("toast", () => ({
    visible: false,
    timeout: 5000,
    percent: 0,
    interval: null,
    timeoutItem: null,
    message: null,
    close() {
      this.visible = false;
      clearInterval(this.interval)
    },
    show(message) {
      this.visible = true;
      this.message = message
      if (this.interval && this.temeoutItem) {
        clearInterval(this.interval)
        clearTimeout(this.temeoutItem)
        this.interval = null
        this.temeoutItem = null
      }
      this.temeoutItem = setTimeout(() => {
        this.visible = false;
        this.temeoutItem = null;
      }, this.timeout)
      const startDate = Date.now()
      const futureDate = startDate + this.timeout

      this.interval = setInterval(() => {
        const date = Date.now()
        this.percent = (date - startDate) * 100 / this.timeout
        if (this.percent >= 100) {
          clearInterval(this.interval)
          this.interval = null
        }
      }, 30)
    }
  }));

  Alpine.data("productItem", () => ({
    quantity: 1,
    get watchlistItems() {
      return this.watchingItems.length
    },
    addToWatchlist(id) {
      if (this.$store.header.watchingItems.includes(id)) {
        const i = this.$store.header.watchingItems.indexOf(id);
        if (i > -1) this.$store.header.watchingItems.splice(i, 1)
        this.$dispatch('notify', {message: 'The item has been removed from your watchlist!'})
        return;
      }
      this.$store.header.watchingItems.push(id)
      this.$dispatch('notify', {message: 'The item has been added to your watchlist!'})
    },
    isInWatchlist(id) {
      return this.$store.header.watchingItems.includes(id);
    },
    addToCart(quantity = 1) {
      this.$store.header.cartItems += parseInt(quantity);
      this.$dispatch('notify', {
        message: 'The item has been added to your watchlist!'
      })
    },
  }))

  // Alpine.data('index', () => ({
  //   cartItems: 0,
  //   quantity: 1,
  //   watchingItems: [],
  //   get watchlistItems() {
  //     return this.watchingItems.length
  //   },
  //   isInWatchlist(id) {
  //     return this.watchingItems.includes(id);
  //   },
  //   addToCart(quantity = 1) {
  //     this.cartItems += parseInt(quantity);
  //     this.toast.show('The item has been added to cart!')
  //   },
  //   addToWatchlist(id) {
  //     if (this.watchingItems.includes(id)) {
  //       const i = this.watchingItems.indexOf(id);
  //       if (i > -1) this.watchingItems.splice(i, 1)
  //       this.toast.show('The item has been removed from your watchlist!')
  //       return;
  //     }
  //     this.watchingItems.push(id)
  //     this.toast.show('The item has been added to your watchlist!')
  //   },
  //   toast: {
  //     visible: false,
  //     timeout: 5000,
  //     percent: 0,
  //     interval: null,
  //     timeoutItem: null,
  //     message: null,
  //     close() {
  //       this.toast.visible = false;
  //       clearInterval(this.toast.interval)
  //     },
  //     show(message) {
  //       this.visible = true;
  //       this.message = message
  //       if (this.interval && this.temeoutItem) {
  //         clearInterval(this.interval)
  //         clearTimeout(this.temeoutItem)
  //         this.interval = null
  //         this.temeoutItem = null
  //       }
  //       this.temeoutItem = setTimeout(() => {
  //         this.visible = false;
  //         this.temeoutItem = null;
  //       }, this.timeout)
  //       const startDate = Date.now()
  //       const futureDate = startDate + this.timeout

  //       this.interval = setInterval(() => {
  //         const date = Date.now()
  //         this.percent = (date - startDate) * 100 / this.timeout
  //         if (this.percent >= 100) {
  //           clearInterval(this.interval)
  //           this.interval = null
  //         }
  //       }, 30)
  //     }
  //   }
  // }))
})