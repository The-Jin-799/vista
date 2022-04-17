import React, { Component } from "react";
import web3 from "web3";
import "./styles/imageUpload.css";
import "./styles/home.css";
class Home extends Component {
  state = {
    allImages: [],
    accounts: this.props.accounts,
    contract: this.props.contract,
  };

  componentDidMount = async () => {
    const allImages = await this.state.contract.methods
      .getALL()
      .call({ from: this.state.accounts[0] });
    this.setState({ allImages });
    //console.log(allImages);
    console.log(this.state.allImages);
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

  render() {
    return (
      <div className="masonry">
        {this.state.allImages.map(
          (image, i) =>
            image.uploader !== this.state.accounts[0] && (
              <div key={i} className="mItem">
                <div className="card">
                  <img
                    className="img"
                    src={`https://cloudflare-ipfs.com/ipfs/${image.hash}`}
                    alt=""
                    loading="lazy"
                  />
                  <h1 className="title">{image.title}</h1>
                  <h1 className="price">
                    {web3.utils.fromWei(image.price, "gwei")} Gwei
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
    );
  }
}

export default Home;
