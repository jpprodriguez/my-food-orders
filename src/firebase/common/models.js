import firebase from "firebase";
import { getAllMenusRoute } from "./routes";

export class User {
    constructor(name, fileNumber, type, isVeggie) {
        this.name = name;
        this.fileNumber = fileNumber;
        this.type = type;
        this.isVeggie = isVeggie;
    }
}

export class MenuOption {
    constructor(category, title, description, options) {
        this.category = category;
        this.title = title;
        this.description = description;
        this.options = options;
    }
}

export class MenuDetail {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

export class Order {
    constructor(
        mondayOption,
        tuesdayOption,
        wednesdayOption,
        thursdayOption,
        fridayOption
    ) {
        this.mondayOption = mondayOption;
        this.tuesdayOption = tuesdayOption;
        this.wednesdayOption = wednesdayOption;
        this.thursdayOption = thursdayOption;
        this.fridayOption = fridayOption;
    }
}

export const menuCategories = Object.freeze({
    menu: "menu",
    pasta: "pasta",
    sandwich: "sandwich",
    salad: "salad",
    vegan: "vegan"
});

export const days = Object.freeze({
    monday: "monday",
    tuesday: "tuesday",
    wednesday: "wednesday",
    thursday: "thursday",
    friday: "friday"
});

// export const initCurrentMenus = () => {
//     let currentMenus = {};
//     for(let day of Object.keys(days)) {
//         currentMenus[days[day]] = {};
//         for(let category of Object.keys(menuCategories)) {
//             currentMenus[days[day]][[menuCategories[category]]] = "";
//         }
//     }
//     return currentMenus;
// };

// export const initMenus = (refs) => {
//     let ref = firebase.database().ref().child('all_menus/menu');
//     ref.push().set(new MenuOption(menuCategories.menu,
//         'Brochette de pollo',
//         'Brochette de pollo y vegetales marinada, puré de batata.',
//         new MenuDetail('con verdes', false)));
//
//     ref.push().set(new MenuOption(menuCategories.menu,
//         'Guiso de lentejas',
//         'Guiso de lentejas calentito y riquito',
//         new MenuDetail('extra picante', true)));
//
//      ref = firebase.database().ref().child('all_menus/sandwich');
//     ref.push().set(new MenuOption(menuCategories.sandwich,
//         'Chicken Burger',
//         'Chicken burger, lechuga, tomate y queso con papas.',
//         new MenuDetail('sin papas', true)));
//
//      ref = firebase.database().ref().child('all_menus/salad');
//
//     ref.push().set(new MenuOption(menuCategories.salad,
//         'Cesar',
//         'Queso, verdes, cherrys, pollo, croutons y aderezo',
//         new MenuDetail('sin croutons', false)));
//
//      ref = firebase.database().ref().child('all_menus/pasta');
//
//     ref.push().set(new MenuOption(menuCategories.pasta,
//         'Pasta',
//         'Una rica y sabrosa pastita',
//         new MenuDetail('con crema', true)));
// };
