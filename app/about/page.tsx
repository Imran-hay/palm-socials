"use client"
import React from 'react';
import Nav from '../Components/Nav';
import Heade from '../Components/Header';


const About = () => {
  return (
    <div className='mb-12'>
    <Heade/>
   
    <div className="container mx-auto p-4 mb-25">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">Palm Socials - A Social Media Management App</h1>
      <h2 className="text-2xl font-bold mb-4 text-blue-800">About The App</h2>
      <p className="text-base mb-4">
        This App has three main functionalities
      </p>
      <h3 className="text-xl font-bold mt-6 text-blue-800">1. Social Media Analytics</h3>
      <p className="text-base ml-4 mb-2">
        • This app will allow you to see basic social media analytics of four social media profiles namely Instagram, Facebook, YouTube, and Telegram. This analytics include: Followers count, the number of media posted, the number of likes and comments, Reach, Impression, and more.
      </p>
      <p className="text-base ml-4 mb-2">
        • For Telegram, only the number of followers can be seen through this app.
      </p>
      <h3 className="text-xl font-bold mt-6 text-blue-800">2. Account Posts</h3>
      <p className="text-base ml-4 mb-2">
        • The app will allow you to see the individual post made in each social media account along with the number of likes and comments on each post.
      </p>
      <p className="text-base ml-4 mb-2">
        • For YouTube and Facebook, the posts are accessible through links.
      </p>
      <p className="text-base ml-4 mb-2">
        • Only the current Profile picture of the Telegram profile can be seen through this app.
      </p>
      <h3 className="text-xl font-bold mt-6 text-blue-800">3. Posting New Media</h3>
      <p className="text-base ml-4 mb-2">
        • This app will allow you to post new photo or video to the above-mentioned social media profiles.
      </p>
      <h4 className="text-lg font-bold mt-4 text-blue-800">Instagram</h4>
      <p className="text-base ml-4 mb-2">
        • You can publish both photos and videos using this app.
      </p>
      <p className="text-base ml-4 mb-2">
        • The photos are recommended to be in JPEG format.
      </p>
      <p className="text-base ml-4 mb-2">
        • You can only post a maximum of 50 posts per day.
      </p>
      <h4 className="text-lg font-bold mt-4 text-blue-800">Facebook</h4>
      <p className="text-base ml-4 mb-2">
        • You can publish both photos and videos using this app.
      </p>
      <p className="text-base ml-4 mb-2">
        • The photos can be in JPEG, PNG, and GIF format but must not exceed 4Mb.
      </p>
      <p className="text-base ml-4 mb-2">
        • The videos must not exceed 1Gb.
      </p>
      <h4 className="text-lg font-bold mt-4 text-blue-800">Telegram</h4>
      <p className="text-base ml-4 mb-2">
        • You can post both photos and videos using this app.
      </p>
      <p className="text-base ml-4 mb-2">
        • The Photos must not exceed 10Mb.
      </p>
      <p className="text-base ml-4 mb-2">
        • The Videos must not exceed 50Mb.
      </p>
      <h4 className="text-lg font-bold mt-4 text-blue-800">YouTube</h4>
      <p className="text-base ml-4 mb-2">
        • You can only post videos using this app.
      </p>
      <p className="text-base ml-4 mb-2">
        • There are no restrictions on the format of the video but the size should not exceed 256Gb.
      </p>
      <h2 className="text-2xl font-bold mt-6 text-blue-800">What is Next?</h2>
      <h3 className="text-xl font-bold mt-4 text-blue-800">Palm Socials V2</h3>
      <p className="text-base ml-4 mb-2">
        • More analytics for Telegram.
      </p>
      <p className="text-base ml-4 mb-2">
      • Displaying all the posts of the Telegram profile.
      </p>
      <p className="text-base ml-4 mb-2">
      • Displaying the photos and videos of  Facebook pages instead of Links.
      </p>

      <h3 className="text-xl font-bold mt-4 text-blue-800">Palm Socials V2</h3>

      <p className="text-base ml-4 mb-2">
      • TikTok Profile will be added to the app.
      </p>
      <p className="text-base ml-4 mb-2">
      • Showing TikTok analytics like followers, Likes, Comments, and more.
      </p>
      <p className="text-base ml-4 mb-2">
      • Showing TikTok posts.
      </p>

      <p className="text-base ml-4 mb-2">
      • Posting Videos to TikTok from the app.
      </p>

      <h2 className="text-2xl font-bold mt-6 text-blue-800">Notes</h2>

      <p className="text-base ml-4 mb-2">
      • You can post photos and videos to diffrent social media profiles simultaneously.
      </p>
      <p className="text-base ml-4 mb-2">
      • If you want to post the same photo or video to diffrent social media profiles at diffrent times, please change the name of the file as it is already on the server and will cause an error.
      </p>
      <p className="text-base ml-4 mb-2">
      • You might get an error when uploading a file due to network or other issues. When that happens click the Reload button and try again. Make sure you have an active network connection.
      </p>

      <p className="text-base ml-4 mb-2">
      • The data on the home page might not be displayed if there is a network issue. If that happens try fixing the connection and logging in again.
      </p>

      <p className="text-base ml-4 mb-2">
      • The app will need maintenance atleast once every two month.
      </p>

      <p className="text-base ml-4 mb-2 text-center text-yellow-600">
      Designed And Developed By: Emran Hayredin
      </p>

     


    

     
    </div>

    <Nav/>

    </div>
    
  );
};

export default About;