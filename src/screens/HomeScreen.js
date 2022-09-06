import {
    StyleSheet, Text, View, TouchableOpacity, ScrollView,
    FlatList, Image, Pressable, Dimensions, AsyncStorage, ImageBackground, TouchableWithoutFeedback, SafeAreaView
} from 'react-native'

import React, { useContext, useEffect, useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import { colors } from '../global/styles'
import { Icon } from 'react-native-elements'
import { filterData, filterData2, restaurantsData, restaurantsData2 } from '../global/Data'



import FilterModal from './FilterModal'
import { AppContext } from '../context/app-context'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.53;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const HomeScreen = ({ navigation }) => {

    //const [delivery,setDelivery] = useState(true)
    const [showFilterModal, setShowFilterModal] = useState(false)

    const context = useContext(AppContext)

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: context.darkTheme ? "black" : "white", }}>
            <HomeHeader />
            <ScrollView
                //stickyHeaderIndices={"0"}
                showsVerticalScrollIndicator={false}
            >
                {/* <View style={{
                    marginLeft: 20,
                    marginTop: 20
                }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginBottom: 5
                    }}>
                        Explore dan Temukan
                    </Text>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold"
                    }}>Restaurant Terbaik Anda </Text>
                </View> */}

                <View style={{
                    padding: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("SearchScreen")
                        }}
                        style={{
                            borderWidth: 1,
                            borderColor: colors.grey4,
                            padding: 10,
                            flexDirection: "row",
                            borderRadius: 10,
                            backgroundColor: "#F4F6F6",
                            alignItems:"center",
                            width: "90%"
                        }}>
                        <Icon
                            type='meterial'
                            name="search"
                            size={20}
                        />
                        <Text style={{ marginLeft: 10 }}>Cari di sini</Text>
                    </TouchableOpacity>
                    {/* filter buttons */}
                    <TouchableOpacity
                        onPress={() =>
                            setShowFilterModal(true)
                        }
                    >
                        <View style={{
                            marginHorizontal: 10
                        }}>
                            <Icon
                                type='material-community'
                                name="tune"
                                size={22}
                                color={context.darkTheme ? "white" : "black"}
                            />
                        </View>
                    </TouchableOpacity>
                    {showFilterModal &&
                        <FilterModal
                            isVisible={showFilterModal}
                            isClose={() => setShowFilterModal(false)}
                        />
                    }
                </View>
                <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
                    <View
                        source={{ uri: colors.background }}
                        borderRadius={20}
                        style={{
                            borderRadius: 20,
                            padding: 15,
                            backgroundColor: colors.buttons,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                        <View style={{
                            backgroundColor: colors.cardbackground,
                            //borderWidth:1, 
                            borderRadius: 10,
                            padding: 5
                        }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Icon
                                    type='material-community'
                                    name='wallet'
                                    size={17}
                                    color="#6FD6F8"
                                />
                                <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: 13 }}>Saldo</Text>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 14 }}>Rp100.000</Text>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 11, color: colors.buttons }}>Klik & Cek Riwayat</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: 5, alignItems: "center" }}>

                            <Icon
                                type='material-community'
                                name='plus-circle'
                                color="white"
                                size={30}
                            />
                            <Text style={{ marginTop: 5, fontWeight: "bold", color: "white", fontSize: 13 }}>Isi Saldo</Text>
                        </View>
                        <View style={{ marginLeft: 5, alignItems: "center" }}>
                            <Icon
                                type='material-community'
                                name='arrow-up-circle'
                                color="white"
                                size={30}
                            />
                            <Text style={{ marginTop: 5, fontWeight: "bold", color: "white", fontSize: 13 }}>Bayar</Text>
                        </View>
                        <View style={{ marginLeft: 5, alignItems: "center" }}>
                            <Icon
                                type='material-community'
                                name='compass'
                                color="white"
                                size={30}
                            />
                            <Text style={{ marginTop: 5, fontWeight: "bold", color: "white", fontSize: 13 }}>Eksplor</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginHorizontal: 20,
                    marginBottom: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: context.darkTheme ? "white" : "black"
                    }}>
                        Aneka Kuliner
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.buttons, fontWeight: "bold" }}>Lihat Semua</Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    //height={50}
                    style={{ ...styles.chipsScrollView, borderBottomWidth: 1, borderColor: colors.grey5 }}
                    contentInset={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 20
                    }}

                >
                    {/* <TouchableOpacity
                        onPress={() => {
                            setIndexCheck("-1")
                        }}
                        style={indexCheck === "-1" ? styles.chipsItemSelected : styles.chipsItem}>
                        <Text style={{ color: indexCheck === "-1" ? colors.cardbackground : "black" }}>All</Text>
                    </TouchableOpacity> */}
                    {filterData2.map((item, index) => (
                        // <TouchableOpacity
                        //     key={index}
                        //     onPress={() => {
                        //         setIndexCheck(item.id)
                        //     }}
                        //     style={indexCheck === item.id ? styles.chipsItemSelected : styles.chipsItem}>
                        //     <MaterialCommunityIcons style={{ ...styles.chipsIcon, color: indexCheck === item.id ? colors.cardbackground : "black" }} name={item.icon} size={18} />
                        //     <Text style={{ color: indexCheck === item.id ? colors.cardbackground : "black" }}>{item.name}</Text>
                        // </TouchableOpacity>
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => {
                                navigation.navigate("FilterResultScreen", {
                                    gambar: item.image,
                                    nama: item.name
                                })
                            }}>
                            <View style={{ marginHorizontal: 10, marginBottom: 10, alignItems: "center" }}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ height: 60, width: 60, marginBottom: 5 }}
                                    resizeMode="cover"
                                    borderRadius={30}
                                />
                                <Text style={{
                                    fontSize: 11,
                                    color: context.darkTheme ? "white" : "black",
                                    fontWeight: "bold"
                                }}>{item.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>

                <View style={{
                    marginHorizontal: 20,
                    marginTop: 20, flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: context.darkTheme ? "white" : "black",
                    }}>
                        Paling Populer
                    </Text>
                    <TouchableOpacity
                        onPress={()=>{
                            //navigation.navigate("BottomSheetScreen")
                        }}
                    >
                    <Text style={{ fontSize: 12, color: colors.buttons, fontWeight: "bold" }}>Lihat Semua</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{
                            marginHorizontal: 10, marginTop: 10,
                            shadowColor: '#ccc',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            width: "100%"
                        }}
                    >
                        {restaurantsData.map((marker, index) => (

                            <TouchableWithoutFeedback
                                onPress={() => {
                                    context.setRefresh(true)
                                    navigation.navigate("DetailRestoScreen", { id: marker.id })
                                }}
                                key={index}>
                                <View style={styles.card}>
                                    <ImageBackground
                                        source={{ uri: marker.images }}
                                        style={styles.cardImage}
                                        resizeMode="cover"
                                        borderRadius={10}
                                    >
                                        {marker.discount ?
                                            <View style={{ alignItems: "flex-start", marginTop: 10 }}>
                                                <View style={{
                                                    backgroundColor: "red",
                                                    width: "45%",
                                                    borderBottomRightRadius: 6,
                                                    borderTopRightRadius: 6,
                                                    padding: 1,
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                }}>
                                                    <Text style={{ marginLeft: 5, fontSize: 14, color: "white", fontWeight: "bold" }}>{marker.discount}% offer</Text>
                                                </View>
                                            </View>
                                            :
                                            null
                                        }
                                    </ImageBackground>
                                    <View style={styles.textContent}>

                                        <Text style={styles.cardDescription}>{marker.farAway} km</Text>
                                        <Text style={styles.cardtitle}>{marker.restaurantName}</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon
                                                type='material-community'
                                                name="star"
                                                color="#FF8C00"
                                                size={14}
                                            />
                                            <Text style={{ fontSize: 11, fontWeight: "600" }}>{marker.averageReview} . {marker.numberOfReview}++ Rating</Text>
                                        </View>
                                    </View>
                                </View>

                            </TouchableWithoutFeedback>
                        ))}
                    </ScrollView>
                </View>

                <View style={{
                    marginHorizontal: 20,
                    marginTop: 20, flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: context.darkTheme ? "white" : "black",
                    }}>
                        Promo Buat Kamu
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.buttons, fontWeight: "bold" }}>Lihat Semua</Text>
                </View>
                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{
                            marginHorizontal: 10, marginTop: 10,
                            shadowColor: '#ccc',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            width: "100%"
                        }}
                    >
                        {restaurantsData.map((marker, index) => (
                            <View key={index}>
                                <Pressable onPress={() => {
                                    context.setRefresh(true)
                                    navigation.navigate("DetailRestoScreen", { id: marker.id })
                                }}>
                                    {marker.discount &&
                                        <View style={styles.card}>
                                            <ImageBackground
                                                source={{ uri: marker.images }}
                                                style={styles.cardImage}
                                                resizeMode="cover"
                                                borderRadius={10}
                                            >
                                                <View style={{ alignItems: "flex-start", marginTop: 10 }}>
                                                    <View style={{
                                                        backgroundColor: "red",
                                                        width: "45%",
                                                        borderBottomRightRadius: 6,
                                                        borderTopRightRadius: 6,
                                                        padding: 1,
                                                        alignItems: "center",
                                                        flexDirection: "row",
                                                    }}>
                                                        <Text style={{ marginLeft: 5, fontSize: 14, color: "white", fontWeight: "bold" }}>{marker.discount}% offer</Text>
                                                    </View>
                                                </View>
                                            </ImageBackground>
                                            <View style={styles.textContent}>

                                                <Text style={styles.cardDescription}>{marker.farAway} km</Text>
                                                <Text style={styles.cardtitle}>{marker.restaurantName}</Text>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Icon
                                                        type='material-community'
                                                        name="star"
                                                        color="#FF8C00"
                                                        size={14}
                                                    />
                                                    <Text style={{ fontSize: 11, fontWeight: "600" }}>{marker.averageReview} . {marker.numberOfReview}++ Rating</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }

                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>


                <View style={{
                    marginHorizontal: 20,
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: context.darkTheme ? "white" : "black",
                    }}>
                        Rekomendasi Buatmu
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: "bold", color: colors.buttons }}>Lihat Semua</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20, marginLeft: 10 }}>
                    {restaurantsData.map((item, index) => (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                context.setRefresh(true)
                                navigation.navigate("DetailRestoScreen", { id: item.id })
                            }}
                            key={index}
                        >
                            <View style={{
                                borderWidth:0.2,
                                padding: 10,
                                marginHorizontal: 10,
                                marginTop: 10,
                                borderRadius: 10,
                                backgroundColor: colors.cardbackground,
                                borderColor: colors.grey4,
                                shadowColor: '#ccc',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.5,
                                shadowRadius: 5,
                                width: width * 0.8,
                                marginBottom: 10
                            }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch" }}>
                                    <ImageBackground
                                        source={{ uri: item.images }}
                                        style={{ height: 80, width: 80 }}
                                        borderRadius={10}
                                    >
                                        <View style={{ alignItems: "flex-end" }}>
                                            <View style={{
                                                backgroundColor: "white",
                                                opacity: 0.9,
                                                width: "50%",
                                                borderBottomLeftRadius: 6,
                                                padding: 1,
                                                alignItems: "center",
                                                flexDirection: "row"
                                            }}>
                                                <Icon
                                                    type='material-community'
                                                    name='star'
                                                    color="#FF8C00"
                                                    size={14}
                                                />
                                                <Text style={{ fontSize: 11 }}>{item.averageReview}</Text>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                    <View style={{ flex: 1, marginLeft: 10, flexDirection: "column", justifyContent: "space-between" }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.restaurantName}</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon
                                                type='material-community'
                                                name="google-maps"
                                                size={16}
                                                color="red"
                                            />
                                            <Text style={{ fontSize: 12, marginLeft: 5 }}>{item.businessAddress}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon
                                                type='material-community'
                                                name="bike"
                                                color={colors.buttons}
                                                size={20}
                                            />
                                            <Text style={{ fontSize: 12, marginLeft: 10 }}>{item.farAway} km</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon
                                                type='material-community'
                                                name="heart-circle"
                                                color="red"
                                                size={15}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContent: {
        //flex: 1,
        padding: 10,
    },
    card: {
        // padding: 10,
        //elevation: 2,
        backgroundColor: "#FFF",
        borderRadius: 5,
        borderRadius: 10,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
        marginBottom: 10,
        borderWidth:0.2,
        borderColor:colors.grey4
    },
    cardImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },

    cardtitle: {
        fontSize: 14,
        // marginTop: 5,
        //marginLeft:5,
        fontWeight: "bold",
        marginBottom: 5
    },
    cardDescription: {
        fontSize: 11,
        //marginLeft:5,
        color: "#444",
        marginBottom: 5,
        fontWeight: "bold"
    },
    select: {
        color: colors.cardbackground
    },

    chipsItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    
    chipsScrollView: {
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    }
})