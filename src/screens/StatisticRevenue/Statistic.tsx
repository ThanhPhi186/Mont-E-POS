import DynamicInput from '@/components/DynamicInput';
import ListLoading from '@/components/ListLoading';
import ListSearchEmpty from '@/components/ListSearchEmpty';
import Icons from '@/Icons';
import {fetchReportStatistic} from '@/store/report/api';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';
import StatisticItem from './components/StatisticItem';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 24px;
  padding-top: 12px;
`;

const SFlatList = styled.FlatList``;

const SDynamicInput = styled(DynamicInput)`
  margin-top: 12px;
`;

const Icon = styled.Image``;

const TotalText = styled.Text`
  margin-top: 16px;
`;

const Statistic = memo(() => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const currentPage = useRef(0);
  const totalPage = useRef(1);
  const totalItem = useRef(0);
  const searchName = useRef('');

  const getData = useCallback(async () => {
    if (currentPage.current >= totalPage.current) return;
    setLoading(true);
    loadingRef.current = true;
    const {results} = await fetchReportStatistic(searchName.current);
    currentPage.current += 1;

    setData(results);
    setLoading(false);
    loadingRef.current = false;
  }, []);

  const onRefresh = useCallback(() => {
    setData([]);
    currentPage.current = 0;
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <SFlatList
        data={data || []}
        ListHeaderComponent={
          <>
            <SDynamicInput
              placeholderStr="Tìm tên sản phẩm"
              onChangeText={t => (searchName.current = t)}
              textInputProps={{onEndEditing: () => onRefresh()}}
              rightIcon={<Icon source={Icons.icSearch} />}
            />
            <TotalText>Danh sách khách hàng ({data?.length || 0})</TotalText>
          </>
        }
        ListFooterComponent={<ListLoading loading={loading} />}
        ListEmptyComponent={!loading ? <ListSearchEmpty /> : null}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}: any) => <StatisticItem item={item} />}
      />
    </Wrapper>
  );
});

export default Statistic;
