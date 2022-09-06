import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet, Text, View,
  FlatList, TouchableWithoutFeedback,
  Dimensions, ImageBackground, ScrollView, Image, SafeAreaView, TouchableOpacity
} from 'react-native'
import React, { useContext, useEffect } from 'react'
import SearchComponent from '../components/SearchComponent'
import { colors } from '../global/styles'

import { filterData2, restaurantsData } from '../global/Data'

import { AppContext } from '../context/app-context'


const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchScreen = ({ navigation }) => {

  const context = useContext(AppContext)

  return (
    <SafeAreaView style={{...styles.container, backgroundColor: context.darkTheme ? "black" : "white"}}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color :  context.darkTheme ? "white" : "black", }}>Pencarian</Text>
      </View>
      <SearchComponent />
      <ScrollView showsVerticalScrollIndicator={false}>
        {context.tampungCari.length > 0 &&
          <View style={{paddingHorizontal:20, marginBottom:20}}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
              <Text style={{fontWeight:"bold", fontSize:16, marginBottom:10, color :  context.darkTheme ? "white" : "black",}}>
                Baru kamu Cari
              </Text>
              <TouchableWithoutFeedback 
                onPress={()=>{
                  context.setTampungCari([])
                }}
              >
              <Text style={{color:colors.buttons}}>clear all</Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={{ flexWrap: "wrap", flexDirection: "row", borderBottomWidth:0.2, borderColor:colors.grey4 ,paddingBottom:10}}>
              {context.tampungCari.map((item,idx)=>(
                <TouchableWithoutFeedback
                  key={idx}
                  onPress={() => {
                    //setIdx2(item.id)
                    
                  }}

                >
                  <View style={{
                    ...styles.tagsButton, flexDirection: "row",
                    backgroundColor: "white", borderColor:colors.buttons, borderWidth:0.5
                  }}>
                    <TouchableOpacity
                      onPress={()=>{
                        
                      }}
                    >
                    <Text style={{ color: colors.buttons, fontWeight: "bold" }}>{item.nama}</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
        }
        <Text style={{...styles.listHeader, color :  context.darkTheme ? "white" : "black", marginLeft:20}}>Paling Sering Dicari</Text>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 20 }} >
            {restaurantsData.map((item, indx) => (
              <TouchableWithoutFeedback key={indx}
                onPress={() => {
                  context.setRefresh(true)
                  navigation.navigate("DetailRestoScreen", { id: item.id })
                }}
              >
                <View style={{ backgroundColor:"white" ,borderWidth: 0.2, borderColor: colors.grey4, marginRight: 10, height: 240, width: Dimensions.get("window").width * 0.53, borderRadius: 20 }}>
                  <Image
                    source={{ uri: item.images }}
                    style={{ width: Dimensions.get("window").width * 0.53, height: 150, marginBottom: 5 }}
                    borderRadius={20}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ marginBottom: 20 }}>{item.farAway} km . {item.deliveryTime} mins </Text>
                    <Text style={{ fontWeight: "bold" }}>{item.restaurantName}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
        <View style={{ paddingHorizontal: 20, paddingTop: 20, marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color :  context.darkTheme ? "white" : "black", }}>Top Kategori</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}
        >
          {filterData2.map((item, idx) => (
            <TouchableWithoutFeedback 
              key={idx}
              onPress={()=>{
                navigation.navigate("FilterResultScreen",{gambar: item.image, nama : item.name})
              }}
            >
            <View style={styles.imageView}>
              <ImageBackground
                style={styles.image}
                source={{ uri: item.image }}
                borderRadius={20}
              >

                <View style={styles.textView}>
                  <Text style={{ color: colors.cardbackground, fontWeight: "bold" }}>{item.name}</Text>
                </View>
              </ImageBackground>
            </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },
  imageView: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.265,
    height: SCREEN_WIDTH * 0.265,
    marginLeft: 20,
    marginBottom: SCREEN_WIDTH * 0.04
  },

  image: {
    height: SCREEN_WIDTH * 0.265,
    width: SCREEN_WIDTH * 0.265,
    borderRadius: 20,
  },

  listHeader: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
    marginLeft: 12

  },

  textView: {
    height: SCREEN_WIDTH * 0.265,
    width: SCREEN_WIDTH * 0.265,
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
    backgroundColor: 'rgba(52, 52, 52,0.3)',
    borderRadius: 20
  },
  tagsButton: {
    borderWidth: 0.4,
    paddingHorizontal: 10,
    paddingVertical:5,
    marginRight: 20,
    borderRadius: 10,
    borderColor: colors.grey4,
    alignItems: "center",
    marginBottom: 10
  },
})