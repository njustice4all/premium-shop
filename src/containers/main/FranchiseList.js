import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Map, fromJS } from 'immutable';

import { addFranchise } from '../../actions';

const Item = ({ franchise, index, onLoaded, onModifyBtnPress }) => {
  const images = franchise.get('image');
  let shopSequence = null;
  if (images.length > 0) {
    shopSequence = images[0].shop_seq;
  }

  return (
    <div className="lists">
      <div
        className="content-wrapper"
        onClick={onModifyBtnPress(franchise.get('seq'), franchise.get('member_seq'))}
      >
        <div className="icon">
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        </div>
        <div className="image-wrapper">
          {franchise.get('isLoaded') ? null : (
            <i className="fa fa-camera" aria-hidden="true" style={{ position: 'absolute' }} />
          )}
          <img
            src={
              franchise.get('image')[0]
                ? `http://van.aty.kr/image/${shopSequence}/${franchise.get('image')[0].imageName}`
                : null
            }
            onLoad={onLoaded(index)}
            className={franchise.get('isLoaded') ? 'franchise-image show' : 'franchise-image hide'}
            alt=""
          />
        </div>
        <div className="describe-wrapper">
          <div className="franchise-name" style={{ paddingRight: '10px' }}>
            <h1 className="ellipsis">{franchise.get('name')}</h1>
          </div>
          <div className="franchise-tag">
            <p className="ellipsis">{franchise.get('description')}</p>
          </div>
          <div className="franchise-address">
            <p className="ellipsis">{`${franchise.get('firstAddress')} ${franchise.get(
              'detailAddress'
            )}`}</p>
          </div>
          <div className="franchise-contact">
            <p>{franchise.get('contact')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

class FranchiseList extends Component {
  state = { franchiseLists: [] };

  componentDidMount = () => {
    const { franchiseLists } = this.props;
    const lists = franchiseLists.get('lists').map(list => {
      return Map({ ...list, isLoaded: false });
    });

    this.setState({ franchiseLists: lists.reverse() });
  };

  onLoaded = index => () => {
    const { franchiseLists } = this.state;
    this.setState({
      franchiseLists: franchiseLists.update(index, franchise => franchise.set('isLoaded', true)),
    });
  };

  onBackPress = () => {
    const { history } = this.props;
    history.push('/');
  };

  onModifyBtnPress = (shopSequence, memberSequence) => () => {
    const { addFranchise, history, franchiseLists } = this.props;
    const selectFranchiseIndex = franchiseLists
      .get('lists')
      .findIndex(franchise => franchise.seq === shopSequence);
    const franchise = fromJS(franchiseLists.getIn(['lists', selectFranchiseIndex]));

    addFranchise(franchise);
    history.push(`/franchise/setShop/${shopSequence}`);
  };

  render() {
    const { authentication } = this.props;
    const { franchiseLists } = this.state;
    if (!authentication.get('isLogin')) {
      return <Redirect to="/auth/signin" />;
    }

    return (
      <div className="franchise-list">
        <header>
          <span onClick={this.onBackPress}>
            <i className="fa fa-angle-left" aria-hidden="true" />
          </span>
          <h1>가맹점 목록 ({franchiseLists.size})</h1>
        </header>
        <div className="franchise-list__container">
          <div className="franchise-list__search">
            <span className="icon-wrapper">
              <i className="fa fa-search" aria-hidden="true" />
            </span>
            <input className="search-input-wrapper" type="text" />
          </div>
          <div className="divider">
            <div />
          </div>
          <div className="franchise-list__list-wrapper">
            {franchiseLists.map((franchise, index) => (
              <Item
                key={`franchise-${index}`}
                franchise={franchise}
                index={index}
                onLoaded={this.onLoaded}
                onModifyBtnPress={this.onModifyBtnPress}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      authentication: state.get('authentication'),
      franchiseLists: state.get('franchiseLists'),
    }),
    dispatch => ({
      addFranchise: franchise => dispatch(addFranchise(franchise)),
    })
  )(FranchiseList)
);
