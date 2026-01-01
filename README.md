# ShoppyGlobe E‑commerce Application

This project is a basic e‑commerce application built with React and Vite.
It demonstrates routing, Redux based state management, API data fetching, and a custom UI.

---

## Tech Stack

- React (Vite)
- React Router DOM (`createBrowserRouter`)
- Redux Toolkit + React Redux
- CSS (no UI framework)
- DummyJSON products API – `https://dummyjson.com/products`

---

## Features (mapped to assignment)

### Component structure

- **App** – root layout, wraps header, routes and global toast provider.
- **Header** – navigation bar with app name and shopping cart icon showing cart count.
- **ProductList** – fetches and renders the grid of products.
- **ProductItem** – single product card with image, rating, price, and "ADD" button.
- **ProductDetail** – detailed view of one product, based on dynamic route parameter.
- **Cart** – lists all cart items with quantity controls and total price.
- **CartItem** – one item row in the cart.
- **Checkout** – dummy checkout form with user details and order summary.
- **NotFound** – 404 / error page for unknown routes or route errors.
- **Toast** – bottom popup used to show "Added to cart" feedback.
- **OffersTicker** – animated bar showing rotating offer messages.

All components are functional components using hooks.

### Props

- Data and handler functions are passed from parent to child components:
  - `ProductList` → `ProductItem` (`product`, `onAddToCart`).
  - `Cart` → `CartItem` (`item`, `onIncrease`, `onDecrease`, `onRemove`).
- Components keep their UI generic and read everything from props, which satisfies the props usage requirement.

### Data fetching with `useEffect`

- **ProductList** uses a `useProducts` hook:
  - Performs a GET request to `https://dummyjson.com/products` inside `useEffect`.
  - Stores `products`, `loading`, and `error` in local hook state.
  - Returns these values so `ProductList` can render loading/error/content states.
- **ProductDetail**:
  - Uses `useParams` to read `productId` from the URL (`/products/:productId`).
  - Uses `useEffect` to fetch `https://dummyjson.com/products/:productId`.
  - Stores the product, loading flag, and any fetch error in component state.

### Error Handling

- Both `ProductList` and `ProductDetail` catch fetch errors and show a human‑readable message.
- `NotFound` uses `useRouteError` to display status and message from router errors.

### State Management (Redux)

- **Store**:
  - Configured with `cart` and `products` slices via Redux Toolkit `configureStore`.
- **cartSlice**:
  - Manages an array of cart items (`id`, `title`, `price`, `thumbnail`, `quantity`).
  - Actions/reducers:
    - `addToCart`
    - `removeFromCart`
    - `increaseQuantity`
    - `decreaseQuantity` (never drops below 1)
    - `clearCart`
  - Selectors:
    - `selectCartItems`
    - `selectCartCount`
    - `selectCartTotal`
- **productsSlice**:
  - Stores a `searchTerm` for filtering products.
  - Action: `setSearchTerm`.
  - Selector: `selectSearchTerm`.

### Event Handling

- `ProductItem`:
  - Handles click on "ADD" button:
    - Dispatches `addToCart`.
    - Triggers a toast message.
- `ProductDetail`:
  - "Add to Cart" button does the same from the detail page.
- `CartItem`:
  - `+` and `-` buttons call increase/decrease handlers for that item.
  - "Remove" button dispatches `removeFromCart`.
  - `decreaseQuantity` is clamped so quantity never goes below 1.
- Checkout form:
  - On submit, validates simple required fields.
  - If valid, clears the cart, shows a success message and redirects back to Home after a short delay.

### React Router (data router)

- Uses `createBrowserRouter` and `RouterProvider`.
- Routes (all nested under `App`):

  - `/` – Product list (home).
  - `/products` – Product list (same view).
  - `/products/:productId` – Product detail (dynamic segment).
  - `/cart` – Cart page.
  - `/checkout` – Checkout page.
  - `NotFound` is provided as the `errorElement` so invalid URLs and route errors show a 404‑style page with details.

### React Lists

- Products are rendered as a grid using `.map()` over the products array with `product.id` as key.
- Cart items and checkout summary items are also rendered via `.map()` with proper keys.

### Performance Optimisation

- Route components are code‑split using `React.lazy` and `Suspense`:
  - `ProductList`, `ProductDetail`, `Cart`, `Checkout`, and `NotFound` are all lazily loaded.
- Images (product thumbnails and cart images) use `loading="lazy"` where appropriate.

### Styling and UX

- Custom CSS with:
  - Full‑width header bar, offer ticker, and content area.
  - Product cards with image, rating, price, and discount styling.
  - Responsive grid (adjusts columns with viewport width).
  - Styled cart rows and checkout form.
  - Smooth hover states for buttons and cards.
- The layout is responsive down to mobile widths using media queries.

---

## Project Structure (short overview)

```text
src/
  components/
    Header.jsx
    OffersTicker.jsx
    ProductList.jsx
    ProductItem.jsx
    ProductDetail.jsx
    Cart.jsx
    CartItem.jsx
    Checkout.jsx
    NotFound.jsx
    Toast.jsx
  store/
    cartSlice.js
    productsSlice.js
    store.js
  hooks/
    useProducts.js
  App.jsx
  main.jsx
  styles.css

1. Install dependencies:
npm install

2. npm run dev

3. Open the URL printed in the terminal (usually http://localhost:5173).

Netlify Link :
https://shoppyglobe-ecommerce-web.netlify.app/

GitHub Link :
https://github.com/imvinaythorat-codes/shoppyglobe-ecommerce.git

