import React,{Component, useEffect,useState} from 'react'
import { ActivityIndicator,AsyncStorage, StatusBar } from 'react-native'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import AuthStack from './authNavigation'
import FrontStack from './frontNavigation'

import { colors } from '../global/styles'

import { AppContext } from '../context/app-context'


export default class RootNavigator extends Component {
  static contextType = AppContext
  constructor (props){
    super(props);
    this.state= {
      cek : '',
      loading:true,
    }
  }
  check = async() => {
    try {
      const   val = await AsyncStorage.getItem('isLoggedIn')
      this.setState({cek:val, loading:false})
    } catch (errorr){
      this.setState({loading:true})
      console.log(errorr.message)
    }
    
  }

  componentDidMount(){
    this.check()
  }

  

  render (){
    if (this.state.loading) return <ActivityIndicator />
    return (
      <NavigationContainer theme={this.context.darkTheme ? DarkTheme : DefaultTheme}>
        <StatusBar
          barStyle = {this.context.darkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.cardbackground}
          //hidden={true}
      />
          {this.state.cek? <AuthStack /> : <FrontStack/>}
      </NavigationContainer>
    )
  }
}

