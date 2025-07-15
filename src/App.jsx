import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);

  const total = products.reduce((acc, p) => acc + p.price * p.amount, 0);
  const cartItemCount = products.reduce(
    (total, product) => total + product.amount,
    0
  );

  useEffect(() => {
    fetch("https://www.course-api.com/react-useReducer-cart-project")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.log("Doslo je do errora", error));
  }, []);

  return (
    <>
      <header>
        <h1 className="useReducer">UseReducer</h1>
        <div className="cart-div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="shopping-cart"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <span className="cart-number">{cartItemCount}</span>
        </div>
      </header>
      <div className="container">
        <h1 className="your-bag">YOUR BAG</h1>
        <ul className="products-list">
          {products.length === 0 ? (
            <h1 className="empty-message">is currently empty</h1>
          ) : (
            products.map((product) => (
              <li key={product.id} id={product.id}>
                <div className="info-div">
                  <div className="img-div">
                    <img
                      className="product-img"
                      src={product.img}
                      alt={product.title}
                    />
                  </div>
                  <div className="title-div">
                    <h3 className="product-title">{product.title}</h3>
                    <h3 className="product-price">${product.price}</h3>
                    <button
                      className="remove-btn"
                      onClick={() => {
                        setProducts(
                          products.filter((a) => a.id !== product.id)
                        );
                      }}
                    >
                      remove
                    </button>
                  </div>
                </div>
                <div className="amount-div">
                  <button
                    className="increase"
                    onClick={() => {
                      setProducts(
                        products.map((p) =>
                          p.id === product.id
                            ? { ...p, amount: p.amount + 1 }
                            : p
                        )
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="btn-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </button>
                  <span className="amount-span">{product.amount}</span>
                  <button
                    className="decrease"
                    onClick={() => {
                      setProducts(
                        products.map((p) =>
                          p.id === product.id
                            ? { ...p, amount: Math.max(p.amount - 1, 1) }
                            : p
                        )
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="btn-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        <div className="price-div">
          <p className="total-p">Total</p>
          <span className="total-price">${total.toFixed(2)}</span>
        </div>
        <button className="clear-btn" onClick={() => setProducts([])}>
          Clear Cart
        </button>
      </div>
    </>
  );
}

export default App;
