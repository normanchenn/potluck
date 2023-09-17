## Inspiration
One late night, standing before a nearly bare refrigerator except for some noodles, an idea sparked: what if there was a way to connect with others in a similar predicament and pool resources to create a culinary masterpiece together? From this simple yet revolutionary idea, "_potluck_" was born, bridging the gap between solitary meals and delightful dining experiences shared with new friends.

## What it does
_potluck_ is an innovative app designed to revolutionize the way we approach cooking. Users can simply take a picture of the contents of their fridge, and through the power of a fine-tuned YOLOv8 object classification model, the app identifies all available ingredients and populates them into a database.

When users look for someone to cook with, _potluck_ kicks into action, sifting through its user base to find other potential cook-mates in their vicinity. Through a Tinder-style interface, they can accept or reject cooking connections based on available ingredients and possible recipes generated through NLP techniques.

## How we built it
_potluck_ stands tall on the robust shoulders of several cutting-edge technologies:
- YOLOv8: Leveraged for object classification to identify ingredients from pictures swiftly and accurately.
- CockroachDB: Ensures a resilient and consistent database.
- Prisma: Facilitates easy database management.
- Python & FastAPI: Forms the backend microservice that calls the YOLOv8 model and sends the detected ingredients to the database.
- tRPC: Enables end-to-end typesafe APIs, enhancing the performance of _potluck_.
- Cohere: Powers the NLP feature that aids in generating possible recipes.
- Next.js: Builds the frontend, offering a fast and simple user interface.

## Challenges we ran into
Developing a streamlined object classification process posed quite a challenge. The YOLOv8 model required meticulous training and fine-tuning to accurately identify a wide variety of food items from different angles and lighting conditions. Integrating several technologies into a seamless, user-friendly experience was another challenging task, demanding synergized efforts and expertise in various tools and platforms.

## Accomplishments that we're proud of
- Crafting a user-friendly app that transforms solitary cooking into a social experience.
- Successfully integrating cutting-edge technologies to build a multifaceted yet seamless application.
- Developing an object classification model with high accuracy and reliability.

## What we learned
During our development journey, the team delved deeper into the workings of object detection, familiarizing ourselves with the intricacies of YOLOv8. We honed our skills in backend/microservice development, learning to integrate multiple technologies harmoniously to create a solution that is more than the sum of its parts.

## What's next for _potluck_
Looking forward, we envision augmenting _potluck_ with features such as:
- A rating system for user experiences and recipes.
- Integration with social media platforms for a richer, integrated social experience.
- Enhanced recipe recommendations using machine learning to personalize suggestions based on user preferences and dietary restrictions.
We aim to make _potluck_ not just an app, but a community of food enthusiasts where passion for cooking meets collaboration and innovation!
