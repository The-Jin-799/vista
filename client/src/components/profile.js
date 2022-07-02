import React, { Component } from "react";
import "./styles/imageUpload.css";
import { saveAs } from "file-saver";
class Profile extends Component {
  state = {
    uploadedImages: [],
    boughtImages: [],
    accounts: this.props.accounts,
    contract: this.props.contract,
    image1hash: [],
    showModal: false,
    selectedImage: null,
    selectedId: null,
    buttonState: true,
  };

  getUploadedImages = async () => {
    const uploadedImages = await this.state.contract.methods
      .get()
      .call({ from: this.state.accounts[0] });
    this.setState({ uploadedImages });
  };

  downloadImage = (URL, fileName) => {
    saveAs(URL, fileName);
  };

  getBoughtImages = async () => {
    const boughtImages = await this.state.contract.methods
      .getBoughtImages()
      .call({ from: this.state.accounts[0] });
    this.setState({ boughtImages });
  };

  componentDidMount = async () => {
    await this.getUploadedImages();
    await this.getBoughtImages();
    if (this.state.uploadedImages.length > 0) {
      console.log(this.state.uploadedImages[0].hash);
      let ImageArray = this.state.uploadedImages.map((obj) => {
        return obj.hash;
      });
      this.setState({ image1hash: ImageArray });
    }
    console.log(this.state.boughtImages);
  };
  Imagemodal = (props) => {
    return (
      <div
        id="myModal"
        style={{ display: this.state.showModal ? "block" : "none" }}
        className="modal"
      >
        <div className="modal-content">
          <div class="modal-header">
            <span
              onClick={() =>
                this.setState({ showModal: !this.state.showModal })
              }
              className="close"
            >
              &times;
            </span>
            <h2>{props.image.title}</h2>
          </div>

          <img
            className="modal-body"
            src={`https://infura-ipfs.io/ipfs/${props.image.hash}`}
          />

          <div className="modal-footer ">
            <button
              className="modalbutton image-download-button"
              onClick={() =>
                this.downloadImage(
                  `https://infura-ipfs.io/ipfs/${props.image.hash}`,
                  props.image.title
                )
              }
            >
              Download
            </button>
          </div>
        </div>
      </div>
    );
  };
  showImageModal = (image, i) => {
    this.setState({ selectedImage: image });
    this.setState({ selectedId: i });
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <div
        onClick={(event) =>
          event.target.className == "modal"
            ? this.state.showModal
              ? this.setState({ showModal: false })
              : null
            : null
        }
      >
        <div className="profileButtons">
          <button
            className={
              this.state.buttonState
                ? "profileButton stateactive"
                : "profileButton"
            }
            onClick={() => {
              this.state.buttonState
                ? this.setState({ buttonState: true })
                : this.setState({ buttonState: true });
            }}
          >
            Uploaded Images
          </button>
          <button
            className={
              this.state.buttonState
                ? "profileButton"
                : "profileButton stateactive"
            }
            onClick={() => {
              this.state.buttonState
                ? this.setState({ buttonState: false })
                : this.setState({ buttonState: false });
            }}
          >
            Purchased Images
          </button>
        </div>
        {this.state.buttonState && (
          <div>
            {this.state.uploadedImages.length > 0 ? (
              <h1> Uploaded Images</h1>
            ) : (
              <h1>No Uploads</h1>
            )}
            <div className="masonry">
              {this.state.image1hash.map((hash, i) => (
                <div key={i} className="mItem">
                  <img
                    key={i}
                    className="img"
                    src={`https://infura-ipfs.io/ipfs/${hash}`}
                    alt=""
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {!this.state.buttonState && (
          <div>
            <h1> Purchased Images</h1>
            <div className="masonry">
              {this.state.boughtImages.map((image, i) => (
                <div key={i} className="mItem">
                  <img
                    onClick={() => this.showImageModal(image, i)}
                    key={i}
                    className="img"
                    src={`https://infura-ipfs.io/ipfs/${image.hash}`}
                    alt=""
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {this.state.showModal ? (
          <this.Imagemodal
            image={this.state.selectedImage}
            id={this.state.selectedId}
          />
        ) : null}
      </div>
    );
  }
}
export default Profile;
