# Cryptocurrency Tracker Web Application

## Overview
This web application displays real-time cryptocurrency data using the CoinCap API. It features a table for viewing the top cryptocurrencies, a favorites system, and a detailed view for each cryptocurrency.

## Features
- **Real-Time Data**: Fetches and updates the top 100 cryptocurrencies.
- **Table View**: Pagination, sorting by symbol or name, and clickable links to detailed information.
- **Favorites**: Toggle favorite status with persistence across sessions.
- **Details Page**: Displays detailed information and a historical price graph.

## Technologies
- **React** with **TypeScript**
- **Redux Toolkit** for state management
- **Chakra UI** for UI components
- **axios** for HTTP requests
- **react-paginate** for pagination

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/manasi-04/crypto-dashboard.git
   cd crypto-dashboard
2. Install dependencies:
    ```bash
    npm install
3. Start the development server:
    ```bash
    yarn start
## Running Tests

- To run tests:
    ```bash
    npm test
## Usage
- Table: View and paginate through cryptocurrencies. Click headers to sort.
- Favorites: Add/remove favorites with the heart icon.
- Details: Click a name to view detailed information and historical data.

## Highlights
Has loader and error page handling as well.

## Deloyed app link
Check the deployed app [here](https://crypto-dashboard-silk.vercel.app/)

