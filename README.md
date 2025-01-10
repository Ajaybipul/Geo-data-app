# Geo-Data-App
### Key Features:
1. **File Upload**: Users can upload GeoJSON or KML files to visualize geographic data.
2. **Interactive Map**: Users can explore the map with zoom and pan features.
3. **Draw Custom Shapes**: Users can draw shapes like polygons and circles directly on the map.
4. **Download Drawn Shapes**: After drawing shapes, users can download them as GeoJSON files.
5. **User Authentication**: Secure login and logout functionality for users.

### Technologies Used:
- **Frontend**:
  - React.js
  - React-Leaflet (for displaying maps)
  - Leaflet.js (for map interaction)
  - React Router (for navigation)
  - Redux (for state management)
  - React-Dropzone (for file upload)
  
- **Backend**:
  - Node.js (for server-side logic)
  - Express.js (for API routes)
  - MongoDB (for storing user data, optional)
  - JWT (for authentication)

### Installation Steps:
1. Clone the repository: 
   ```bash
   git clone https://github.com/Ajaybipul/Geo-data-app.git
   ```
2. Install dependencies:
   - Client-side:
     ```bash
     cd client
     npm install
     ```
   - Server-side:
     ```bash
     cd server
     npm install
     ```
3. Run the application:
   - Client-side:
     ```bash
     cd client
     npm start
     ```
   - Server-side:
     ```bash
     cd server
     npm start
     ```
4. Open the app in your browser at: [http://localhost:3000](http://localhost:3000)

### Usage:
- **Upload GeoJSON/KML**: Click the "Upload" button to select and upload a file.
- **Draw Shapes**: Use the drawing tools to create polygons, circles, etc.
- **Download Shapes**: After drawing shapes, click the "Download GeoJSON" button to save the drawn shapes.

### Contributing:
- Fork the repository
- Clone your forked repository
- Create a new branch for your feature or bug fix
- Make your changes and push them
- Create a pull request to the main repository

### License:
MIT License

### Acknowledgments:
- **Leaflet.js**: For interactive maps.
- **React-Leaflet**: For integrating maps with React.
- **React-Dropzone**: For file uploads.
- **GeoJSON**: For geographic data encoding.

### Deployment Link:
- [Geo Data App](https://elegant-kheer-8381e4.netlify.app/)
