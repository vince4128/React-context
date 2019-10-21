# Testing React context API

The goal of this repo is to test the usage of React context API, see what is possible to achieve and what are the differencies and similarities with Redux.
For that we could set two objectives :

 - share data between component with no direct relation
 - based on that highlight the pros cons and differences with Redux 

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
The context API will be use to store the language choice and set the component to use the choosen language.

In addition, to show how to handle a component pulling data from multiple contexts we will add a theme selector to change the color of the button.

# Architecture

### Components of the app

 - A global *App* component with a language and a theme selector
 - A *UserCreate* component rendering the next two components (*Field* and *Button*)
 - A *Field* component with an input and a label
 - A *Button* component containing a submit button

With a Props system we will be using a descending architecture with direct relation between component where the selected langage is passed by props to other component.
In a more complex application we could think that passing the language choosen from the top to a deep nested component using the props system is not a good solution, so in this project example :
 - The *App* component will communicate the choosen language to the *Button* component which is nested into the *UserCreate* component (no direct relation between *App* and *Button*)

# Getting Data Out of Context

### Context Object

To pass data between the *App* component and the *Button* component we will use a **Context Object**.
The **Context Object** will be like a *pipe* to pass data between our non direct-relationed component

This way the *Button* component will **consume** data from the *App* component

### How we get data into the Context Object and how consume them ?

The first thing to ask is, how we pass data to the Context Object ? And how our component could consume them ?

There is two way to produce and consume the data from a **Context Object** :

two ways to produce the data :

 - A default value (when context is created)
 - Using a **Provider Object** component, the provider will push data into the **Context Object**

And two ways to **use** that data :

 - Using the syntax **this.context** to get value from the **Context Object**
 - Using a **consumer** component to get the value passed by a **Provider Object**

 ### Creating the Context Object

 - Create a new "contexts" folder
 - Inside this folder create a _.js_ file, example: _LanguageContext.js_

So inside our _LanguageContext.js_ we simply import React and use the ```React.createContext();``` method
We can set our **Context Object** with a default value like this : ```React.createContext('english');```

### Connect the Context Object

To connect the **Connect Object** we have to import the context like this : ```import LanguageContext from '../contexts/LanguageContext'``` in the component where we want to consume the data.

# Accessing the data inside the Context Object

## Using the Context Type

### Context Type declaration

First we will use the **this.context** method to get the default value of the **Context Object** into our Button component.

The **Context Type** essentially link a component to a **Context Object** and allow us to use the syntax ```this.context``` like this : ```static contextType = LanguageContext```
Be sure to use this exact syntax ```static contextType =``` or it will not be working.

### Consuming the Context Value with **Context Type**

If your **Context Type** is defined, you can access to the **Context Object** by using ```this.context```

If you declare a default value into your **Context Object** like this ```React.createContext('english')``` console.log ```this.context``` will return this default value ```english```

The value could be any type (Object, Array, etc)

## Using a Provider

### The context Provider

With the previous step, we can now access the data inside our **Context Object**, but how can we set the value of this data ?

The default value manually set into the **Context Object** is immutable and we can just access it.
To be able to set the value of the data into the **Context Object** we have to create a **Context Provider** which will act as a source of truth for the values of the data

In our example we want to share data between the *App* and the *Button* component and being able to update the value of the **Context Object**, in order to achieve this we will create a **Context Provider** 

To achieve this in order you have to :

 - import the **Context Object** in the 'top' component in our case the *App* component with the import statement ```import LanguageContext from '../contexts/LanguageContext'```
 - Wrap the child component *UserCreate* containing the *Field* and *Button* component like this : ```<LanguageContext.Provider><UserCreate/></LanguageContext.Provider>```

There is an another step !

 - add to the provider a value propertie, this value propertie is the data you want to share with other component, in our case it's a property of the *state* object of the *App* Component
 we do this like that : ```<LanguageContext.Provider value={this.state.language}>```

Using a value from the state of a component give us a way to set this value.

Still it could be a good practice to set a default value in the context

## Using a consumer

### Accessing Data with consumers

In the same way we've created a **Context Provider** component to access the data into the **Context Object** there is a component to read the data : the **Consumer**
It allow us to not use the Context Type decorator.

The syntax to use a **Context Consumer** is : ```<LanguageContext.Consumer>{(value) => {}}</LanguageContext.Consumer>```
Inside the consumer we always have to use a function, and only inside this function we will use the value coming from the **Context Provider**

Of course for the clarity of the code this function could be deported to a render helper method

### Why using a consumer and note the Context Type approch ?

To answer this question we have to imagine the case where we are **Pulling from multiple contexts**
using the syntax ```this.context```is fine when we work with one context, but couldn't handle the case where we have to use multiple contexts

To demonstrate this we had a Color Context to the project allowing us to define a theme for the buttons.

To achieve this we create a second context and access it inside the *Button* component where we already access the Language context

# Warning

The documentation is not really explicit on one point :

**Each separate use of LanguageContext.Provider creates a new separate 'pipe' of information every single time we use it !**

So if in the same file we have : ```<LanguageContext.Provider value={this.state.language}><UserCreate/></LanguageContext.Provider>```
and after a second Provider with a hard coded value : ```<LanguageContext.Provider value='english'><UserCreate/></LanguageContext.Provider>``` 

The second *UserCreate* component will always have the 'english' value, both Provider aren't connected in any way