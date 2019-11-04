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

Avec l'API context il est possible de partager des données entre un composant parent et _nested component_ peu importe le nombre de composants entre eux.

### App avec Context

Pour cet exemple d'utilisation de l'API context le code de ce repo est une toute petite application qui permet à un utilisateur de choisir un langage et un thème pour les boutons (inspiré d'une formation de Stepehn Grider).

L'API context est utilisé pour partager le choix de langue et de thème de l'utilisateur et les partager entre composants.

Le but est également de montrer comment un composant peut consommer des données de plusieurs _contexts_

# Architecture

### Composants de l'applicationxs

 - Un composant global *App* qui permet de sélectionner une langue et un thème
 - Un composant *UserCreate* qui rend les deux composants suivant (et fait que ceux-ci ne sont pas enfant direct de App)
 - Un composant *Field* avec un input et un label
 - Un composant *Button* qui consommera les données (texte fonction de la langue et couleur du bouton fonction du theme)

Avec un système de props nous utiliserions des relation direct entre les composants, où le choix de langage et de thème serait passé en props depuis le composant parent au composant enfant direct.

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

Pour connecter le **Connect Object**, dans notre composant Button où nous souhaitons consommer les données nous devons importer le *context*, et ce de la manière suivante : ```import LanguageContext from '../contexts/LanguageContext'```.

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

### declaration Context Type

L'une des options est d'utiliser la méthode **this.context** pour récupérer la valeure déclarée par défaut dans **Context Object** dans notre composant _Button_

Le **Context Type** crée un lien entre un composant et un **Context Object** et nous permet d'utiliser la syntaxe ```this.context``` de la manière suivante : ```static contextType = LanguageContext``` il faut s'assurrer de bien utiliser la syntaxe suivante ```static contextType =``` où cela ne fonctionnera pas.

Ainsi si nous déclarons une valeur par défaut dans notre **Context Object** de la manière suivante ```React.createContext('english')``` un console.log de ```this.context``` retournera ```english``` (la valeur peut être de tout type)

## Using a Provider

### The context Provider

L'étape vue précédemment nous permet d'accéder aux données dans notre **Context Object**, mais comment _setter_ celles-ci ?

La valeur par défaut que nous avons définie manuellement dans le **Context Object** est immutable et nous pouvons juste accéder à celle-ci.
Pour pouvoir _setter_ celle-ci dans le **Context Object** il faut créer un **Context Provider** qui va agir comme source de vérité pour les valeurs des données

Dans notre exemple nous souhaitons échanger des données entre les composants *App* et *Button*, et être capable de mettre à jour les valeurs dans le **Context Object**.

Pour cela nous devons créer un **Context Provider**

Dans l'ordre, nous devons :

 - Importer le **Context Object** dans le composant le plus 'haut' dans notre cas *App* avec l'import suivant ```import LanguageContext from '../contexts/LanguageContext'```
 - Décorer le composant enfant *UserCreate* contenant le composant *Button* comme cela : ```<LanguageContext.Provider><UserCreate/></LanguageContext.Provider>```

Il reste une étape :

 - ajouter au provider une propriété 'value', cette propriété est la donnée que vous souhaitez partager avec d'autres comoosants, dans notre cas c'est une propriété de notre objet *state* de notre composant *App*, de la manière suivante : ```<LanguageContext.Provider value={this.state.language}>```

Utiliser une valeur du state object nous permet de mettre à jour cette valeur.

Cela n'empêche pas de déclarer manuellement une valeure par défaut dans le **Context Object** c'est même une bonne pratique.

## Utiliser un consumer

### Accéder aux données avec un consumer

De la même manière que nous avons crée un composant **Context Provider** pour accéder aux données à l'intérieur du **Context Object** il existe un composant pour lire les données : le **Consumer**, cela nous permet de ne pas utiliser la syntaxe **Context Type** vue prédédemment.

La syntaxe à utiliser pour utiliser le **Context Consumer** est la suivante : ```<LanguageContext.Consumer>{(value) => {}}</LanguageContext.Consumer>```

à l'intérieur du consumer il faut toujours utiliser une fonction, et c'est seulement dans cette fonction que nous pourrons utiliser les données venant du **Context Provider**

Bien sûr pour maintenir un minimum de lisibilité au niveau du code il est conseillé d'utiliser des methods helper

### Pourquoi utliser un consumer et ne pas utiliser la syntaxe **Consumer Type**

Pour répondre à cette question nous allons ajouter une notion de thème à notre exemple, le user pourra désormais sélectionner une langue mais également un thème (qui modifiera la couleur du bouton youhou! via un nouveau **context**)

Cela va nous obliger a récupérer des données *depuis plusieurs* **contexts**
Utiliser la syntaxe ```this.context``` est ok lorsque l'on ne travail qu'avec un context, mais ne permet pas de gérer les cas où l'on utilise plusieurs contexts

# Attention

La documentation de React Context n'est pas explicite sur un point !

**Chaque utilisation d'un context via un provider (par exemple chaque utilisation de LangugageContext.Provider) crée un nouveau 'pipe' d'information**

Dis très très maladroitement : ce n'est pas un singleton...

Donc si dans un fichier on a : ```<LanguageContext.Provider value={this.state.language}><UserCreate/></LanguageContext.Provider>```
et dans un second temps on utilise un Provider avec une valuer manuellement définie : ```<LanguageContext.Provider value='english'><UserCreate/></LanguageContext.Provider>``` 

La second composant *UserCreate* aura toujours la valeure 'english' car :

**Les deux providers ne sont en aucun cas connectés !!!**