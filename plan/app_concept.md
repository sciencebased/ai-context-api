## Context
Many developers need a way to be up to date in information for their models, like characteristics of latests models, where to apply them based on the tone, censorship, code capacity, price and so on.
This is very important because when you design ai agents architectures you need to have criteria over the model selection for cost strategy, achievement, speed, and other KPIs
The goal is to have up to date information about the models, its costs, its uses cases, its speed, and so on

## Role
Act as full stack developer expert

## Task
- Create an api where / (root) be a landing that summarizes this application, the landing is cyberpunk style, developer oriented visuals and aestetic, futuristic with a pretty cool hero with animation given this concept of landing.
- This landing has its own documentation section where you desribe the endpoints, create interesting and useful endpoints like:
    - models-uses-cases, where you retrieve a summary of most principals models and its advantages
    - model-pricing, where you retrieve the pricing
    - model-benchmark, where you retrieve the model reasoning benchmarck
    - historic-usage-cases, where you have a compilation of enterprise and startup usage of the models with real world cases

And so on, feel free to search relevant endpoints

- Create a very cool readme with the explanaition of the application
- Create an upload the skill needed for the model can fetch this page and consider the info to decision making like ai agent infra model selection

## Format
Generate the app in react typescript with tanstack and tailwind, by the moment mock the database with the data needed to render the info that the api is going to retrieve 