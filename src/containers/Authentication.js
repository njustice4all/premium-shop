import React, { Component } from 'react';
import '../css/main.scss';

export default class Authentication extends Component {

  state = { file: '', imagePreviewUrl: '' }

  handleChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let preview = null;
    if (imagePreviewUrl) {
      preview = (<img src={imagePreviewUrl} alt='' />);
    } else {
      preview = (<h1>this is preview</h1>);
    }

    return (
      <div className="Authentication">
        <div className="Authentication-header">
          <h2>good</h2>
        </div>
        <p className="Authentication-intro">
          <input accept="image/*" multiple="multiple" name="photo" type="file" onChange={(e) => this.handleChange(e)} />
          <input type="file" name="photo" accept="image/*" capture="gallery" onChange={(e) => this.handleChange(e)} />
        </p>
        <button onClick={() => console.log(this.state.file)}>confirm</button>
        <div>{preview}</div>
      </div>
    );
  }
};
