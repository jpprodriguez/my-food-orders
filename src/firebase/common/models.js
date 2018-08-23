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
    constructor(menuId, menuDetails) {
        this.id = menuId;
        this.options = menuDetails;
    }
}

export const menuCategories = Object.freeze({
    menu: "menu",
    pasta: "pasta",
    sandwich: "sandwich",
    salad: "salad",
    vegan: "vegan"
});

export const userTypes = Object.freeze({
    provider: "provider",
    customer: "customer",
    admin: "admin"
});

export const days = Object.freeze([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
]);

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

export const initMenus = () => {
    let ref = firebase
        .database()
        .ref()
        .child("all_menus");
    ref.push().set(
        new MenuOption(
            menuCategories.menu,
            "Brochette de pollo",
            "Brochette de pollo y vegetales marinada, puré de batata.",
            ["con verdes", "con salsa"]
        )
    );

    ref.push().set(
        new MenuOption(
            menuCategories.menu,
            "Guiso de lentejas",
            "Guiso de lentejas calentito y riquito",
            ["extra picante"]
        )
    );

    ref.push().set(
        new MenuOption(
            menuCategories.sandwich,
            "Chicken Burger",
            "Chicken burger, lechuga, tomate y queso con papas.",
            ["sin papas"]
        )
    );

    ref.push().set(
        new MenuOption(
            menuCategories.salad,
            "Cesar",
            "Queso, verdes, cherrys, pollo, croutons y aderezo",
            ["sin croutons"]
        )
    );

    ref.push().set(
        new MenuOption(
            menuCategories.pasta,
            "Pasta",
            "Una rica y sabrosa pastita",
            ["con crema"]
        )
    );
};
