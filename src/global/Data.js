export const filterData = [
    { name: "Fast food", image: require('../assets/fastfood.png'), icon: "food-fork-drink", id: "0" },
    { name: "Burgers", image: require("../assets/burger.png"), icon: "food", id: "1" },
    { name: "Salads", image: require("../assets/salads.png"), icon: "food-croissant", id: "2" },
    { name: "Hotdog", image: require("../assets/hotdog.png"), icon: "food-variant", id: "3" },
    { name: "Chinese", image: require("../assets/chinese.png"), icon: "ideogram-cjk", id: "4" },
    { name: "Mexican", image: require("../assets/mexican.png"), id: "5" },
    { name: "Sea food", image: require("../assets/seafood.png"), id: "6" },
];

export const settingScreen = [
    { title: "Daftar Transaksi", icon: "format-list-bulleted-type", id: "0" },
    { title: "Promo Quest", icon: "gift-outline", id: "0" },
    { title: "Voucher", icon: "ticket-percent-outline", id: "0" },
    { title: "Ubah Password", icon: "lock-outline", id: "0" },
    { title: "Ulasan", icon: "star-outline", id: "0" },
]

export const filterData2 = [
    { name: "Fast food", image: 'https://media.istockphoto.com/photos/crispy-fried-breast-and-legs-from-chicken-picture-id157588995?s=612x612', id: "0" },
    { name: "Burgers", image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', id: "1" },
    { name: "Salads", image: "https://www.31daily.com/wp-content/uploads/2019/11/md-Winter-Greens-Salad-1-1-of-1a.jpg", id: "2" },
    { name: "Hotdog", image: "https://www.tokomesin.com/wp-content/uploads/2017/11/hot-dog-spesial.jpg", id: "3" },
    { name: "Chinese", image: "https://cms.bolong.id/img/artikel/chinese-food-6mo.jpeg", id: "4" },
    { name: "Japan Food", image: "https://i0.wp.com/www.tsunagulocal.com/wp-content/uploads/2020/11/osechi-feast-p43465618_M-1024x682-1.jpg", id: "5" },
    { name: "Sea food", image: "https://media-cdn.tripadvisor.com/media/photo-s/18/3a/09/6c/bonefish-seafood-platter.jpg", id: "6" },
    { name: "Chinese Food", image: "https://asset.kompas.com/crops/FBEmntvzs15OAArIelvPXdOSG8k=/0x0:740x493/750x500/data/photo/2020/03/24/5e79ac7be84d3.jpg", id: "7" },
    //{name:"Mexican pie",image:"https://bukasapics.s3.us-east-2.amazonaws.com/plate4.png",id:"8"},  
    {name:"Ocean fish",image:"https://tourismportdouglas.com.au/fileadmin/user_upload/Information_Article_Images/Things_to_see/Seabean_Seafood_paella.jpg",id:"9"},
];

export const restaurantsData = [
    {
        coordinate: {
            latitude: -6.268227,
            longitude: 106.9091621,
          },
        harga: 98000, rate: true,
        restaurantName: "Mc Donalds", farAway: "21.2",
        businessAddress: "Jl. Raya Jatiwaringin No. 26", images: 'https://nos.jkt-1.neo.id/mcdonalds/promos/January2022/DI10aa7ZR0nVLjB5Dwa7.jpg',
        averageReview: 4.9, numberOfReview: 272, coordinates: { lat: -26.1888612, lng: 28.246325 }, discount: null, deliveryTime: 15,
        collectTime: 5, foodType: "Burgers, Wraps,Milkshakes...",
        productData: [
            { id: 0, name: "Share Box", recom:false, price: 42500, desk: "Kentang, Nuget, filled ayam, saus keju", image: "https://www.mcdelivery.co.id/id/static/1649058564569/assets/62/products/112070.png?" },
            { id: 1, name: "Paket Hantaran McD",recom:true, price: 127000, desk: "5 Nasi, 5 Ayam, 5 Coca Cola", image: "https://www.mcdelivery.co.id/id/static/1649058564569/assets/62/products/211150.png?" },
            { id: 2, name: "Happy Meal Chicken Burger", recom:true, price: 39000, desk: "Burger, Saus, dan Kotak lucu", image: "https://www.mcdelivery.co.id/id/static/1649058564569/assets/62/products/117045.png?" },
            { id: 3, name: "1+1 Beef Burger", price: 21000, recom:false, desk: "1 Coca Cola dan 1 Burger", image: "https://www.mcdelivery.co.id/id/static/1649058564569/assets/62/products/200068.png?" }
        ],
        id: 0
    },

    {
            coordinate: {
              latitude: -6.2831834,
              longitude: 106.9092832,
            },
        harga: 101000, rate: false,
        restaurantName: "KFC (Kentucky Fried Chicken)", farAway: "12.7", businessAddress: "Jl. Raya Pondok Gede",
        images: 'https://cdn-2.tstatic.net/pontianak/foto/bank/images/promo-kfc-hari-ini-19-maret-2022.jpg',
        averageReview: 4.3, numberOfReview: 306, coordinates: { lat: -26.1891648, lng: 28.2441808 },
        discount: 20, deliveryTime: 30, collectTime: 10, foodType: "Chicken,Chicken wings... ",
        productData: [
            { id: 0, name: "Crispy Box", recom:true, price: 29300, desk: "Nasi + Ayam + Chicken Strips + Minuman", image: "https://files.kfcku.com/uploads/media/dummy/food/kfc-web_crispy-box_l.png" },
            { id: 1, name: "Chaki Kids Meal A",recom:true, price: 50800, desk: "Nasi + Ayam + Minuman + Mainan", image: "https://files.kfcku.com/uploads/media/food-menu/kids-meal/large/kfc-web_chaki-kids-meal-a_l_1.png" },
            { id: 2, name: "Chaki Kids Meal B", recom:false, price: 25000, desk: "Pom Pom + O.R. Burger + Minuman + Mainan", image: "https://files.kfcku.com/uploads/media/food-menu/kids-meal/large/kfc-web_chaki-kids-meal-b_l_1.png" },
            { id: 3, name: "Fish Fillet Combo", recom:true ,price: 25000, desk: "Fish Fillet + French Fries + Minuman", image: "https://files.kfcku.com/uploads/media/dummy/food/kfc-web_fishfilletc_l.png" },

        ],
        id: 1
    },

    {
        coordinate: {
            latitude: -6.243529,
            longitude: 106.9321167,
          },
        harga: 89000, rate: false,
        restaurantName: "Steers", farAway: "5", businessAddress: "Jl. M.H Thamrin",
        images: 'https://iraas.yumbi.com/?url=https%3a%2f%2fstatic.yumbi.com%2fmanagement%2fapi%2fresource%2f%3fid%3d169926%26ts%3d1643651429000',
        coordinates: { lat: -26.1886781, lng: 28.244879 }, averageReview: 4.9, numberOfReview: 1272,
        discount: 12, deliveryTime: 25, collectTime: 15, foodType: "Flame grilled beef Burgers",
        productData: [
            {id:0, name: "Original Cheese Burger", recom:true, desk:"Burger with fresh cheese", price: 35000, image: "https://steers.co.za/images/menu/2021/burgers/chicken---original-chicken-cheese-burger.png" },
            {id:1, name: "Full Chicken", recom:true, desk:"1 Chicken",  price: 50800, image: "https://steers.co.za/images/menu/2021/chicken/chicken---full-chicken.png" }, 
            {id:2, name: "Dessert Chocolate", recom:true, desk:"Yummy Dessert", price: 60000, image: "https://steers.co.za/images/menu/2021/desserts/ridiculously-thick-shakes/milkshake---chocolate-shake.png"},
        ],
        id: 2
    },

    {
        coordinate: {
            latitude: -6.2928286,
            longitude: 106.9568694,
          },
        harga: 72000, rate: true,
        restaurantName: "Pizza Hut", farAway: "7", businessAddress: "Jl. Raya Hnkam No. 29",
        images: 'https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=540/https://static-cdn.pizzahut.co.id/uploads/temp/pizza-hut-delivery-dimsum-pizza-10-rb-dapat-snack-sliding-hot-promo-banner-718x308-1647252079019.jpg',
        averageReview: 4.3, numberOfReview: 700, coordinates: { lat: -26.1845336, lng: 28.2481691 },
        discount: 23, deliveryTime: 20, collectTime: 10, foodType: "Chicken pizza, Vegetarian pizza...",
        productData: [
            { id: 0, name: "Meat Lovers with Cheesy Mayo", recom:true, price: 96000, desk: "Burger sapi, beef topping, sosis sapi, sosis ayam, keju mozzarella, cheesy mayo", image: "https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=212/https://static-cdn.pizzahut.co.id/uploads/products/meat-lover-cheesy-mayo-1646796386928.png" },
            { id: 1, name: "Chicken Fettuccine Alla Italia", recom:false, price: 53000, desk: "Pasta Creamy, Saus Spesial ala Italia dan Potongan Ayam Renyah.", image: "https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=212/https://static-cdn.pizzahut.co.id/uploads/products/alaitalia-1637144782737.png" },
            { id: 2, name: "Cappucino Jelly", recom:true, price: 19000, desk: "Minuman rasa cappuccino dengan Jelly didalamnya", image: "https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=212/https://static-cdn.pizzahut.co.id/uploads/products/cappucino-jelly-1632107266154.png" },
            { id: 3, name: "Cheesy Dough Balls 6 pcs", recom:true, price: 27000, desk: "Roti dengan Pepperoni dan Keju", image: "https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=212/https://static-cdn.pizzahut.co.id/uploads/products/1621993986359-cheesydoughball6pcs.png" }
        ],
        id: 3
    },
]

export const filterSearch = [
    {id:0, icon:"star", nama:"Bintang 4.5++"},
    {id:1, icon:"sale", nama:"Promo Makanan"},
    {id:2, icon:"clock", nama:"Buka Sekarang"},
    {id:3, icon:"star-circle", nama:"Super Partner"},
    {id:4, icon:"archive", nama:"Pick Up"}
]

export const restaurantsData2 = [
    {
        harga: 89000, rate: false,
        restaurantName: "Steers", farAway: "5", businessAddress: "Jl. M.H Thamrin",
        images: 'https://iraas.yumbi.com/?url=https%3a%2f%2fstatic.yumbi.com%2fmanagement%2fapi%2fresource%2f%3fid%3d169926%26ts%3d1643651429000',
        coordinates: { lat: -26.1886781, lng: 28.244879 }, averageReview: 4.9, numberOfReview: 1272,
        discount: 12, deliveryTime: 25, collectTime: 15, foodType: "Flame grilled beef Burgers",
        productData: [
            {id:0, name: "Original Cheese Burger", desk:"Burger with fresh cheese", price: 35000, image: "https://steers.co.za/images/menu/2021/burgers/chicken---original-chicken-cheese-burger.png" },
            {id:1, name: "Full Chicken",desk:"1 Chicken", price: 50.80, image: "https://steers.co.za/images/menu/2021/chicken/chicken---full-chicken.png" }, 
            {id:2, name: "Dessert Chocolate", desk:"Yummy Dessert", price: 60000, image: "https://steers.co.za/images/menu/2021/desserts/ridiculously-thick-shakes/milkshake---chocolate-shake.png"},
        ],
        id: 2
    },

    {
        harga: 72000, rate: true,
        restaurantName: "Pizza Hut", farAway: "7", businessAddress: "Jl. Raya Hnkam No. 29",
        images: 'https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=540/https://static-cdn.pizzahut.co.id/uploads/temp/pizza-hut-delivery-dimsum-pizza-10-rb-dapat-snack-sliding-hot-promo-banner-718x308-1647252079019.jpg',
        averageReview: 4.3, numberOfReview: 700, coordinates: { lat: -26.1845336, lng: 28.2481691 },
        discount: 45, deliveryTime: 20, collectTime: 10, foodType: "Chicken pizza, Vegetarian pizza...",
        productData: [
            { id: 0, name: "Meat Lovers with Cheesy Mayo", price: 96000, desk: "Burger sapi, beef topping, sosis sapi, sosis ayam, keju mozzarella, cheesy mayo", image: "https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=212/https://static-cdn.pizzahut.co.id/uploads/products/meat-lover-cheesy-mayo-1646796386928.png" },
            { id: 1, name: "Chicken Fettuccine Alla Italia", price: 53000, desk: "Pasta Creamy, Saus Spesial ala Italia dan Potongan Ayam Renyah.", image: "https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=212/https://static-cdn.pizzahut.co.id/uploads/products/alaitalia-1637144782737.png" },
            { id: 2, name: "Cappucino Jelly", price: 19000, desk: "Minuman rasa cappuccino dengan Jelly didalamnya", image: "https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=212/https://static-cdn.pizzahut.co.id/uploads/products/cappucino-jelly-1632107266154.png" },
            { id: 3, name: "Cheesy Dough Balls 6 pcs", price: 27000, desk: "Roti dengan Pepperoni dan Keju", image: "https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=212/https://static-cdn.pizzahut.co.id/uploads/products/1621993986359-cheesydoughball6pcs.png" }
        ],
        id: 3
    },

    {
        harga: 101000, rate: false,
        restaurantName: "KFC", farAway: "12.7", businessAddress: "Jl. Raya Pondok Gede",
        images: 'https://cdn-2.tstatic.net/pontianak/foto/bank/images/promo-kfc-hari-ini-19-maret-2022.jpg',
        averageReview: 4.3, numberOfReview: 306, coordinates: { lat: -26.1891648, lng: 28.2441808 },
        discount: 20, deliveryTime: 30, collectTime: 10, foodType: "Chicken,Chicken wings... ",
        productData: [
            { id: 0, name: "Crispy Box", price: 29300, desk: "Nasi + Ayam + Chicken Strips + Minuman", image: "https://files.kfcku.com/uploads/media/dummy/food/kfc-web_crispy-box_l.png" },
            { id: 1, name: "Chaki Kids Meal A", price: 50800, desk: "Nasi + Ayam + Minuman + Mainan", image: "https://files.kfcku.com/uploads/media/food-menu/kids-meal/large/kfc-web_chaki-kids-meal-a_l_1.png" },
            { id: 2, name: "Chaki Kids Meal B", price: 25000, desk: "Pom Pom + O.R. Burger + Minuman + Mainan", image: "https://files.kfcku.com/uploads/media/food-menu/kids-meal/large/kfc-web_chaki-kids-meal-b_l_1.png" },
            { id: 3, name: "Fish Fillet Combo", price: 25000, desk: "Fish Fillet + French Fries + Minuman", image: "https://files.kfcku.com/uploads/media/dummy/food/kfc-web_fishfilletc_l.png" },

        ],
        id: 1
    },

    {
        harga: 98000, rate: true,
        restaurantName: "Mc Donalds", farAway: "21.2",
        businessAddress: "Jl. Raya Jatiwaringin No. 26", images: 'https://nos.jkt-1.neo.id/mcdonalds/promos/January2022/DI10aa7ZR0nVLjB5Dwa7.jpg',
        averageReview: 4.9, numberOfReview: 272, coordinates: { lat: -26.1888612, lng: 28.246325 }, discount: null, deliveryTime: 15,
        collectTime: 5, foodType: "Burgers, Wraps,Milkshakes...",
        productData: [
            { id: 0, name: "Share Box", price: 42500, desk: "Kentang, Nuget, filled ayam, saus keju", image: "https://www.mcdelivery.co.id/id/static/1649058564569/assets/62/products/112070.png?" },
            { id: 1, name: "Paket Hantaran McD", price: 127000, desk: "5 Nasi, 5 Ayam, 5 Coca Cola", image: "https://www.mcdelivery.co.id/id/static/1649058564569/assets/62/products/211150.png?" },
            { id: 2, name: "Happy Meal Chicken Burger", price: 39000, desk: "Burger, Saus, dan Kotak lucu", image: "https://www.mcdelivery.co.id/id/static/1649058564569/assets/62/products/117045.png?" },
            { id: 3, name: "1+1 Beef Burger", price: 21000, desk: "1 Coca Cola dan 1 Burger", image: "https://www.mcdelivery.co.id/id/static/1649058564569/assets/62/products/200068.png?" }
        ],
        id: 0
    },
]

