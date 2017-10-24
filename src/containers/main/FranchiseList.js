import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Map } from 'immutable';

const Item = ({ franchise, index, onLoaded, onModifyBtnPress }) => {
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
                ? `http://van.aty.kr/image/${franchise.get('image')[0].imageName}`
                : null
            }
            onLoad={onLoaded(index)}
            className={franchise.get('isLoaded') ? 'franchise-image show' : 'franchise-image hide'}
            alt=""
          />
        </div>
        <div className="describe-wrapper">
          <div className="franchise-name">
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
    // TODO: shopSequence 저장 action
    this.props.history.push(`/franchise/setShop/${shopSequence}`);
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

const mapStateToProps = state => {
  return {
    authentication: state.get('authentication'),
    franchiseLists: state.get('franchiseLists'),
  };
};

export default withRouter(connect(mapStateToProps)(FranchiseList));
