import { View, Text, StyleSheet, Button, ActivityIndicator,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Headline, TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'

const Home = () => {
    const[city,setCity] = useState("")
    const[loading,setLoading] = useState(false)
    const[datas,setData] = useState("")
    const[days,setDays] = useState([])
    const[condition,setCondition]=useState("")
    const[temp,setTemp]=useState("")
    const[error,setError] = useState(false)

    const Find = async()=>{
        if(city === ""){
            return alert("enter city name")
        }
        try{
            setLoading(true)
            await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=LY47JAWFHZMKAE5735FNTTWDH&contentType=json`)
            .then((res)=>{
                setData(res.data)
                setDays(res.data.days)
                // setData("")
                setLoading(false)
                setCondition(res.data.currentConditions.conditions)
                setTemp(res.data.currentConditions.temp)
            })
            
        }catch{
            setError(true)
        }
    }
    return (
        <ScrollView style={style.main} >
            <View style={style.sub}>
                <Headline style={{ display: "flex", textAlign: "center" }}>Check Current Temperature..</Headline>
                <View style={style.preSub}>
                    <TextInput
                        placeholder='Enter by City Name..'
                        value={city}
                        onChangeText={(text)=>setCity(text)}
                        style={style.input}
                    />
                    <TouchableOpacity>
                        <View   style={style.buttons}>

                            <Text onPress={Find} >Search</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>
                {
                    error?
                    <>
                    <View style={{justifyContent:"center",display:"flex",alignItems:"center"}}><Text
                        style={{fontSize:30,justifyContent:"center"}}
                    >Oops!! Data not found</Text></View>
                    </> : <>
                    {
                    !loading ?
                    <>
                    <View style={style.datas}>
                   <Text style={style.data}>Location: <Text style={{color:"red", textTransform:"capitalize"}}>{datas.address}</Text> </Text>
                </View>
                <View style={style.datas}>
                   <Text style={style.data}>Description: <Text style={{color:"red", textTransform:"capitalize"}}>{datas.description}</Text> </Text>
                </View>
                <View style={style.datas}>
                   <Text style={style.data}>Condition: <Text style={{color:"red", textTransform:"capitalize"}}>{condition}</Text> </Text>
                </View>
                <View style={style.datas}>
                   <Text style={style.data}>Temperature: <Text style={{color:"red", textTransform:"capitalize"}}>{temp}°F</Text> </Text>
                </View>

                <View style={style.assum} >
                    {
                        days.map((val,id)=> <View key={id} style={style.preduction}>
                        <Text  style={{fontSize:40,color:"red", textTransform:"capitalize"}}>{val.temp}°F</Text>
                        <Text >{val.datetime}</Text>
                    </View>)
                    }
                    
                   
                </View>
                    </>: <>
                    <ActivityIndicator/>
                    </>
                }
                    </>
                }
        </ScrollView>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#A6D0DD",
    },
    sub: {
        marginTop: 40,
    },
    preSub: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        margin: 15,
        borderRadius: 15,
        padding: 15,
        textAlign: "center",
        alignItems: "center"
    },
    input: {
        backgroundColor: "white",
    },
    buttons: {
        backgroundColor: "#A6D0DD",
        flex: 1,
        width: 100,
        textAlign: "center",
        justifyContent: "center",
        borderRadius: 25,
        alignItems: "center"
    },
    datas:{
        marginLeft:15, 
        padding:20,
        margin:15,
        borderRadius:20,
        backgroundColor:"white",
        shadowOpacity:30,
        elevation:30,
    },
    preduction:{
        backgroundColor:"white",
        padding:15,
        margin:10,
        borderRadius:15,
        textAlign:"center",
        display:"flex",
        alignItems:"center",
        gap:2
    },
    assum:{
        display:"flex",
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
    }
})

export default Home