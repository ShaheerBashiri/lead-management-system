# Lead Management System

A full-stack application for managing leads and converting them into customers.  
This project is containerized using Docker.

## Setup Instructions
**Build and Run the Containers**
In the project root (where the `docker-compose.yml` file is located), run:
```docker-compose up --build```

-   This command will:

    -   Build and start the **frontend** on port **3000**
    -   Build and start the **backend** on port **4000**
    -   Start **MongoDB** on port **27017**

- **Access the Application**

    Open your browser and navigate to:

    -   **Frontend:** http://localhost:3000
    -   **Backend API:** http://localhost:4000/api/leads
