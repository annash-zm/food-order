import { Dimensions, useWindowDimensions } from "react-native"

export const colors = {
    buttons: "#E84C4F",
    grey1: "#43484d",
    grey2: "#536977",
    grey3: "#86939e",
    grey4: "#bdc6cf",
    grey5: "#e1e8ee",
    CardComment: "#009E60",
    cardbackground: "white",
    statusbar: "#4682B4",
    lightgreen: "#40B5AD",
    background: "https://i.pinimg.com/564x/a7/3e/38/a73e38adfc2680dcbf7ec9b883373ae7.jpg",
    logo: require("../assets/logo.png"),
    star: "#FF8C00",
    lightblue: "#6FD6F8"
}

export const screen_scale = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const isValidEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
        return false;
    }
    else {
        return true
    }
}

export const slides = [
    {
        id: '0',
        title: "Sistem Pembayaran yang mudah",
        description: "Bayar lewat apa saja dan dimana saja bisa dilakukan dengan cepat dan sangat mudah",
        image: require("../assets/onboard/3369658.jpg")
    },
    {
        id: '1',
        title: "Di antar dengan Cepat",
        description: "Driver yang selalu ready dan restaurant yang cepat tanggap membuat pengiriman sangat cepat",
        image: require("../assets/onboard/3333449.jpg")
    },
    {
        id: '2',
        title: "Makanan fresh dan Hangat",
        description: "Makanan yang baru diolah langsung dikirim ke kamu bikin makan-mu fresh dan hangat",
        image: require("../assets/onboard/slide3.png")
    }
]

export const parameters = {
    headerHeight: 80,

    styledButton: {
        backgroundColor: "#E84C4F",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E84C4F",
        height: 50,
        paddingHorixontal: 20,
        width: "100%"
    },

    buttonTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center"
    },
}

export const title = {
    color: colors.buttons,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 30
}