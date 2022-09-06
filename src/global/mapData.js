
const Images = [
    { image: "https://nos.jkt-1.neo.id/mcdonalds/promos/January2022/DI10aa7ZR0nVLjB5Dwa7.jpg"},
    { image: "https://cdn-2.tstatic.net/pontianak/foto/bank/images/promo-kfc-hari-ini-19-maret-2022.jpg" },
    { image: "https://static-cdn.pizzahut.co.id/cdn-cgi/image/quality=100,format=auto,width=540/https://static-cdn.pizzahut.co.id/uploads/temp/pizza-hut-delivery-dimsum-pizza-10-rb-dapat-snack-sliding-hot-promo-banner-718x308-1647252079019.jpg" },
    { image: "https://iraas.yumbi.com/?url=https%3a%2f%2fstatic.yumbi.com%2fmanagement%2fapi%2fresource%2f%3fid%3d169926%26ts%3d1643651429000" },
];

export const markers = [
    {
      coordinate: {
        latitude: -6.268227,
        longitude: 106.9091621,
      },
      title: "Mc Donalds",
      description: "Burgers, Wraps,Milkshakes...",
      image: Images[0].image,
      rating: 4,
      reviews: 99,
    },
    {
      coordinate: {
        latitude: -6.2831834,
        longitude: 106.9092832,
      },
      title: "KFC",
      description: "Chicken,Chicken wings...",
      image: Images[1].image,
      rating: 5,
      reviews: 102,
    },
    {
      coordinate: {
        latitude: -6.243529,
        longitude: 106.9321167,
      },
      title: "Pizza Hut",
      description: "Chicken pizza, Vegetarian pizza...",
      image: Images[2].image,
      rating: 3,
      reviews: 220,
    },
    {
      coordinate: {
        latitude: -6.2928286,
        longitude: 106.9568694,
      },
      title: "Steers",
      description: "Flame grilled beef Burgers",
      image: Images[3].image,
      rating: 4,
      reviews: 48,
    }
];

export const initialMapState = {
  markers,
  categories: [
    {
      name: 'Fastfood Center',
      icon: '<MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />',
    },
    {
      name: 'Restaurant',
      icon: '<Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />',
    },
    {
      name: 'Dineouts',
      icon: '<Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />',
    },
    {
      name: 'Snacks Corner',
      icon: '<MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />',
    },
    {
      name: 'Hotel',
      icon: '<Fontisto name="hotel" style={styles.chipsIcon} size={15} />',
    },
  ],
  region: {
    latitude: 22.62938671242907,
    longitude: 88.4354486029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  },
};

export const mapDarkStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

  export const mapStandardStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
  ];
