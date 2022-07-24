import Modal from 'react-native-modal';
import { useWindowDimensions } from "react-native";
import { ScrollView, Text, View } from 'native-base';
import React, { useCallback, useState } from "react";

import requester from "../../services/requester";

import { isMobile } from "../../components/Device";
import CardSwiper from '../../components/CardSwiper';
import LoadResourceLayout from "../../components/Layout/LoadResourceLayout";

import CommentIcon from '../../../assets/icon/comment.png';
import Card from '../../components/Card';

const Places = ({ auth, user, type }) => {
  const [reviews, setReviews] = useState([]);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const { height, width } = useWindowDimensions();

  const fetchData = async () => {
    const d = (await requester.get('/places/nearby/like', {
      params: { type },
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    })).data;
    console.log('ICICICICICICI');
    console.log(d);
    setData(d);
    if (d.length > 0) {
      setReviews(d[0].reviews)
    }
  };

  return (
    <LoadResourceLayout auth={auth} fetchData={fetchData} loading={loading} setLoading={setLoading}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        style={{ height: 500, width: '100%', marginTop: 40 }}
      >
        {
          data?.map((d) => (
            <View style={{ width: 350, height: 450, marginBottom: 40 }}>
              <Card data={d} type="place" />
            </View>
          ))
        }
      </ScrollView>
    </LoadResourceLayout>
  )
}

export default Places;
