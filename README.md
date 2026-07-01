# Web Development Project 4 - WanderLens

Submitted by: **Beryl Ghany**

This web app allows users to discover random travel destinations from around the world using an external API. Each time the Discover button is clicked, a new destination is displayed with an image and useful information such as the country, region, and destination name. Users can click on displayed attributes to add them to a ban list, preventing future results with those attributes from appearing. The application also stores a history of previously viewed destinations during the current session.

Time spent: **8 hours** spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
- [x] **API call response results appear random to the user**
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
- [x] **Clicking a banned attribute removes it from the ban list immediately**

## Optional Features

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list.
- [x] Users can see a stored history of previously displayed destinations during the current session.

## Additional Features

- [x] Modern responsive UI
- [x] Hover animations for buttons and cards
- [x] Loading indicator while fetching API data
- [x] Error handling for failed API requests
- [x] Clean card layout for destination information
- [x] Ban list updates dynamically without refreshing the page

## Video Walkthrough

Here's a walkthrough of the implemented user stories:

<blockquote class="imgur-embed-pub" lang="en" data-id="a/lcKRxti"  ><a href="//imgur.com/a/lcKRxti">Walkthru mod3</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

<!-- Replace with your GIF -->

<img src="https://imgur.com/a/lcKRxti" alt="Video Walkthrough" />

GIF created with ScreenToGif.

## Notes

One of the biggest challenges during this project was implementing the ban list logic. I had to make sure that banned attributes were excluded from future API responses while still allowing random destinations to appear. Another challenge was keeping the history synchronized with each new API request and ensuring that images always matched the displayed destination information. Debugging asynchronous API requests and state updates also helped strengthen my understanding of React hooks and component state management.

## License

Copyright 2026 Beryl Ghany

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
