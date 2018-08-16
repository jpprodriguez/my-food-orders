export class User {
    constructor(name, fileNumber, type, isVeggie) {
        this.name = name;
        this.fileNumber = fileNumber;
        this.type = type;
        this.isVeggie = isVeggie;
    }
}

export class MenuOption {
    constructor(category, title, description) {
        this.category = category;
        this.title = title;
        this.description = description;
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
