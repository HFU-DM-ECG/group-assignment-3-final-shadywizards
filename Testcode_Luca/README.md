[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/E5ATIiJe)

# Group assignment 02 - WebXR

## Task

The task is to further develop the application from the first task into an AR or VR application based on the WebXR standard.

There are bonus points if the application is published and you can try it out on a website.

## Rating

The rating will be as follows:

- presentation and idea: 30 %
- WebXR Concept: 40 %
- code quality: 30 %

# Description of our Work

Since the last group assignment we have initially worked on improving on the Scene trying to make use of the feedback. We have made sure to clone the cans and put a system in place to allow the amount of cans to be scalable. We also removed all HDR-textures as well as remade the Can model in a way to contain a lot less polygons which should result in a better performance in the browser.

We took multiple decisions as a group, including to create multiple banners for the Cans to represent 9 different Planets (including dwarf-planet pluto) in the Scene. We decided on having them spread out and move around the sun in a realistic way. Therefore we used formulas based on kepler's Laws of planetary motions. We also included the sizing of the different planets.

Hierarchy wise the Solarsystem is now a group with its Children (Sun + 9 planets). The width of the whole solar system can be set with one variable.

The sun shader was improved according to the feedback od the last group assignement. It now uses layered noise textures and a more performant noise function (simplex noise). To make it appear brighter on the edge and close to the edge, a Fresnel function was added to the fragment shader.

We also added a point light and an ambient light to the Scene to achieve a nicer over all effect.

The WebXR element of the site can be accessed through the AR-Button, which we positioned onto a custom made coverimage.

In XR the user is supposed to be able to navigate around the Scene. The Scene itself does not move with the Player, but it is quite big.

We attempted multiple times to get it to work on our smartphones, including tests on different browsers, operating systems and android versions. But in the end we can only really test it through the WebXR simulation tool in the Browser.
