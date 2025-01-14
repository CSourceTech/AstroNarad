import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Images from '../../assets/Images';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const AstrologerDesc = () => {
  const navigation = useNavigation();
  const [inputType, setInputType] = useState("Review");
  const route = useRoute();
  const {astrologerName, info, exp, expert, lang, Rating, Id, cost , on_Chat, on_Call} = route.params;

  const navigate_to_back = () => {
    navigation.navigate('Message');
  };

  const navigate_to_Chat = () => {
    navigation.navigate('ChatScreen',  { id: Id })
  }

  const reviews = [
    {
      id: 1,
      title: 'Good value',
      rating: 5,
      comment: 'Great Experience.',
    },
    {
      id: 2,
      title: 'Good value',
      rating: 4,
      comment: 'Quick remedies for different problems in life!',
    },
    {
      id: 3,
      title: 'Could be better',
      rating: 3,
      comment: 'The product is good but color is slightly different.',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={Images.Background} style={styles.backgroundImage} /> */}
        <TouchableOpacity onPress={navigate_to_back} style={styles.backButton}>
          <Image source={Images.arrowLeft} style={styles.headerIcon} />
        </TouchableOpacity>
        <Image source={Images.AstroBackgrnd} style={styles.background} />
        <TouchableOpacity style={styles.shareButton}>
          <Image source={Images.share} style={styles.shareIcon} />
        </TouchableOpacity>
        <View style={styles.rowContainer}>
          <Image source={Images.Astrologer} style={styles.AstrologerImg} />
        </View>
      </View>

      <ScrollView>
        <View style={styles.AstrologerContainer}>
          <Text style={styles.AstrologerTitle}>{astrologerName}</Text>
        </View>
        <View style={styles.Desc}>
          <Text style={styles.AstroDesc}>
          {astrologerName} {info}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.itemContainer}>
            <Image source={Images.Exp} style={styles.image} />
            <Text style={styles.text}>{exp} Year exp.</Text>
          </View>
          <View style={styles.itemContainer}>
            <Image source={Images.Exp} style={styles.image} />
            <Text style={styles.text}>{expert}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.itemContainer}>
            <Image source={Images.Language} style={styles.image} />
            <Text style={styles.text}>{lang}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Image source={Images.Star} style={styles.image} />
            <Text style={styles.text}>{Rating}</Text>
          </View>
        </View>
        <View style={styles.TotalTimeContainer}>
          <Text style={styles.TotalTimeTitle}>Total Time</Text>
        </View>
        <View style={styles.TotalTimerow}>
          <View style={styles.itemContainer}>
            <Image source={Images.Message} style={styles.image} />
            <Text style={styles.text}>{on_Chat}K Mins</Text>
          </View>
          <View style={styles.itemContainer}>
            <Image source={Images.Phone} style={styles.image} />
            <Text style={styles.text}>{on_Call}K Mins</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              inputType === 'Review' && styles.selectedOption,
            ]}
            onPress={() => setInputType('Review')}>
            <Text style={styles.buttonText}>Review</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              inputType === 'Rating' && styles.selectedOption,
            ]}
            onPress={() => setInputType('Rating')}>
            <Text style={styles.buttonText}>Rating</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Column}>
          <Text style={styles.ReviewTitle}>Top Reviews</Text>
          <Text style={styles.reviews}>2 Reviews</Text>
        </View>
        <View style={styles.ReviewContainer}>
                <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.reviewContainer}>
                            <Text style={styles.reviewTitle}>{item.title}</Text>
                            <Text style={styles.reviewComment}>{item.comment}</Text>
                        </View>
                    )}
                />
            </View>
      </ScrollView>
      <View style={styles.bottomSheet}>
        <View>
            <Text style={styles.costMin}>₹{cost}/Min</Text>
            <Text style={styles.MinCost}>₹25/Min</Text>
        </View>
        <TouchableOpacity style={styles.ChatButton} onPress={navigate_to_Chat}>
        <View style={styles.BottomSheetrow}>
            <Image source={Images.Message} style={styles.Bottomimage} />
            <Text style={styles.bottomButtonText}>Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.CallButton}>
        <View style={styles.BottomSheetrow}>
        <Image source={Images.Phone} style={styles.Bottomimage} />
          <Text style={styles.bottomButtonText}>Call</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F5',
  },
  header: {
    // paddingTop: height * 0.02,
    // paddingBottom: height * 0.02,
    backgroundColor: '#f1c232',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: height * 0.47,
    opacity: 0.5,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.05,
    zIndex: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  background: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'black',
    marginVertical: height * 0.02,
  },

  AstrologerImg: {
    // width: width * 0.99,
    // height: width * 0.72,
    width: 250,
    height: 350,
    resizeMode: 'contain',
    alignSelf: 'center',
    bottom: 120,
    // bottom: '5%',
    // marginTop: height * 0.02,
  },
  shareButton: {
    position: 'absolute',
    top: height * 0.03,
    right: width * 0.05,
  },
  shareIcon: {
    width: 24,
    height: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.09,
    position: 'absolute',
  },
  AstrologerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.02,
  },
  AstrologerTitle: {
    fontSize: 35,
    fontWeight: '700',
    color: 'grey',
    // flex: 1,
    bottom: 16
  },
  Desc: {
    paddingHorizontal: width * 0.03,
    bottom: 20
  },
  AstroDesc: {
    color: 'grey',
    fontWeight: '700',
    fontSize: 17,
  },
  row: {
    flexDirection: 'row',
    gap: 70,
    width: width * 0.9,
    marginVertical: 5,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    top: '3%',
  },
  TotalTimerow: {
    flexDirection: 'row',
    gap: 70,
    width: width * 0.9,
    // marginVertical: 5,
    // paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    bottom: 20
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1B1B',
    left: '50%',
  },
  TotalTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.02,
    bottom: 20
  },
  TotalTimeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0D0D0D',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    bottom: 20,
  },
  optionButton: {
    width: width * 0.4,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#dcdcdc',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#07162C',
  },
  Column: {
    flexDirection: 'column',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    bottom: 20
  },
  ReviewTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'grey',
    flex: 1,
  },
  reviews: {
    fontSize: 13,
    fontWeight: '700',
    color: 'grey',
    paddingHorizontal: width * 0.01,
  },
  ReviewContainer: {
    paddingHorizontal: width * 0.03,
    marginVertical: height * 0.010,
    bottom: 12,
},
reviewContainer: {
    // backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
},
reviewTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: '#171621'
},
reviewRating: {
    color: "#f1c232",
    marginVertical: 5,
},
reviewComment: {
    fontSize: 14,
    color: "#555",
},
bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  costMin: {
    color: '#738385'
  },
  MinCost: {
    fontSize: 18,
    fontWeight: '800',
    color: '#656565'
  },
  CallButton: {
    width: width * 0.3,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#C0CCC7',
    alignItems: 'center',
  },
  ChatButton:{
    width: width * 0.3,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#656565',
    alignItems: 'center',
    left: 15,
  },
  BottomSheetrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  Bottomimage: {
    width: 24,
    height: 24,
    marginRight: 5,
    resizeMode: 'contain',
    tintColor: 'white'
  },
});

export default AstrologerDesc;
