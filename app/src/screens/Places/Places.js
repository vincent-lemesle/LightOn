import Modal from 'react-native-modal';
import { useWindowDimensions } from "react-native";
import { ScrollView, Text, View } from 'native-base';
import React, { useCallback, useState } from "react";

import requester from "../../services/requester";

import { isMobile } from "../../components/Device";
import CardSwiper from '../../components/CardSwiper';
import LoadResourceLayout from "../../components/Layout/LoadResourceLayout";

import CommentIcon from '../../../assets/icon/comment.png';

const Places = ({ auth, user, type }) => {
  const [reviews, setReviews] = useState([]);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const { height, width } = useWindowDimensions();

  const fetchData = async () => {
    const d = (await requester.get('/places/nearby', {
      params: { type },
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    })).data;
    setData(d);
    setReviews(d.results[0].reviews)
  };

  const fetchNextPage = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedData = (await requester.get('/places/nearby', {
        params: { pageToken: data.next_page_token, type },
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })).data;
      setData(fetchedData);
      setReviews(fetchedData.results[0].reviews)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [data]);

  const ModalContainer = () => (
      <Modal
        backdropOpacity={0.4}
        isVisible={isModalOpen}
        animationPreset="slide"
        animationIn="slideInRight"
        animationOut="slideOutLeft"
        style={{ margin: 0, marginTop: -40 }}
        onClose={() => setModalOpen(false)}
        onBackdropPress={() => setModalOpen(false)}
      >
        <ScrollView style={{
          flex: 1,
          padding: 5,
          paddingTop: 60,
          backgroundColor: 'gray',
          marginTop: isMobile ? 30 : 0,
          width: isMobile ? width * 0.7 : width * 0.3,
          marginLeft: isMobile ? width * 0.3 : width * 0.7,
        }}>
          {
            reviews?.map((r) => (
              <View style={{ borderWidth: 2, marginBottom: 20 }}>
                <Text underline fontSize="md">
                  {r.author_name}
                </Text>
                <Text>
                  {r.text}
                </Text>
              </View>
            ))
          }
        </ScrollView>
      </Modal>
  )

  return (
    <LoadResourceLayout auth={auth} fetchData={fetchData} loading={loading} setLoading={setLoading}>
      <ModalContainer />
      <CardSwiper
        user={user}
        subType={type}
        data={data?.results.slice(10)}
        onSwipedAll={fetchNextPage}
        type="place"
        setExtraData={(d) => setReviews(d.reviews)}
        buttons={[{
          icon: CommentIcon,
          onPress: () => setModalOpen(true),
        }]}
      />
    </LoadResourceLayout>
  )
}

export default Places;
