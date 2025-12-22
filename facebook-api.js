const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Your credentials
const PAGE_ID = "891812997352206";
const PAGE_ACCESS_TOKEN = "EAANlkMQb0DsBQYtSUO9gx1uVgL11wEoS9cUbzsbyeK8H4nvaSGdliZBPOpXrRynry9JPeZA4BIMzCaXiBPFyg89rZBS62lvLJABTIGUafjlZCfltNK8ALZARZB4a9ZAVMAKrbNMvDp699ZAqLNijpr6oNMEdf2CDbtYqkkKPZBHgNFxn7iTKTOzSFwrZBJWtHCDgSauFDZAjsoXeuQ66Yd31YOkNN7qGca9dJwhBZA4ZBc9qrCZB0ZD";  // Your token

// Function 1: Post Image
async function postImage(imageUrl, caption) {
  try {
    console.log("📸 Posting image...");
    
    const response = await axios.post(
      `https://graph.facebook.com/v24.0/${PAGE_ID}/photos`,
      {
        url: imageUrl,
        caption: caption,
        access_token: PAGE_ACCESS_TOKEN
      }
    );
    
    console.log("✅ Image posted successfully!");
    console.log("Post ID:", response.data.id);
    return response.data;
    
  } catch (error) {
    console.error("❌ Error posting image:", error.response?.data?.error?.message || error.message);
  }
}

// Function 2: Post Video from URL (with longer timeout)
async function postVideoFromURL(videoUrl, title, description) {
  try {
    console.log("🎬 Posting video from URL...");
    
    const response = await axios.post(
      `https://graph.facebook.com/v24.0/${PAGE_ID}/videos`,
      {
        source: videoUrl,
        title: title,
        description: description,
        access_token: PAGE_ACCESS_TOKEN
      },
      {
        timeout: 60000  // 60 seconds timeout (increased)
      }
    );
    
    console.log("✅ Video posted successfully!");
    console.log("Video ID:", response.data.id);
    console.log("Status:", response.data.video_status);
    return response.data;
    
  } catch (error) {
    console.error("❌ Error posting video:", error.response?.data?.error?.message || error.message);
  }
}

// Function 3: Post Video from Local File
async function postVideoFromFile(localFilePath, title, description) {
  try {
    console.log("📁 Uploading video from file...");
    
    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      console.error("❌ File not found:", localFilePath);
      console.log("📍 Current directory:", process.cwd());
      console.log("📍 Looking for:", path.resolve(localFilePath));
      return;
    }
    
    const fileSize = fs.statSync(localFilePath).size;
    console.log(`📦 File size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
    
    if (fileSize > 4 * 1024 * 1024 * 1024) {
      console.error("❌ File too large! Max 4GB");
      return;
    }
    
    const form = new FormData();
    form.append('source', fs.createReadStream(localFilePath));
    form.append('title', title);
    form.append('description', description);
    form.append('access_token', PAGE_ACCESS_TOKEN);
    
    const response = await axios.post(
      `https://graph.facebook.com/v24.0/${PAGE_ID}/videos`,
      form,
      { 
        headers: form.getHeaders(),
        timeout: 120000,  // 2 minutes
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );
    
    console.log("✅ Video uploaded successfully!");
    console.log("Video ID:", response.data.id);
    console.log("Status:", response.data.video_status);
    return response.data;
    
  } catch (error) {
    console.error("❌ Error uploading video:", error.response?.data?.error?.message || error.message);
  }
}

// Main execution
async function main() {
  console.log("🚀 Facebook API Test Started\n");
  
  // // Test 1: Post Image
  // console.log("--- Test 1: Posting Image ---");
  // await postImage(
  //   "https://www.w3schools.com/css/img_5terre.jpg",
  //   "Testing Facebook API integration! 📸"
  // );
  
//   console.log("\n--- Test 2: Posting Video from URL ---");
//   // Using a smaller video URL
//   await postVideoFromURL(
//     "https://www.w3schools.com/html/mov_bbb.mp4",
//     "Test Video from API",
//     "Testing video upload via Facebook Graph API"
//   );
  
//   Only run Test 3 if you have a local video
  console.log("\n--- Test 3: Posting Local Video ---");
  await postVideoFromFile(
    "./videos/62.mp4",  // Ensure this path is correct
    "Fuel The Soul",
    "The Old Man and the Tree"
  );
  
  console.log("\n✨ All tests completed!");
}

// Run the main function
main();
