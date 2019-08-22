import {
  parse,
  lastDayOfWeek,
  eachDayOfInterval,
  format,
} from 'date-fns';

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export default {
  state: {
    weekly: [
      {
        breakfast: [],
        lunch: [
          'Low Knead Pizza',
          'Tiramisu',
          'Tomatensuppe',
        ],
        dinner: [],
        date: '2019-07-22',
      },
      {
        breakfast: [],
        lunch: [],
        dinner: [],
        date: '2019-07-23',
      },
      {
        breakfast: [],
        lunch: [],
        dinner: [],
        date: '2019-07-24',
      },
      {
        breakfast: [],
        lunch: [],
        dinner: [],
        date: '2019-07-25',
      },
      {
        breakfast: [],
        lunch: [],
        dinner: [],
        date: '2019-07-26',
      },
      {
        breakfast: [],
        lunch: [],
        dinner: [],
        date: '2019-07-27',
      },
      {
        breakfast: [],
        lunch: [],
        dinner: [],
        date: '2019-07-28',
      },
    ],
  },
  getters: {
    weekData: state => (weekYear) => {
      const firstDayOfTheWeek = parse(weekYear, "R'-W'I", new Date());

      return eachDayOfInterval({
        start: firstDayOfTheWeek,
        end: lastDayOfWeek(firstDayOfTheWeek),
      }).map(day => state.weekly.find(item => item.date === format(day, 'yyyy-MM-dd')) || {
        breakfast: [],
        lunch: [],
        dinner: [],
        date: '2019-07-28',
      });
    },
    dayData: state => day => state.weekly.find(item => item.date === day) || {
      breakfast: [],
      lunch: [],
      dinner: [],
      date: day,
    },
  },
  mutations: {
    addToShoppingList(state, payload) {
      state.shoppingList = state.shoppingList.concat(payload); // eslint-disable-line
    },
    clearShoppingList(state) {
      state.shoppingList = []; // eslint-disable-line
    },
    updateShoppingList(state, payload) {
      state.shoppingList = deepCopy(payload); // eslint-disable-line
    },
  },
};
