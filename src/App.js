import React, { useState, useMemo } from 'react';
import './App.css';

const PRODUCTS = [
  {
    id: 1,
    name: '무선 블루투스 이어폰',
    price: 89000,
    category: '전자제품',
    image: '🎧',
    description: '최신 노이즈 캔슬링 기능 탑재',
    stock: 12,
  },
  {
    id: 2,
    name: '스마트 워치',
    price: 249000,
    category: '전자제품',
    image: '⌚',
    description: '건강 모니터링 + GPS 내장',
    stock: 5,
  },
  {
    id: 3,
    name: '캐주얼 운동화',
    price: 79000,
    category: '의류',
    image: '👟',
    description: '쿠션감이 좋은 데일리 스니커즈',
    stock: 30,
  },
  {
    id: 4,
    name: '백팩',
    price: 59000,
    category: '의류',
    image: '🎒',
    description: '15인치 노트북 수납 가능',
    stock: 18,
  },
  {
    id: 5,
    name: '커피 머신',
    price: 320000,
    category: '주방',
    image: '☕',
    description: '에스프레소부터 라떼까지 한번에',
    stock: 3,
  },
  {
    id: 6,
    name: '프리미엄 텀블러',
    price: 35000,
    category: '주방',
    image: '🥤',
    description: '12시간 보온/보냉 유지',
    stock: 50,
  },
  {
    id: 7,
    name: '게이밍 마우스',
    price: 65000,
    category: '전자제품',
    image: '🖱️',
    description: 'RGB LED + 16000DPI 센서',
    stock: 22,
  },
  {
    id: 8,
    name: '베스트셀러 도서',
    price: 18000,
    category: '도서',
    image: '📚',
    description: '올해의 베스트셀러 모음',
    stock: 100,
  },
];

const CATEGORIES = ['전체', '전자제품', '의류', '주방', '도서'];

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === '전체' || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('장바구니가 비어있습니다!');
      return;
    }
    alert(
      `결제가 완료되었습니다!\n\n총 ${totalItems}개 상품\n결제 금액: ${totalPrice.toLocaleString()}원\n\n구매해주셔서 감사합니다!`
    );
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">🛒 YJ Shop</h1>
          <div className="search-box">
            <input
              type="text"
              placeholder="상품을 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="cart-button"
            onClick={() => setShowCart(!showCart)}
          >
            🛍️ 장바구니
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>AWS 클라우드 기반 쇼핑몰</h2>
          <p>GitHub Actions와 함께 자동 배포되는 모던 React 쇼핑 플랫폼</p>
          <div className="hero-badges">
            <span className="badge">⚡ 빠른 배송</span>
            <span className="badge">🔒 안전한 결제</span>
            <span className="badge">☁️ AWS S3 호스팅</span>
          </div>
        </div>
      </section>

      <nav className="categories">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <main className="products">
        <h2 className="section-title">
          {selectedCategory === '전체' ? '전체 상품' : selectedCategory}
          <span className="product-count">({filteredProducts.length}개)</span>
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>😢 검색 결과가 없습니다</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.image}</div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">
                      {product.price.toLocaleString()}원
                    </span>
                    <span
                      className={`product-stock ${
                        product.stock < 10 ? 'low' : ''
                      }`}
                    >
                      재고 {product.stock}개
                    </span>
                  </div>
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    장바구니 담기
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>🛍️ 장바구니</h2>
              <button
                className="close-btn"
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>🛒 장바구니가 비어있습니다</p>
                <button
                  className="continue-shopping"
                  onClick={() => setShowCart(false)}
                >
                  쇼핑 계속하기
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">{item.image}</div>
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p>{item.price.toLocaleString()}원</p>
                      </div>
                      <div className="cart-item-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>총 결제 금액</span>
                    <strong>{totalPrice.toLocaleString()}원</strong>
                  </div>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    💳 결제하기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>YJ Shop</h3>
            <p>AWS 클라우드 컴퓨팅 과제 - React 쇼핑몰 시스템</p>
          </div>
          <div className="footer-section">
            <h3>기술 스택</h3>
            <p>React 18 · GitHub Actions · AWS S3 · CloudFront</p>
          </div>
          <div className="footer-section">
            <h3>CI/CD</h3>
            <p>main 브랜치 push 시 자동 배포</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 YJ Shop · Powered by AWS Academy</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
