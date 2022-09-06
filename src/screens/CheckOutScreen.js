import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, SafeAreaView } from 'react-native'
import { colors, screen_scale } from '../global/styles'

import Animated, { SlideOutLeft } from 'react-native-reanimated'
import { Icon } from 'react-native-elements'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/app-context'

import * as Location from 'expo-location'

const CheckOutScreen = (
  { navigation, route }
) => {
  const { nama, data, waktu, price, disk, restoLoc } = route.params

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const context = useContext(AppContext)


  const diskon = (price) => {
    if (disk) {
      return price * (1 - disk / 100)
    }
    else {
      return price
    }
  }

  const updateSaveResto = (index, jumlah) => {
    const updated = [...context.saveResto];
    updated.map((it, idx) => {
      if (it.id === index) {
        updated[idx].jumlah = jumlah
      }
    })
  }

  const removeItem = (i) => {
    const index = context.saveResto.findIndex(prod => prod.id === i); //use id instead of index
    const baru = [...context.saveResto]
    baru.splice(index, 1)
    context.setSaveResto(baru)
  }

  const ambilJumlah = (i) => {
    const idx = context.saveResto.findIndex((prev) => prev.id === i)
    return context.saveResto[idx].jumlah
  }

  function tampilJumlah(id) {
    let kembalikan;
    context.saveResto.map((itm) => {
      if (itm.id === id) {
        kembalikan = itm.jumlah
      }
    })
    return kembalikan
  }

  const handleMinus = (harga, id) => {
    context.setCountItem(context.countItem - 1)
    context.setTampungTotal(context.tampungTotal - harga)
    updateSaveResto(id, ambilJumlah(id) - 1)
    if (ambilJumlah(id) === 0) {
      removeItem(id)
    }
    if (context.countItem - 1 === 0) {
      context.setRefresh(true)
      navigation.goBack()
    }
  }

  const handlePlus = (harga, id) => {
    context.setCountItem(context.countItem + 1)
    context.setTampungTotal(context.tampungTotal + harga)
    updateSaveResto(id, ambilJumlah(id) + 1)
  }

  const [errorMsg, setErrorMsg] = useState(null);

  const [loading, setLoading] = useState(false)

  const getLocation = async () => {
    setLoading(true)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLoading(false)
    navigation.navigate("OrderDelivery",
      {
        nama: nama,
        data: data,
        waktu: waktu,
        price: price,
        disk: disk,
        restoLoc: restoLoc,
        locate: location
      })
  };

  function renderHeader() {
    return (
      <View style={{
        borderBottomWidth: 0.2,
        borderColor: colors.grey4,
        paddingVertical: 10, paddingHorizontal: 20
      }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack()
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <Icon
                type='material-community'
                name="arrow-left"
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flex: 1, marginLeft: 5, justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {nama.length > 22 ? nama.substring(0, 22) + "..." : nama}
            </Text>
          </View>
          <View>
            <Icon
              type='material'
              name="search"
            />
          </View>
          <View>
            <Icon
              type='material'
              name='share'
            />
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        {/* start card */}
        <View style={{
          borderRadius: 10,
          borderWidth: 0.4,
          borderColor: colors.grey4,
          padding: 12,
          marginVertical: 15
        }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Icon
              type='material-community'
              name="bike-fast"
              size={32}
              color={colors.buttons}
            />
            <View style={{ marginHorizontal: 10, flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>Pesan antar</Text>
              <Text style={{ fontSize: 11 }}>Diantar dalam {waktu} menit</Text>
            </View>
            <View style={{ padding: 10, borderWidth: 1, borderRadius: 20, borderColor: colors.buttons }}>
              <Text style={{ color: colors.buttons, fontWeight: "bold", fontSize: 12 }}>Ganti</Text>
            </View>
          </View>
        </View>
        {/* end card */}

        <View style={{
          borderRadius: 10,
        }}>
          {context.saveResto.map((item, index) => (
            <View key={index}>
              {item.jumlah != 0 &&
                <View style={{
                  marginBottom: 20,
                  borderBottomWidth: 0.4,
                  paddingVertical: 10,
                  borderColor: colors.grey4,
                  backgroundColor: "white"
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 5
                  }}>
                    <View>
                      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{item.namaResto}</Text>
                      <View style={{ flexDirection: "row" }}>
                        {disk ?
                          <Text style={{
                            marginBottom: 5,
                            textDecorationLine: "line-through",
                            textDecorationStyle: "double"
                          }}>{numberWithCommas(item.harga)}</Text> :
                          <Text style={{ marginBottom: 5 }}>{numberWithCommas(item.harga)}</Text>
                        }
                        {disk &&
                          <Text style={{ marginBottom: 5, marginLeft: 5 }}>{numberWithCommas(item.harga * (1 - disk / 100))}</Text>
                        }
                      </View>
                    </View>
                    <View style={{ borderWidth: 0.2, borderColor: colors.grey4, borderRadius: 10, padding: 5 }}>
                      <Image
                        source={{ uri: item.gambar }}
                        style={{ width: screen_scale.width * 0.26, height: 90, marginBottom: 10 }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ padding: 5, borderWidth: 0.2, borderRadius: 10 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Icon
                          type='material-community'
                          name="note-text"
                          size={16}
                        />
                        <Text style={{ marginLeft: 5 }}>Catatan</Text>
                      </View>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          handleMinus(item.harga, item.id)
                        }}
                      >
                        <Icon
                          type='material-community'
                          name='minus-circle-outline'
                          color={colors.buttons}
                          size={30}
                        />
                      </TouchableOpacity>
                      <Text style={{ marginHorizontal: 15 }}>
                        {tampilJumlah(item.id)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          handlePlus(item.harga, item.id)
                        }}
                      >
                        <Icon
                          type='material-community'
                          name='plus-circle-outline'
                          color={colors.buttons}
                          size={30}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              }
            </View>
          ))}

          <View style={{ padding: 10, borderWidth: 0.2, borderRadius: 10, borderColor: colors.grey4, marginBottom: 150 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 20 }}>Ringkasan Pembayaran</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
              <Text>Harga</Text>
              {disk ?
                <Text>{numberWithCommas(context.tampungTotal * (1 - disk / 100))}</Text> :
                <Text>{numberWithCommas(context.tampungTotal)}</Text>
              }
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
              <Text>Ongkir</Text>
              <Text>10.000</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
              <Text>Biaya Jasa Aplikasi</Text>
              <Text>3.000</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <Text style={{ fontWeight: "bold" }}>Total Pembayaran</Text>
              <Text style={{ fontWeight: "bold" }}>{numberWithCommas(diskon(context.tampungTotal) + 10000 + 3000)}</Text>
            </View>
          </View>
        </View>

      </ScrollView>
      <View style={styles.floatButton}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Icon
            type='material-community'
            name='wallet'
            size={20}
            color="#6FD6F8"
          />
          <View style={{ flex: 1 }}>
            <View style={{ marginLeft: 5, width: screen_scale.width * 0.28, flexDirection: "row", alignItems: "center", backgroundColor: colors.grey5, borderRadius: 10 }}>
              <View style={{ padding: 3, borderRadius: 10, backgroundColor: colors.buttons }}>
                <Text style={{ fontSize: 11, color: "white", fontWeight: "bold" }}>DanaKu</Text>
              </View>
              <View>
                <Text style={{ fontSize: 11, marginHorizontal: 5 }}>{numberWithCommas(diskon(context.tampungTotal) + 10000 + 3000)}</Text>
              </View>
            </View>
          </View>
          <View>
            <Icon
              type='material-community'
              name="dots-horizontal-circle"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            getLocation()
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center", height: screen_scale.width * 0.17 }}>
            <View style={styles.button}>
              {loading ?
                <ActivityIndicator size="small" color="white" />
                :
                <Text style={{ color: "white", fontWeight: "bold" }}>Pesan dan Antar Sekarang</Text>
              }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CheckOutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  floatButton: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    left: 0,
    right: 0,
    height: screen_scale.height * 0.18,
    borderTopWidth: 0.2,
    borderColor: colors.grey4
  },
  button: {
    backgroundColor: colors.buttons,
    width: screen_scale.width * 0.9,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  }
})