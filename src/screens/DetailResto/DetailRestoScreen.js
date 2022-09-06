import {
  StyleSheet, Text, View, ScrollView, Dimensions, FlatList,
  ImageBackground,
  TouchableOpacity, Animated, useWindowDimensions, TouchableWithoutFeedback, ActivityIndicator, SafeAreaView,
} from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import { colors } from '../../global/styles'
import { Button, Icon, ListItem } from 'react-native-elements'
import { restaurantsData } from '../../global/Data'
import MenuRecommended from '../../components/MenuRecommended'
import MenuResto from '../../components/MenuResto'
import FloatingCheckOut from '../../components/FloatingCheckOut'

import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context'

import { AppContext } from '../../context/app-context'
import { useIsFocused } from '@react-navigation/native'


const DetailRestoScreen = ({navigation, route}) => {
  
  const { id } = route.params
  const insets = useSafeAreaInsets()
  const scrollY = useRef(new Animated.Value(0)).current

  const dimension = useWindowDimensions()

  const context = useContext(AppContext)

  const [loading, setLoading] = useState(true)

  const isFocused = useIsFocused()

  useEffect(() => {
    setLoading(true)
    if (isFocused && context.refresh) {
      context.setCheckOut(false)
      context.setCountItem(0)
      context.setRestoName("")
      context.setHarga(0)
      context.setTampungTotal(0)
      context.setSaveResto([])
    }
    setLoading(false)
  }, [isFocused])

  if (loading) {
    return (
      <ActivityIndicator size="large" style={{ flex: 1 }} />
    )
  }


  function renderHeader() {
    return (
      <View style={{
        borderBottomWidth: 0.2,
        borderColor: colors.grey4,
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 10
      }}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableWithoutFeedback
              onPress={() => {
                context.setCountItem(0)
                navigation.goBack()
              }}
            >
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Icon
                  type='material-community'
                  name="arrow-left"
                />
              </View>
            </TouchableWithoutFeedback>
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
      </View>
    )
  }

  return (

    <SafeAreaView style={styles.container}>
      {/* nama resto animasi */}
      <Animated.View
        style={{
          zIndex: 2,
          position: 'absolute',
          top: insets.top + 4,
          left: 50,
          right: 0,
          opacity: scrollY.interpolate({
            inputRange: [25, 50],
            outputRange: [0, 1],
          }),
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {restaurantsData[id].restaurantName.length > 22 ?
            restaurantsData[id].restaurantName.substring(0, 22) + "..." :
            restaurantsData[id].restaurantName
          }
        </Text>
      </Animated.View>
      {renderHeader()}
      <Animated.ScrollView
        onScroll={
          Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }
          ], {
            useNativeDriver: true
          })
        }
        showsVerticalScrollIndicator={false}>
        {/* Title and Descript */}
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>{restaurantsData[id].restaurantName}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{
              borderRadius: 10,
              backgroundColor: "#FD6C09",
              padding: 5, flexDirection: "row",
            }}>
              <Icon
                type="material-elements"
                name="thumb-up"
                size={14}
                color={colors.cardbackground}
              />
              <Text style={{ fontWeight: "bold", fontSize: 11, marginLeft: 5, color: colors.cardbackground }}>
                Super Partner
              </Text>
            </View>
            <Text style={{ marginLeft: 5, fontSize: 12 }}>{restaurantsData[1].foodType}</Text>
          </View>
        </View>
        {/* End Title and Descript */}

        {/* Horizontal Scroll Value */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 70, backgroundColor: "#F8F9F9" }}>
          <View style={{ flexDirection: "row", padding: 15 }}>
            {/* Scrool Horizontal */}
            {/* start */}
            <View style={styles.valResto}>
              <View style={styles.capTitle}>
                <Icon
                  type='material-community'
                  name='star'
                  color="#FF8C00"
                  size={17}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.fontVal}>{restaurantsData[id].averageReview}</Text>
              </View>
              <View>
                <Text style={{ ...styles.fontCapt, color: colors.buttons }}>Cek Ulasan</Text>
              </View>
            </View>
            {/* start */}
            <View style={styles.valResto}>
              <View style={styles.capTitle}>
                <Icon
                  type='material-community'
                  name='google-maps'
                  color="red"
                  size={17}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.fontVal}>{restaurantsData[id].farAway} km</Text>
              </View>
              <View>
                <Text style={styles.fontCapt}>Jarak</Text>
              </View>
            </View>
            {/* start */}
            <View style={styles.valResto}>
              <View style={styles.capTitle}>
                <Icon
                  type='material-community'
                  name='thumb-up'
                  size={17}
                  color="red"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.fontVal}>{restaurantsData[id].numberOfReview}++ Rating</Text>
              </View>
              <View>
                <Text style={styles.fontCapt}>Rasa Enak</Text>
              </View>
            </View>
            {/* start */}
            <View style={styles.valResto}>
              <View style={styles.capTitle}>
                <Icon
                  type='material-community'
                  name='food-drumstick'
                  size={17}
                  color="red"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.fontVal}>{restaurantsData[id].numberOfReview}++ Rating</Text>
              </View>
              <View>
                <Text style={styles.fontCapt}>Porsi pas</Text>
              </View>
            </View>
            {/* start */}
            <View style={styles.valResto}>
              <View style={styles.capTitle}>
                <Icon
                  type='material-community'
                  name='bowl-mix'
                  size={17}
                  color="red"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.fontVal}>{restaurantsData[id].numberOfReview}++ Rating</Text>
              </View>
              <View>
                <Text style={styles.fontCapt}>Bersih</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* End Scroll Horizontal */}
        {/* start card */}
        <View style={{
          marginHorizontal: 20,
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
              <Text style={{ fontSize: 11 }}>Diantar dalam {restaurantsData[id].collectTime} menit</Text>
            </View>
            <View style={{ padding: 10, borderWidth: 1, borderRadius: 20, borderColor: colors.buttons }}>
              <Text style={{ color: colors.buttons, fontWeight: "bold", fontSize: 12 }}>Ganti</Text>
            </View>
          </View>
        </View>
        {/* end card */}

        <View style={{
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold"
          }}>
            Recommended
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 15 }}>
          {restaurantsData[id].productData.map((menu, index) => (
            menu.recom &&
            <MenuRecommended key={index} id={menu.id} restonama={restaurantsData[id].restaurantName} desk={menu.desk} pict={menu.image} price={menu.price} nama={menu.name} disc={restaurantsData[id].discount} />
          ))}
        </ScrollView>

        <View style={{
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold"
          }}>
            Menu
          </Text>
        </View>


        <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: context.checkOut ? 80 : 20 }}>
          {restaurantsData[id].productData.map((item, index) => (
            <MenuResto key={index} id={item.id} restonama={restaurantsData[id].restaurantName} name={item.name} desk={item.desk} image={item.image} price={item.price} disc={restaurantsData[id].discount} />
          ))}
        </View>

      </Animated.ScrollView>
      {context.checkOut &&
        <FloatingCheckOut
          countItem={context.countItem}
          tampungTotal={context.tampungTotal}
          restoName={context.restoName}
          harga={context.harga}
          disc={restaurantsData[id].discount}
          time={restaurantsData[id].collectTime}
          restoLoc={restaurantsData[id].coordinate}
        />
      }
    </SafeAreaView>

  )
}

export default DetailRestoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardbackground,
  },
  valResto: {
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: colors.grey5,
    paddingHorizontal: 20
  },
  capTitle: {
    flexDirection: "row",
    marginBottom: 5
  },
  fontVal: {
    fontSize: 14,
    fontWeight: "bold"
  },
  fontCapt: {
    fontSize: 12,
    fontWeight: "bold"
  },

})