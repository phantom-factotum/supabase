import {
  View,
  StyleSheet,
  Image,
  TouchbleOpacity,
  useWindowDimensions,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Video, AVPlaybackStatus } from 'expo-av';
import {MaterialCommunityIcons} from '@expo/vector-icons'


export default function PostItem({ item, index }) {
  const { text, media } = item.post;
  const { type: mediaType, source } = media;
  const { width, height } = useWindowDimensions();
  const mediaStyle = [styles.media, { width, height: 'auto' }];
  return (
    <View style={[styles.itemContainer, { height: 200 }]}>
      {mediaType == 'video' && (
        <Video
          style={mediaStyle}
          source={{ uri: source }}
          resizeMode="contain"
          useNativeControls
        />
      )}
      {mediaType == 'image' && (
        <Image
          style={mediaStyle}
          source={{ uri: source }}
          resizeMode="contain"
        />
      )}
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.heartContainer}>
          <Text>{item.likes}</Text>
          <MaterialCommunityIcons name="heart" size={24}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    // height:POST_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 5,
  },
  media: {
    flex: 1,
    // height:POST_SIZE,
    // width:POST_SIZE
  },
  text: {
    textAlign: 'center',
  },
  textContainer:{
    flex:1
  },
  heartContainer:{
    flexDirection:'row',
    marginHorizontal:5,
    justifyContent:'center',
    alignItems:'center'
  },
  row:{
    flexDirection:'row',
    width:'100%',
    padding:5,
    justifyContent:'center',
    alignItems:'center'
  }
});
