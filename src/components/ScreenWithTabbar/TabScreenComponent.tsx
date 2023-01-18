import React, {
  memo,
  useCallback,
  useState,
  useRef,
  useEffect,
  ReactNode,
  PureComponent,
} from 'react';
import styled from 'styled-components/native';
import DynamicHeader from '@/components/DynamicHeader';
import {
  FlatList,
  FlatListProps,
  Keyboard,
  View,
  ViewProps,
} from 'react-native';
import { widthScreen } from '@/utils/Tranform';
import TopTabbar from '@/components/TopTabbar';

const Wrapper = styled(View)`
  /* background-color: ${p => p.theme.backgroundColor}; */
  flex: 1;
`;

const SFlatList = styled(FlatList)`
  flex: 1;
  width: ${widthScreen}px;
`;

const TabWrapper = styled.View`
  width: ${widthScreen}px;
`;

interface Props {
  listScreen: {
    Component: any;
    params?: any;
  }[];
  listRef?: (ref?: any) => void;
  defaultTab?: number;
  disableScroll?: boolean;
  // @ts-ignore
  flatListProps?: FlatListProps;
  containerProps?: ViewProps;
  tabScroll?: boolean;
  withOffset?: boolean;
  currentTab: number;
  onChangeTab: (tab: number) => void;
  componentViewProps?: ViewProps;
  onViewableItemsChanged?: () => void;
}

interface State {
  tab: number;
}

class TabScreenComponent extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const initTab = props.defaultTab || 0;
    this.state = {
      tab: initTab,
    };
    this.listView = null;
    this.exist = [initTab];
  }

  listView: FlatList | null;
  exist: number[];

  scrollToTab = (tabIndex: number) => {
    if (!this.listView) return;
    if (!this.exist.includes(tabIndex)) {
      this.exist.push(tabIndex);
    }
    this.setState({ tab: tabIndex });
    this.listView.scrollToIndex({ index: tabIndex, animated: false });
  };

  onScrollEnd = ({
    nativeEvent: {
      contentOffset: { x },
    },
  }: any) => {
    const tabIndex = Math.floor(x / (widthScreen - 1));
    if (tabIndex !== this.state.tab) {
      this.props.onChangeTab(tabIndex);
    }
  };

  render() {
    const {
      listScreen,
      listRef,
      defaultTab,
      flatListProps,
      disableScroll,
      containerProps,
      componentViewProps = {},
      onViewableItemsChanged,
    } = this.props;
    return (
      <Wrapper {...containerProps}>
        <SFlatList
          ref={ref => {
            this.listView = ref;
            if (ref) {
              // @ts-ignore
              listRef?.(ref);
            }
          }}
          data={listScreen || []}
          keyExtractor={(item, index) => index.toString()}
          onMomentumScrollEnd={this.onScrollEnd}
          pagingEnabled
          horizontal
          scrollEnabled={!disableScroll}
          initialScrollIndex={defaultTab}
          onScrollToIndexFailed={({ index }) => {
            setTimeout(() => this.scrollToTab(index), 100);
          }}
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          renderItem={({ item: tab, index }: { item: any; index: number }) => (
            <TabWrapper>
              {this.exist.includes(index) ? (
                <tab.Component
                  {...componentViewProps}
                  {...tab.params}
                  active={
                    this.state.tab === index || this.exist.includes(index)
                  }
                />
              ) : null}
            </TabWrapper>
          )}
          {...flatListProps}
        />
      </Wrapper>
    );
  }
}

export default TabScreenComponent;
