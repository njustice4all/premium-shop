import React, { Component } from 'react';

export default class Address extends Component {
  componentDidMount = () => {
    this.loadScript();
  };

  loadScript = () => {
    const script = document.createElement('script');
    script.src = 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false';
    script.onload = () => this.initiate();
    document.body.appendChild(script);
  };

  initiate = () => {
    const { handleAddress } = this.props;
    window.daum.postcode.load(() => {
      const Postcode = new window.daum.Postcode({
        oncomplete: function oncomplete(data) {
          // console.log(this);
          handleAddress(data);
        },
        width: '100%',
        // minWidth: '280px',
        height: '466px',
      });

      Postcode.embed(this.addr, { q: null, autoClose: false });
    });
  };

  render() {
    return <div ref={addr => (this.addr = addr)} className="address__wrapper" />;
  }
}
