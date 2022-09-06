import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, EdgeInsetsPropType, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { colors } from '../global/styles';
import { Icon } from 'react-native-elements';
import DetailRestoModal from '../screens/DetailRestoModal';

import { AppContext } from '../context/app-context';

const MenuResto = ({ id, restonama, name, desk, price, image, disc }) => {

  const width = Dimensions.get("window").width
  const height = Dimensions.get("window").height
  const [love, setLove] = useState(false)
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // const editArray = (i) => {
  //   const arr = [...love]
  //   if (love[i]) {
  //     arr[i] = false
  //   }
  //   else {
  //     arr[i] = true
  //   }
  //   setLove(arr)
  // }

  const [addItem, setAddItem] = useState(0)

  const context = useContext(AppContext)

  
  const add = (min) => {
    if (min == "add") {
      setAddItem(addItem + 1)
    }
    else {
      setAddItem(addItem - 1)
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

  const ambilJumlah = (i)=>{
    const idx = context.saveResto.findIndex((prev)=>prev.id === i)
    return context.saveResto[idx].jumlah
  }


  const [showDetailModal, setShowDetailModal] = useState(false)

  return (
    <>
      <View style={styles.cardContainer}>
        <TouchableWithoutFeedback
          onPress={() =>
            setShowDetailModal(true)
          }
        >
          <View style={styles.cardList}>
            <View style={{ width:width*0.65 }}>
              <Text style={styles.textName}>{name}</Text>
              <Text style={styles.description}>{desk}</Text>
              {disc ?
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.priceDisc}>{numberWithCommas(price)}</Text>
                  <Text style={styles.price}>{numberWithCommas(price * (1 - (disc / 100)))}</Text>
                </View>
                :
                <Text style={styles.price}>{numberWithCommas(price)}</Text>
              }
            </View>
            <Image
              source={{ uri: image }}
              style={{ width: 80, height: 80 }}
              borderRadius={20}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.loveCard}>
          <TouchableOpacity onPress={() => {
            setLove(ubah => !ubah)
          }}>
            <Icon
              type='material-community'
              name='heart'
              color={love ? "red" : colors.grey4}
            />
          </TouchableOpacity>
          {!context.saveResto.find((item) => item.id === id) ?
            <TouchableOpacity
              onPress={() => {
                context.setCheckOut(true)
                add("add")
                if (!context.saveResto.find((item) => item.id == id)) {

                  context.setSaveResto([...context.saveResto, { id: id, namaResto: name, jumlah: 1, gambar: image, harga: price }])
                  
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
              }}
            >
              <View style={styles.addButton}>
                <Text style={{ color: colors.buttons, fontWeight: "bold" }}>Tambah</Text>
              </View>
            </TouchableOpacity> :
            <View style={{ backgroundColor:"white",flexDirection: "row", justifyContent: "space-between", width: width * 0.5 }}>
              <View style={{
                borderWidth: 0.6, borderColor: colors.grey4,
                borderRadius: 10,
                padding: 3,
                marginTop: 10,
                width: width * 0.22, flexDirection: "row"
              }}>
                <Icon
                  type='material-community'
                  name="note-text"
                  size={16}
                />
                <Text style={{ marginLeft: 5 }}>Catatan</Text>
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

                   
                    
                    if ( ambilJumlah(id) === 0){
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

                  <Text>
                    {
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
      </View>
      {showDetailModal &&
        <DetailRestoModal
          isVisible={showDetailModal}
          isClose={() => setShowDetailModal(false)}
          image={image}
          judul={name}
          deskripsi={desk}
          harga={price}
          disc={disc}
        />
      }
    </>
  )
}

export default MenuResto

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20
  },
  cardContainer: {
    borderBottomWidth: 1,
    borderColor: colors.grey5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  cardList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  textName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  description: {
    marginBottom: 5
  },
  priceDisc: {
    fontWeight: "bold",
    textDecorationLine: "line-through",
    textDecorationStyle: "double",
    marginRight: 5
  },
  price: {
    fontWeight: "bold"
  },
  addButton: {
    alignItems: "center", padding: 3,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    borderColor: colors.buttons,
    width: 75
  },
  loveCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }

})