import { FlatList, View } from 'native-base';
import React, { useState, useRef, useCallback } from 'react';

import requester from "../../services/requester";

import Card from '../../components/Card';
import CommentsModal from '../../components/CommentsModal';
import LoadResourceLayout from "../../components/Layout/LoadResourceLayout";

import Comments from '../../components/Comments';
import WebCardInformation from '../../components/WebCardInformation';

const Places = ({ auth, user, type }) => {
  const [reviews, setReviews] = useState([]);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })

  const fetchData = async () => {
    const d = (await requester.get('/places/nearby/like', {
      params: { type },
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    })).data;
    setData(d);
    if (d.length > 0) {
      setReviews(d[0].reviews)
    }
  };

  const onViewableItemsChanged = useCallback((item) => {
    setReviews(item.changed[0].item.reviews)
  }, []);

  return (
    <LoadResourceLayout auth={auth} fetchData={fetchData} loading={loading} setLoading={setLoading}>
      <CommentsModal reviews={reviews} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      <View style={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewableItemsChanged}
          style={{ width: '30%', zIndex: 2, height: 700 }}
          renderItem={({ item }) => (
            <View style={{ width: 350, height: 450, marginBottom: 40 }}>
              <Card data={item} type="place" />
            </View>
          )}
        />
        <View style={{ width: '55%' }}>
          <WebCardInformation>
            <Comments reviews={reviews} textColor="black"/>
          </WebCardInformation>
        </View>
      </View>
    </LoadResourceLayout>
  )
}

export default Places;
