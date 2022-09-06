import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../global/styles'
import { Button, Icon } from 'react-native-elements'
import { restaurantsData } from '../global/Data'
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from '../components/StarRating'

const MyOrdersScreen = () => {

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "white", borderColor: colors.grey5, borderBottomWidth: 1 }}>
        <View style={styles.title}>
          <Text style={styles.titleText}>My Orders</Text>
        </View>
      </View>
      <ScrollView>
      {restaurantsData.map((item, index) => (
        <View key={index}>
          <View style={{ borderBottomWidth: 1, borderColor: colors.grey5, }}>
            <View style={{ ...styles.content, justifyContent: "space-between" }}>
              <Image
                style={{ height: 85, width: 120, borderRadius: 10 }}
                source={{ uri: item.images }}
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ marginHorizontal: 10, marginBottom: 5, fontSize: 16, fontWeight: "bold" }}>{item.restaurantName}</Text>
                  <Icon
                    type='material-community'
                    name='heart-circle'
                    size={17}
                    color="red"
                    style={{ marginHorizontal: 20 }}
                  />
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ marginHorizontal: 10, color: colors.grey2 }}>30 Maret 2022</Text>
                  <Text style={{ color: "green", fontWeight: "bold" }}>. Selesai</Text>
                </View>
                <Text style={{ marginHorizontal: 10 }}> 2 Big Mac </Text>
              </View>
            </View>
            <View style={styles.rating}>
              <Icon
                type='material-community'
                name='star'
                size={17}
                color="#FF8C00"
              />
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>{item.averageReview}</Text>
            </View>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: colors.grey5 }}>
            <View style={{ padding: 20 }}>
              <Text>Rp. {numberWithCommas(item.harga)}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text>1 menu</Text>
                <Button
                  title="Pesan Lagi"
                  buttonStyle={styles.createButton}
                  titleStyle={styles.createButtonTitle}
                  onPress={() => { }}
                />
              </View>
              <View style={{
                borderWidth: 1,
                borderColor: colors.grey5,
                borderRadius: 10,
                padding: 15,
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "space-between"
              }}>
                {item.rate ?
                    <Text>Kamu nge-rating</Text> :
                    <Text>Kasih rating yuk</Text>
                }
                {item.rate ?
                    <StarRating ratings={item.averageReview} reviews={null} /> :
                    <StarRating ratings={null} reviews={null} />
                }
              </View>
            </View>
          </View>
        </View>
      ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyOrdersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey5,
    backgroundColor: "white",
    width: 60,
    marginLeft: 48,
    marginTop: -20,
    marginBottom: 10,
  },
  title: {
    marginHorizontal: 30,
    height: 50,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 15,
    height: 95,
    flex: 1
  },
  createButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 12,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 30
  },

  createButtonTitle: {
    color: "black",
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginTop: -3
  }
})