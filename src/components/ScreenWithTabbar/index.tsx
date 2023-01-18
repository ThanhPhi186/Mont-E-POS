import React, {PureComponent} from 'react';
import styled from 'styled-components/native';
import DynamicHeader from '@/components/DynamicHeader';
import {FlatList, FlatListProps, Keyboard, View, ViewProps} from 'react-native';
import {widthScreen} from '@/utils/Tranform';
import TopTabbar from '@/components/TopTabbar';
import TabScreenComponent from './TabScreenComponent';
import {Title} from '../TextCommon';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Icons from '@/Icons';
import {Actions} from 'react-native-router-flux';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${p => p.theme.blueMain};
  padding-top: ${getStatusBarHeight()}px;
`;

const RowTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 24px;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
  padding: 4px;
  padding-top: 8px;
  padding-left: 0;
`;

const IconBack = styled.Image``;

interface TabbarProps {
  title?: string;
  hideBack?: boolean;
  listTab: {
    label: string;
    Component: any;
    params?: any;
  }[];
  footer?: any;
  header?: any;
  listRef?: (ref?: any) => void;
  defaultTab?: number;
  headerProps?: any;
  disableScroll?: boolean;
  // @ts-ignore
  flatListProps?: FlatListProps;
  containerProps?: ViewProps;
  tabScroll?: boolean;
  withOffset?: boolean;
  onViewableItemsChanged?: () => void;
}

interface TabbarState {
  currentTab: number;
}

class ScreenWithTabbar extends PureComponent<TabbarProps, TabbarState> {
  constructor(props: TabbarProps) {
    super(props);
    const initTab = props.defaultTab || 0;
    this.state = {
      currentTab: initTab,
    };
    this.listView = null;
  }

  listView: TabScreenComponent | null;

  onChangeTab = (tabIndex: number) => {
    if (!this.listView) return;
    if (this.props.listTab.length <= tabIndex || tabIndex < 0) return;
    Keyboard.dismiss();

    this.setState({currentTab: tabIndex});
    this.listView.scrollToTab(tabIndex);
  };

  onScrollEnd = ({
    nativeEvent: {
      contentOffset: {x},
    },
  }: any) => {
    const tabIndex = Math.floor(x / (widthScreen - 1));
    if (tabIndex !== this.state.currentTab) {
      this.onChangeTab(tabIndex);
    }
  };

  render() {
    const {
      title,
      listTab,
      header,
      footer,
      listRef,
      headerProps,
      containerProps,
      tabScroll = false,
      withOffset,
      onViewableItemsChanged,
      hideBack,
      ...listProps
    } = this.props;
    const {currentTab} = this.state;
    const listScreen = listTab.map(tabItem => ({
      Component: tabItem.Component,
      params: tabItem.params,
    }));
    return (
      <Wrapper {...containerProps}>
        {title && (
          <RowTitle>
            {!hideBack && (
              <BackButton onPress={() => Actions.pop()}>
                <IconBack source={Icons.icBack} />
              </BackButton>
            )}
            <Title>{title}</Title>
          </RowTitle>
        )}
        <TopTabbar
          listTab={listTab || []}
          currentTab={currentTab}
          onPress={this.onChangeTab}
          scrollEnable={tabScroll}
          withOffset={withOffset}
        />
        {header}
        <TabScreenComponent
          {...listProps}
          ref={ref => (this.listView = ref)}
          listScreen={listScreen}
          currentTab={currentTab}
          onViewableItemsChanged={onViewableItemsChanged}
          onChangeTab={this.onChangeTab}
        />
        {footer}
      </Wrapper>
    );
  }
}

export default ScreenWithTabbar;
