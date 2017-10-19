import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

const List = ({ ...franchise, index, onLoaded }) => {
  return (
    <div className="lists">
      <div className="content-wrapper">
        <div className="icon">
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        </div>
        <div className="image-wrapper">
          {franchise.isLoaded ? null : (
            <i
              className="fa fa-camera"
              aria-hidden="true"
              style={{ position: 'absolute' }}
            />
          )}
          <img
            src={`http://van.aty.kr/image/${franchise.imageName}`}
            onLoad={onLoaded(index)}
            className={
              franchise.isLoaded
                ? 'franchise-image show'
                : 'franchise-image hide'
            }
            alt=""
          />
        </div>
        <div className="describe-wrapper">
          <div className="franchise-name">
            <h1>{franchise.name}</h1>
          </div>
          <div className="franchise-tag">
            <p>{franchise.description}</p>
          </div>
          <div className="franchise-address">
            <p>{`${franchise.firstAddress} ${franchise.detailAddress}`}</p>
          </div>
          <div className="franchise-contact">
            <p>{franchise.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

class FranchiseList extends Component {
  state = { franchiseLists: [] };

  componentDidMount = () => {
    const lists = this.props.franchiseLists.lists.map(list => {
      return {
        ...list,
        isLoaded: false,
      };
    });

    this.setState({
      franchiseLists: lists
      // franchiseLists: lists.sort((a, b) => b - a),
    });
  };

  onLoaded = index => () => {
    const { franchiseLists } = this.state;
    this.setState({
      franchiseLists: [
        ...franchiseLists.slice(0, index),
        Object.assign({}, franchiseLists[index], {
          isLoaded: true,
        }),
        ...franchiseLists.slice(index + 1),
      ],
    });
  };

  onBackPress = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { authentication } = this.props;
    const { franchiseLists } = this.state;
    if (!authentication.isLogin) {
      return <Redirect to="/auth/signin" />;
    }

    return (
      <div className="franchise-list">
        <header>
          <span onClick={this.onBackPress}>
            <i className="fa fa-angle-left" aria-hidden="true" />
          </span>
          <h1>가맹점 목록 ({franchiseLists.length})</h1>
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
              <List
                key={`franchise-${index}`}
                {...franchise}
                index={index}
                onLoaded={this.onLoaded}
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
    authentication: state.authentication,
    franchiseLists: state.franchiseLists,
  };
};

export default withRouter(connect(mapStateToProps)(FranchiseList));
