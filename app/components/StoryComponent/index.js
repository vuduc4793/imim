import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { MoreDetailHistoryItem } from "../../components/MoreDetailHistoryItem";
import {Texts, Numbering, AppDimensions, Styles} from "../../constants";
import * as DiscoveryAPI from "../../services/DiscoveryApi";
import * as StoryAPI from "../../services/StoryApi";
import * as SearchStoryApi from "../../services/SearchStoryApi";
import styles from "./style";

class HistoryListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      previousScreen: props.previousScreen,
      previousScreenName: props.previousScreenName,
      currentPage: 1,
      loadMore: true,
      isLoading: false,
      data: [],
      sortType: props.sortType,
      isRefreshing: false
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword !== this.props.keyword) {
      this.handleRefresh()
    }
  }

  getData = async () => {
    let { data } = this.state;
    this.setState({
      isLoading: true
    });
    let newData;

    switch (this.state.item._id.$oid) {
      case "1":
        newData = await DiscoveryAPI.getListGenreStoryFull(Numbering.NUMBER_OF_ITEM_PER_PAGE,
          this.state.currentPage);
        break;
      case "2":
        newData = await DiscoveryAPI.getListStoryViewMost(Numbering.NUMBER_OF_ITEM_PER_PAGE,
          this.state.currentPage);
        break;
      case "3":
        newData = await DiscoveryAPI.getListStoryLikeMost(Numbering.NUMBER_OF_ITEM_PER_PAGE,
          this.state.currentPage);
        break;
      default:
        newData = await DiscoveryAPI.getListStoryGroup(this.state.item._id.$oid);
        break;
    }

    if (!newData || newData.length === 0) {
      this.setState({
        loadMore: false,
        data: []
      })
    } else {
      this.setState({
        data: data ? [...data, ...newData] : newData
      });
    }

    this.setState({
      isLoading: false
    });
  };

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
        {
          (this.state.data && this.state.data.length > 0) ? <FlatList
            style={{ flex: 1 }}
            data={this.state.data}
            renderItem={({ item, index }) => (
              <MoreDetailHistoryItem
                name={item.title}
                author={item.author}
                numberOfChapter={item.chapter_count}
                genre={item.genre ? item.genre.join(', ') : ""}
                imgLink={item.cover}
                onClick={() => this.props.onClickHistoryItem(index)}
              />
            )}
            keyExtractor={(item, index) => (index.toString())}
            ItemSeparatorComponent={() => <View style={Styles.seperatorOfItemList} />}
            onEndReached={this._onEndReach}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this._renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.isRefreshing}

          /> : <Text style={[styles.centerText,]} >
              {Texts.noData}
            </Text>
        }
      </View>
    )
  }

  _onEndReach = () => {
    let { loadMore, data, currentPage } = this.state;
    if (!loadMore) {
      return;
    }
    if (!(data.length < Numbering.NUMBER_OF_ITEM_PER_PAGE * currentPage)) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      }, () => {
        this.getData();
      });
    }
  }
  _renderFooter = () => {

    if (!this.state.isLoading) return null;
    return <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
      }}
    >
      <ActivityIndicator size="large" color={Colors.colorPrimary} animating />
    </View>
  }

  handleRefresh = async () => {
    this.setState({
      currentPage: 1,
      data: []
    }, () => {
      this.getData();
    });


    this.setState({
      isRefreshing: false
    })
  }
}

export default HistoryListComponent;