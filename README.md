Facebook Graph API: Publish Posts to Page
Follow these detailed steps to set up Facebook Graph API and publish posts to your Facebook Page. This guide is for developers integrating posting functionality into apps.
​

Step 1: Create Developer Account
Visit developers.facebook.com and sign up for a free Facebook Developer account using your existing Facebook login. Complete the registration by verifying your email and phone number if prompted. Once approved, access the developer dashboard.
​

Step 2: Create Facebook App
In the developer dashboard, click "My Apps" then "Create App". Select "Other" as the app type, choose "Business" or "Consumer" based on use case, and fill in app details like name and email. Note the generated App ID and App Secret from the app dashboard under Settings > Basic—these are required for API authentication.
​

Step 3: Configure App for Graph API
Add the Facebook Login product: From app dashboard, go to Products > Add Product > Facebook Login > Web (or relevant platform). Set valid OAuth redirect URIs (e.g., http://localhost:3000 for development). Request permissions like pages_show_list, pages_read_engagement, and pages_manage_posts via App Review if needed for production. No specific "Graph API option"—Graph API is used via any app.
​

Step 4: Get Access Token and Page ID
Use Graph API Explorer (developers.facebook.com/tools/explorer): Select your app, generate a User Access Token with pages_show_list and pages_manage_posts permissions. Query me/accounts?access_token={user-token} to list Pages and retrieve Page ID and Page Access Token (long-lived for production via exchange endpoint). Find Page ID via facebook.com/{page}/about or API query.
​

Step 5: Retrieve App Credentials
From app dashboard > Settings > Basic, copy App ID (Client ID) and App Secret. Use these to generate tokens programmatically: https://graph.facebook.com/oauth/access_token?client_id={app-id}&client_secret={app-secret}&grant_type=client_credentials for app tokens. Store securely—never expose in client-side code.
​

Publish a Post Example
Use Page Access Token to POST to /{page-id}/feed:

text
curl -i -X POST "https://graph.facebook.com/v20.0/{page-id}/feed?message=Hello%20World&access_token={page-access-token}"
Replace {page-id} and {page-access-token}. Response: {"id": "post-id"}. Supports text, links (link=URL), photos (published_photo_url=URL). Requires pages_manage_posts permission.
