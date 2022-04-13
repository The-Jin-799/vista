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
                src="https://source.unsplash.com/random"
                alt=""
                loading="lazy"
              />
              <h1>Image One</h1>
              <p class="price">$20.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>
          
            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://source.unsplash.com/random/1"
                alt=""
                loading="lazy"
              />
              <h1>Image Two</h1>
              <p class="price">$19.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://source.unsplash.com/random/2"
                alt=""
                loading="lazy"
              />
              <h1>Image Three</h1>
              <p class="price">$18.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://source.unsplash.com/random/3"
                alt=""
                loading="lazy"
              />
              <h1>Image Four</h1>
              <p class="price">$17.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://source.unsplash.com/random/4"
                alt=""
                loading="lazy"
              />
              <h1>Image Five</h1>
              <p class="price">$16.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://source.unsplash.com/random/5"
                alt=""
                loading="lazy"
              />
              <h1>Image Six</h1>
              <p class="price">$15.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://source.unsplash.com/random/6"
                alt=""
                loading="lazy"
              />
              <h1>Image Seven</h1>
              <p class="price">$14.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

            <div class="mItem">
            <div class="card">
              <img
                class="img"
                src="https://source.unsplash.com/random/7"
                alt=""
                loading="lazy"
              />
              <h1>Image Eight</h1>
              <p class="price">$13.00</p>
              <p><button>Buy Now</button></p>
              </div>
            </div>

        </div>
      </div>
      )
}

export default Home;
