import {
  StyleSheet, Text, View, FlatList,
  TouchableWithoutFeedback, ImageBackground, Dimensions, TouchableOpacity
} from 'react-native'
import React, { useState, useRef, useContext, useEffect } from 'react'
import { Icon } from 'react-native-elements'
import { colors } from '../global/styles'

import DetailRestoModal from '../screens/DetailRestoModal'
import { AppContext } from '../context/app-context'


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const MenuRecommended = ({ id, restonama, desk, pict, price, nama, disc }) => {

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  
  const [addItem, setAddItem] = useState(0)

  const add = (min) => {
    if (min == "add") {
      setAddItem(addItem + 1)
    }
    else {
      setAddItem(addItem - 1)
    }
  }

  const [showDetailModal, setShowDetailModal] = useState(false)

  const context = useContext(AppContext)

  const updateSaveResto = (index, jumlah) => {
    const updated = [...context.saveResto];
    updated.map((it, idx) => {
      if (it.id === index) {
        updated[idx].jumlah = jumlah
      }
    })
  }

  const removeItem = (i) => {
    const index = context.saveResto.findIndex(prod => prod.id === i);
    const baru = [...context.saveResto]
    baru.splice(index, 1)
    context.setSaveResto(baru)
  }

  const ambilJumlah = (i)=>{
    const idx = context.saveResto.findIndex((prev)=>prev.id === i)
    return context.saveResto[idx].jumlah
  }




  return (
    <View style={{marginRight:5}}>
      <TouchableWithoutFeedback
        onPress={() =>
          setShowDetailModal(true)
        }
      >
        <View style={styles.card}>
          <ImageBackground
            source={{ uri: pict }}
            resizeMode="contain"
            borderRadius={10}
            style={styles.cardImage}
          >
            {disc ?
              <View style={{ alignItems: "flex-start" }}>
                <View style={{
                  borderRadius: 10,
                  backgroundColor: "red",
                  padding: 5, marginTop: 5,
                  width: "35%", alignItems: "center",

                }}>
                  <Text style={{ fontWeight: "bold", fontSize: 11, color: colors.cardbackground }}>
                    Promo
                  </Text>
                </View>
              </View>
              : null
            }
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>

      <View style={{ margin: 10, width: width * 0.409 }}>
        <View style={{ height: width * 0.2 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{nama}</Text>
          {disc ?
            <View style={{ flexDirection: "row" }}>
              <Text style={{ textDecorationLine: "line-through", textDecorationStyle: "double", fontWeight: "bold", marginTop: 5, fontSize: 12 }}>
                {numberWithCommas(price)}
              </Text>
              <Text style={{ marginLeft: 5, fontWeight: "bold", marginTop: 5, fontSize: 12 }}>
                {numberWithCommas(price * (1 - (disc / 100)))}
              </Text>
            </View> :
            <Text style={{ fontWeight: "bold", marginTop: 5, fontSize: 12 }}>
              {numberWithCommas(price)}
            </Text>
          }
        </View>
        {!context.saveResto.find((item) => item.id === id) ?
          <TouchableOpacity onPress={() => {
            context.setCheckOut(true)
            add("add")
            if (!context.saveResto.find((item) => item.id == id)) {

              context.setSaveResto([...context.saveResto, { id: id, namaResto: nama, jumlah: 1, gambar: pict, harga: price }])
            }
            else {
              updateSaveResto(id, ambilJumlah(id) + 1)
            }
            context.setCountItem(context.countItem + 1)
            context.setRestoName(restonama)
            context.setTampungTotal(context.tampungTotal + price)
            disc ?
              context.setHarga(context.harga + price * (1 - disc / 100)) :
              context.setHarga(context.harga + price)
          }}>
            <View style={{
              alignItems: "center", padding: 3,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 10,
              borderColor: colors.buttons
            }}>
              <Text style={{ color: colors.buttons, fontWeight: "bold" }}>Tambah</Text>
            </View>
          </TouchableOpacity> :
          <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "white" }}>
            <View style={{
              borderWidth: 0.6, borderColor: colors.grey4,
              borderRadius: 10,
              padding: 3,
              marginTop: 10,
              width: width * 0.11
            }}>
              <Icon
                type='material-community'
                name="note-text"
                size={16}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  add("minus")
                  context.setCountItem(context.countItem - 1)
                  context.setTampungTotal(context.tampungTotal - price)
                  updateSaveResto(id, ambilJumlah(id) - 1)
                  disc ?
                    context.setHarga(context.harga - price * (1 - disc / 100)) :
                    context.setHarga(context.harga - price)
                  if (context.countItem === 1) {
                    context.setCheckOut(false)
                  }
                  
                  if (ambilJumlah(id)=== 0){
                    removeItem(id)
                  }
                }}
              >
                <Icon
                  type='material-community'
                  name='minus-circle-outline'
                  size={26}
                  color={colors.buttons}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ paddingVertical: 4 }}>
                <Text>{
                      context.saveResto.map((item) => {
                        if (item.id === id) {
                          return (item.jumlah)
                        }
                      })}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  add("add")
                  context.setCountItem(context.countItem + 1)
                  context.setTampungTotal(context.tampungTotal + price)
                  updateSaveResto(id, ambilJumlah(id) + 1)
                  disc ?
                    context.setHarga(context.harga + price * (1 - disc / 100)) :
                    context.setHarga(context.harga + price)
                }}
              >
                <Icon
                  type='material-community'
                  name='plus-circle-outline'
                  size={26}
                  color={colors.buttons}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
      {showDetailModal &&
        <DetailRestoModal
          isVisible={showDetailModal}
          isClose={() => setShowDetailModal(false)}
          image={pict}
          judul={nama}
          deskripsi={desk}
          harga={price}
          disc={disc}
        />
      }

    </View>
  )
}

export default MenuRecommended

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowRadius: 1,
    shadowOpacity: 0.2,
    shadowOffset: { x: 2, y: -2 },
    marginTop: 10,
    height: 160,
    width: Dimensions.get("window").width * 0.41,
  },
  cardImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 10,
  }
})