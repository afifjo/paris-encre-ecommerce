
Built by https://www.blackbox.ai

---

# Paris Encre

## Project Overview

**Paris Encre** is an e-commerce platform focused on printers and consumables. It provides a user-friendly interface for customers to browse and purchase products, as well as manage their accounts, view orders, and more. This application uses a Node.js backend with Express to handle server-side logic and provides a responsive design with HTML, CSS, and JavaScript for the frontend.

## Installation

To get started with the project, follow these steps to install the necessary packages and run the application locally:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/parisencre.git
   cd parisencre
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application should now be running on `http://localhost:3000`.

## Usage

Once the server is running, you can access the application through your web browser. Navigate to the homepage to explore the product categories, use the search functionality, and manage your cart. You can also create an account, log in, and check out.

### Main functional routes:

- **Home Page**: Display product categories and featured products.
- **Category Page**: Filter and browse products by categories like printers, consumables, and accessories.
- **Product Detail Page**: View detailed information about individual products.
- **Cart Page**: View items in the shopping cart and proceed to checkout.
- **Account Management**: Create an account, log in, and manage user details and orders.

## Features

- User-friendly interface for product browsing and purchasing.
- User account system for managing orders and personal information.
- Product filtering and sorting capabilities.
- Dynamic pricing update and cart management.
- Responsive design for mobile users.

## Dependencies

This project relies on the following packages as listed in the `package.json`:

- **Express**: Web framework for Node.js.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **Body-parser**: Middleware to handle incoming request bodies.

### Development Dependencies

- **Nodemon**: A utility that automatically restarts the server on file changes.

## Project Structure

Here's a brief overview of the project structure to help you understand how the files are organized:

```
parisencre/
├── css/
│   └── styles.css                    # Styles for the application
├── js/
│   └── main.js                        # Main JavaScript file for frontend functionality
├── html/
│   ├── index.html                     # Main homepage
│   ├── category.html                  # Category browsing page
│   ├── product.html                   # Individual product detail page
│   ├── cart.html                      # Shopping cart page
│   ├── login.html                     # User login page
│   ├── register.html                  # User registration page
│   ├── checkout.html                  # Checkout page
│   └── account.html                   # User account management page
├── server.js                          # Node.js server implementation
├── package.json                        # Project metadata and dependencies
├── package-lock.json                  # Dependency tree for the project
└── README.md                          # Project documentation
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to contribute to this project by submitting issues or pull requests. Thank you for using Paris Encre!