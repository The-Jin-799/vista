import React, { Component } from "react";
import web3 from "web3";
import "./styles/imageUpload.css";
import "./styles/home.css";
import ReactImageProcess from "react-image-process";
import { default as watermark } from "./styles/watermark.png";
class Home extends Component {
  state = {
    allImages: [],
    accounts: this.props.accounts,
    contract: this.props.contract,
    boughtImages: [],
    showModal: false,
    selectedImage: null,
    selectedId: null,
    EthUsd: 1,
  };

  componentDidMount = async () => {
    let EthUsd;
    fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,JPY,EUR"
    )
      .then((response) => response.json())
      .then((data) => {
        EthUsd = data.USD;
        console.log(data);
        this.setState({ EthUsd });
        console.log(this.state.EthUsd);
      });

    await this.getBoughtImages();
    const allImages = await this.state.contract.methods
      .getALL()
      .call({ from: this.state.accounts[0] });
    this.setState({ allImages });
    //console.log(allImages);
    console.log(this.state.allImages);
  };

  getBoughtImages = async () => {
    const boughtImages = await this.state.contract.methods
      .getBoughtImages()
      .call({ from: this.state.accounts[0] });
    this.setState({ boughtImages });
  };

  buyImage = (i, price) => {
    let amountToPay = web3.utils.toWei(price, "gwei");
    console.log("in wei: " + amountToPay);
    this.state.contract.methods.buyImage(i).send({
      from: this.state.accounts[0],
      value: price,
    });

    console.log(i + ":" + price);
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
          <ReactImageProcess
            mode="waterMark"
            waterMarkType="image"
            waterMark={watermark}
            width={300}
            height={500}
            opacity={0.7}
            coordinate={[0, -50]}
          >
            <img
              className="modal-body"
              src={`https://infura-ipfs.io/ipfs/${props.image.hash}`}
            />
          </ReactImageProcess>
          <div className="modal-footer">
            <h3>
              {web3.utils.fromWei(props.image.price, "ether")} ETH (
              <em>
                $
                {this.state.EthUsd &&
                  Math.round(
                    web3.utils.fromWei(props.image.price, "ether") *
                      this.state.EthUsd
                  ).toFixed(2)}
              </em>
              )
            </h3>
            <button
              onClick={() => {
                this.buyImage(props.id, props.image.price);
              }}
              className="modalbutton"
            >
              Buy Now
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
        <div className="masonry">
          {this.state.allImages.map(
            (image, i) =>
              image.uploader !== this.state.accounts[0] &&
              // console.log(
              !this.state.boughtImages.some(
                (boughtimage) => image.hash === boughtimage.hash
              ) && (
                <div key={i} className="mItem">
                  <div className="card">
                    <img
                      onClick={() => this.showImageModal(image, i)}
                      className="img"
                      src={`https://infura-ipfs.io/ipfs/${image.hash}`}
                      alt=""
                      loading="lazy"
                    />
                    <h1 className="title">{image.title}</h1>
                    <h1 className="price">
                      {web3.utils.fromWei(image.price, "ether")} ETH ($
                      {this.state.EthUsd &&
                        Math.round(
                          web3.utils.fromWei(image.price, "ether") *
                            this.state.EthUsd
                        ).toFixed(2)}
                      )
                    </h1>
                    <p>
                      <button onClick={() => this.buyImage(i, image.price)}>
                        Buy Now
                      </button>
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
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

export default Home;
