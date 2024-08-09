## Brics Pay: A Stablecoin Platform for BRICS Economies (Hackathon Project - HackerHouse Goa)

**Brics Pay** is a revolutionary financial platform designed to streamline international transactions within the BRICS nations. Built on the Diamante blockchain, it offers a stablecoin, Bric, as a secure alternative to the US dollar, facilitating faster and cheaper international payments. This project was developed during the HackerHouse Goa Hackathon.

### Key Features

* **Bric Stablecoin:** A stablecoin pegged to a basket of BRICS currencies, ensuring stability and reduced reliance on USD.
* **Multi-Currency Support:** Buy Bric using native currencies of BRICS countries and Diamante (DIAM).
* **Seamless International Payments:** Send and receive Bric tokens globally for cost-effective transactions.
* **Stock Market Access:** Invest in stocks across BRICS countries directly using Bric, expanding investment opportunities.
* **Cryptocurrency Exchange:** Swap Bric for other cryptocurrencies within the Brics Pay platform.
* **Secure Identity Verification :** Integrate with Anon Aadhaar for enhanced security and user privacy.

### Technology Stack

* **Backend:** Node.js, Express, Prisma ORM, Diamante SDK
* **Frontend:** React, Vite, Tailwind CSS, Material UI 
* **Database:** MongoDB
* **Blockchain:** Diamante

### Project Structure

**Backend:**
* **Routes:** Defines API endpoints for user management, authentication, token handling, stock market interactions, swap functionalities, and balance management.
* **Controllers:** Handles business logic for API requests, interacting with the database using Prisma.
* **Models:** Defines data structures for users, transactions, stocks, and other relevant information (using Prisma Schema).

**Frontend:**
* **Components:** Reusable UI components for building the user interface.
* **Pages:** Defines different views of the application, such as login, dashboard, stock, swap, and balance.
* **Styling:** Uses Tailwind CSS or other styling frameworks for a consistent and responsive design.

### Installation

**Backend:**
```bash
git clone https://github.com/your-repo/brics-pay.git
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Running the Application

**Backend:**
```bash
node index.js
```

**Frontend:**
 ```bash
 npm run dev
``` 

### Future Improvements

* Expand token support beyond BRICS and Diamante.
* Enhance the user interface for an intuitive and user-friendly experience.
* Implement robust security measures for data protection.
* Integrate with additional financial services for a comprehensive platform.
