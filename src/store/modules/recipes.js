const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export default {
  state: [
    {
      title: 'low knead pizza',
      ingredients: [
        {
          name: 'flour',
          quantity: 6,
          unit: 'cups',
        },
        {
          name: 'yeast',
          quantity: 0.75,
          unit: 'teaspoon',
        },
        {
          name: 'salt',
          quantity: 1.5,
          unit: 'teaspoon',
        },
        {
          name: 'milk',
          quantity: 2.75,
          unit: 'cups',
        },
      ],
      preparation: "Whisk dry ingredients together, then pour in milk. Here's the low knead part: mix together and then fold over once or twice (yes, it is very sticky) until it combines to form a nice lump. Cover with plastic wrap (if it is not clingy enough, weight down with a dish towel) and allow to rise about 24 hours. Scrape the dough out onto a lightly floured board and fold dough onto itself a few times. Cover again and allow to rise for 1-2 hours. Divide dough in two on a lightly floured board and roll, press, pull and/or toss into disks. Put a generous layer of cornmeal or flour on your pizza pan or peel before transferring the dough. Top as desired and bake at 450 for 15 to 20 minutes, or until the crust has browned nicely.",
      peopleCount: 1,
      cookTimeInMinutes: 30,
      link: 'https://www.evilmadscientist.com/2007/low-knead-pizza/',
    },
  ],
  getters: {
    recipeList: state => () => state.map(recipe => ({
      title: recipe.title,
      cookTimeInMinutes: recipe.cookTimeInMinutes,
      ingredientsCount: recipe.ingredients.length,
    })),
    recipeByTitle: state => title => deepCopy(state.find(recipe => recipe.title === title)),
  },
  mutations: {
    addRecipe(state, payload) {
      state.push(payload);
    },
    updateRecipe(state, payload) {
      const index = state.findIndex(recipe => recipe.title === payload.originalTitle);
      state[index] = deepCopy(payload.recipe); // eslint-disable-line
    },
  },
  removeRecipe(state, payload) {
    state = state.filter(recipe => recipe.title !== payload.title); // eslint-disable-line
  },
};
