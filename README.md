# SkillNest - Frontend 🎓

This is a user interface (UI) system for the SkillNest online learning platform. The project was built using ReactJS and the Vite build tool to optimize development speed.

## 🛠 Tech Stack
* **Framework:** ReactJS
* **Build Tool:** Vite
* **Hosting/CDN:** AWS S3 & Amazon CloudFront

## 🚀 Run on local environment (Phát triển)

### System Requirement
* Node.js (phiên bản 18.x trở lên)
* NPM hoặc Yarn

### Installation
1. Clone repository:

    ```bash
    git clone https://github.com/thaodinh97/SkillNest_FE.git
    cd SkillNest_FE
    cd frontends
2. Cài đặt các thư viện phụ thuộc:

   ```bash
   npm install
3. Create .env file in the root directory and configure the API call path:

    ```env
    VITE_API_BASE_URL=http://localhost:8080 # Using for running backend local server
4. Start server

    ```bash
    npm run dev
## 📦 Deployment
The project was deployed statically to AWS S3 and delivered via CloudFront.
1. Build source code: 

    ```bash
    npm run build
2. Sync the dist folder to the S3 bucket.

