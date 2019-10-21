# Test de l'API Context de React

Le but de ce repo est de tester l'utilisation de l'API context de React de l'utiliser au travers d'un exemple simple, nous pouvons partir sur 2 objectifs :

 - partager des données entre des composants sans relation direct (donc pas de props)
 - à partir de cet exemple, dégager les défauts et avantages de Context API

 Puis dans un second temps essayer de dégager des scénarios d'usages et de voir les différences/similitudes avec Redux 

## Getting started 

Ce repo utilise Create React App dont voici la documentation : 
https://github.com/facebook/create-react-app#create-react-app--

# Le système de Context

### Props system vs Context System

Avec le système de props il est possible de passer des données d'un composant parent a un composant enfant direct

With the Context API we get data from a parent component to *any* nested child component
Avec l'API context il est possible de partager des données entre un composant parent et _nested component_ peu importe le nombre de composants entre eux.

### App with context

Pour cet exemple d'utilisation de l'API context le code de ce repo est une toute petite application qui permet à un utilisateur de choisir un langage et un thème pour les boutons.

L'API context est utilisé pour partager le choix de langue et de thème de l'utilisateur et les partager entre composants.

Le but est également de montrer comment un composant peut consommer des données de plusieurs _contexts_

# Architecture

### Composants de l'applicationxs

 - Un composant global *App* qui permet de sélectionner une langue et un thème
 - Un composant *UserCreate* qui rend les deux composants suivant (et fait que ceux-ci ne sont pas enfant direct de App)
 - Un composant *Field* avec un input et un label
 - Un composant *Button* qui consommera les données (texte fonction de la langue et couleur du bouton fonction du theme)

Avec un système de props nous utiliserions des relation direct entre les composants, ou le choix de langage et de thème serait passer en props depuis le composant parent au composant enfant direct.

Dans le cas d'une application plus complexe nous pouvons penser que créer une chaîne où l'info redescend de parent vers enfant sur plusieurs niveau est une mauvaise idée.

Nous allons donc utiliser Context API pour partager des infos entre le composant *App* et le composant *Button* séparé l'un de l'autre par le composant *UserCreate*

# Consommer les Data depuis un Context

### Context Object

Pour passer les data depuis le composant *App* vers le composant *Button* nous allons créer un **Context Object**
Le **Context Object** sera comme un "tuyau" par lequel vont transiter nos données entre deux composant n'ayant pas de relation directe

### Créer le Context Object

 - Créer un nouveau répertoire, dans notre example le répertoire "contexts"
 - Dans ce répertoire créez un fichier _.js_ dans notre example : _LanguageContext.js_

Á l'intérieur de _LanguageContext.js_ nous importons tout simplement React et la méthode ```React.createContext();```

### Connecter le Context Object

Pour connecter le **Connect Object** nous devons dans notre composant Button où nous souhaitons consommer les données, nous devons importer le *context* de la manière suivante : ```import LanguageContext from '../contexts/LanguageContext'```.

### Comment produire des données dans le Context Object et comment consommer celles-ci ?

Il y deux manière de produire des données dans un **Context Object** et également deux manière de les consommer :

Produire les données :

 - Insérer une/des valeurs par défaut à la création du **Context Object**
 - Utiliser un composant **Provider Object**, le provider se charge d'insérer les données dans le **Context Object**

Et deux manières de consommer les données :

 - En utillisant la syntaxe **this.context**
 - En utilisant un composant **consumer**

## Produire des données dans le Context Object

### déclarer une valeur par défaut

La première méthode (pas forcément utile) est de déclarer une valeur par défaut, 
Il est possible d'assigner une valeur par défaut à la main à la création de votre Context, de la manière suivante : ```React.createContext('english');```

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