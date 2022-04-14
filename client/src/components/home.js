import React from "react";
import "./styles/imageUpload.css";
import "./styles/home.css";
function Home(props) {
  return ( 
    <div>

        <div className="masonry">
          
            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://cloudflare-ipfs.com/ipfs/QmevHLTrE5TLLEC1KEmAXpoRLEUNBF5KHUAwrq1tN8ntp5"
                alt=""
                loading="lazy"
              />
              <h1>Cloudy</h1>
              <p class="price">$20.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>
          
            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://cloudflare-ipfs.com/ipfs/QmeBBnepJcpjsgJ64VLkEJ7CAQMYgJHDuqCcbA91uQSnu3"
                alt=""
                loading="lazy"
              />
              <h1>Fan Light</h1>
              <p class="price">$19.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://cloudflare-ipfs.com/ipfs/QmdJRh6vv8PN8bDCjzs45KKdNm88ysMBYg5cip8TBvf2hU"
                alt=""
                loading="lazy"
              />
              <h1>Chocolate chip cake</h1>
              <p class="price">$18.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://cloudflare-ipfs.com/ipfs/QmUkEhbcNoNesjLcoeu5AGjyTMY9vT5Tk3ncaYKqPndkLi"
                alt=""
                loading="lazy"
              />
              <h1>Wooden Bridge</h1>
              <p class="price">$17.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://cloudflare-ipfs.com/ipfs/QmZ2qZXHfNpKKQ2fqT1ToyKTFEwZX6FNMgHiCBWxN4Lfop"
                alt=""
                loading="lazy"
              />
              <h1>Snow</h1>
              <p class="price">$16.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://cloudflare-ipfs.com/ipfs/QmWi7VvJP8dDS9omDa6fn98NWjrAphJcU2sKfbaDEuGefe"
                alt=""
                loading="lazy"
              />
              <h1>Lexus Interior</h1>
              <p class="price">$15.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://cloudflare-ipfs.com/ipfs/QmdQZjWvyCyxTNkA6eYpc6QzGDz67CztnprU8ne6omSxb5"
                alt=""
                loading="lazy"
              />
              <h1>Christmas mall</h1>
              <p class="price">$14.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://cloudflare-ipfs.com/ipfs/QmNSe8pPKSKQWpjPFzmM5bbqZukXFr3fD2ticMgKEwvjTr"
                alt=""
                loading="lazy"
              />
              <h1>Candle</h1>
              <p class="price">$13.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

        </div>
      </div>
      )
}

export default Home;
