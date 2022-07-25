import { View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';

import requester from "../../services/requester";

import Comments from '../../components/Comments';
import CardSwiper from '../../components/CardSwiper';
import CommentsModal from '../../components/CommentsModal';
import WebCardInformation from '../../components/WebCardInformation';
import LoadResourceLayout from "../../components/Layout/LoadResourceLayout";
import { BrowserView, isBrowser, MobileView } from '../../components/Device';

import CommentIcon from '../../../assets/icon/comment.png';

const Places = ({ auth, user, type }) => {
  const [reviews, setReviews] = useState([]);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);


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

  useEffect(() => {}, [reviews]);

  return (
    <LoadResourceLayout auth={auth} fetchData={fetchData} loading={loading} setLoading={setLoading}>
      {/* BROWSER */}
      <BrowserView style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ width: '30%', zIndex: 2 }}>
          <CardSwiper
            user={user}
            type="place"
            subType={type}
            data={data?.results}
            onSwipedAll={fetchNextPage}
            setExtraData={(d) => setReviews(d.reviews || [])}
          />
        </View>
        <View style={{ width: '55%' }}>
          <WebCardInformation>
            <Comments reviews={reviews} textColor="black"/>
          </WebCardInformation>
        </View>
      </BrowserView>
      {/* MOBILE */}
      <MobileView>
        <CommentsModal reviews={reviews} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
        <CardSwiper
          user={user}
          type="place"
          subType={type}
          data={data?.results}
          onSwipedAll={fetchNextPage}
          setExtraData={(d) => setReviews(d.reviews || [])}
          buttons={[{
            icon: CommentIcon,
            onPress: () => setModalOpen(true),
          }]}
        />
      </MobileView>
    </LoadResourceLayout>
  )
}

export default Places;
