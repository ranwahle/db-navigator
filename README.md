# DbNavigator

This project is an assignment of a tree component implementation 

## Framework and library used
    1. Angular
    2. Fontawesone  (solly for icons)

## Compoenents
    1. DB-Navigator - a dumb component, gets its data from its host, emit events whenever node without its children loaded is clicked.  
    This component gets maxItems and dbData as inputs, while it renders no more than max items, and keep the others in its memory. 
    
    2. Tree node component - a dumb component, contains node html and components of its own type, for its children. It gets a node as an input, alo

## Known issues

    1. The tree doesn't have full support for maximun items, it makes sure no more than max items will be presented, while the others are in memory, however it may present less than maximum although it has some more in memory. A further calculation needs to be made for persenting part of an item's children. 

    2. There may be some slowness while getting the data, 


## Run the application

```bash
$ npm install
```

```bash
$ npm start
```

Go to http://localhost:4200

