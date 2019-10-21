# Testing React context API

The goal of this repo is to test the usage of React context API, see what is possible to achieve and what are the differencies and similarities with Redux.

## Get started 

This repo has been made with React create app see the documentation to getting started : 
https://github.com/facebook/create-react-app#create-react-app--

# The Context System

### Props system and Context System

With Props we get date _from_ a parent component to a *direct* child

With the Context API we get data from a parent component to *any* nested child component

### App with context

As an example of the context API usage this repo will be about a small app handling different language.
The user should be able to select a language and the state of the app will be modified based on the user choice.
The context API will be use to store the language choice and set the component to use the language choosen.

### Architecture

 - A global *App* component with a language selector
 - A *UserCreate* component containing a containing the next two components
 - A *Filed* component with an input and a label
 - A *Button* component containing a submit button

With a Props system we will be using a descending architecture with direct relation between component where the selected langage is passed by props to other component.
In a more complex application we could think that passing the language choosen from the top to deep nested component using the props system is not a good solution, so in this project example :
 - The *App* component will communicate the choosen language to the *Field* which is nested into the *UserCreate* component (no direct relation between *App* and *Field*) 