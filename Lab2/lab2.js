//--------------- об'єкт car1 ---------------
let car1 = new Object();
car1.color = "red";
car1.maxSpeed = 200;
car1.driver = new Object();
car1.driver.name = "Гринів Мар'яна";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";
car1.tuning = true;
car1["number of accidents"] = 0;

//--------------- об'єкт car2 ---------------
let car2 = {
  color: "yellow",
  maxSpeed: 230,
  driver: {
    name: "Гринів Мар'яна",
    category: "B",
    "personal limitations": null,
  },
  tuning: false,
  "number of accidents": 2,
};

//--------------- методи drive ---------------
car1.drive = function () {
  console.log("I am not driving at night");
};
car1.drive();

car2.drive = function () {
  console.log("I can drive anytime");
};
car2.drive();

//--------------- конструктор Truck ---------------
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;
  this.trip = function () {
    if (!this.driver) {
      console.log("No driver assigned");
      return;
    }
    let message = "Driver " + this.driver.name + " ";

    if (this.driver.nightDriving) {
      message += "drives at night ";
    } else {
      message += "does not drive at night ";
    }

    message += "and has " + this.driver.experience + " years of experience";

    console.log(message);
  };
}

//--------------- статичний метод ---------------
Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience,
  };
};

let truck1 = new Truck("green", 3000, 200, "BMW", "X5");
let truck2 = new Truck("white", 5000, 90, "Volvo", "FH");

truck1.AssignDriver("Гринів Мар'яна", true, 5);
truck2.AssignDriver("Негринів Немар'яна", false, 10);

truck1.trip();
truck2.trip();

//--------------- клас Square ---------------
class Square {
  constructor(a) {
    this.a = a;
  }

  static help() {
    console.log(
      "A square is a quadrilateral with four equal sides and four right angles (90 degrees).",
    );
  }

  length() {
    console.log("Perimeter of square: " + 4 * this.a);
  }

  square() {
    console.log("Area of square: " + this.a ** 2);
  }

  info() {
    console.log("Square characteristics:");

    console.log(`Sides:
a1 = ${this.a}
a2 = ${this.a}
a3 = ${this.a}
a4 = ${this.a}`);

    console.log("Angles:");
    console.log("90° 90° 90° 90°");

    this.length();
    this.square();
  }
}

//--------------- клас Rectangle ---------------
class Rectangle extends Square {
  constructor(a, b) {
    super(a);
    this.b = b;
  }

  static help() {
    console.log(
      "Rectangle is a quadrilateral with opposite sides equal and all angles 90 degrees.",
    );
  }

  length() {
    console.log("Perimeter of rectangle: " + (2 * this.a + 2 * this.b));
  }

  square() {
    console.log("Area of rectangle: " + this.a * this.b);
  }

  info() {
    console.log("Rectangle characteristics:");

    console.log(`Sides:
a1 = ${this.a}
a2 = ${this.b}
a3 = ${this.a}
a4 = ${this.b}`);

    console.log("Angles:");
    console.log("90° 90° 90° 90°");

    this.length();
    this.square();
  }

  get a() {
    return this._a;
  }

  set a(newA) {
    this._a = newA;
  }

  get b() {
    return this._b;
  }

  set b(newB) {
    this._b = newB;
  }
}

//--------------- клас Rhombus ---------------
class Rhombus extends Square {
  constructor(a, alpha, beta) {
    super(a);
    this.alpha = alpha;
    this.beta = beta;
  }

  static help() {
    console.log(
      "Rhombus is a quadrilateral with four equal sides, opposite angles are equal.",
    );
  }

  length() {
    console.log("Perimeter of rhombus: " + 4 * this.a);
  }

  square() {
    let rad = (this.beta * Math.PI) / 180;
    console.log("Area of rhombus: " + this.a ** 2 * Math.sin(rad));
  }

  info() {
    console.log("Rhombus characteristics:");

    console.log(`Sides:
a1 = ${this.a}
a2 = ${this.a}
a3 = ${this.a}
a4 = ${this.a}`);

    console.log("Angles:");
    console.log(`${this.alpha}° ${this.beta}° ${this.alpha}° ${this.beta}°`);

    this.length();
    this.square();
  }
}

//--------------- клас Parallelogram ---------------
class Parallelogram extends Rhombus {
  constructor(a, b, alpha, beta) {
    super(a, alpha, beta);
    this.b = b;
  }

  static help() {
    console.log(
      "Parallelogram is a quadrilateral with opposite sides parallel and equal, opposite angles are equal.",
    );
  }

  length() {
    console.log("Perimeter of parallelogram: " + (2 * this.a + 2 * this.b));
  }

  square() {
    let rad = (this.beta * Math.PI) / 180;
    console.log("Area of parallelogram: " + this.a * this.b * Math.sin(rad));
  }

  info() {
    console.log("Parallelogram characteristics:");

    console.log(`Sides:
a1 = ${this.a}
a2 = ${this.b}
a3 = ${this.a}
a4 = ${this.b}`);

    console.log("Angles:");
    console.log(`${this.alpha}° ${this.beta}° ${this.alpha}° ${this.beta}°`);

    this.length();
    this.square();
  }
}

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

let square = new Square(3);
square.info();

let rectangle = new Rectangle(4, 5);
rectangle.info();

let rhombus = new Rhombus(5, 120, 60);
rhombus.info();

let parallelogram = new Parallelogram(6, 4, 120, 60);
parallelogram.info();

//--------------- функція Triangular ---------------
function Triangular(a = 3, b = 4, c = 5) {
  return { a, b, c };
}
let t1 = Triangular(5, 6, 7);
let t2 = Triangular(8, 9, 10);
let t3 = Triangular();

let { a: a1, b: b1, c: c1 } = t1;
let { a: a2, b: b2, c: c2 } = t2;
let { a: a3, b: b3, c: c3 } = t3;

console.log(a1, b1, c1);
console.log(a2, b2, c2);
console.log(a3, b3, c3);
//--------------- функція PiMultiplier ---------------
function PiMultiplier(num) {
  return function () {
    return Math.PI * num;
  };
}
let func1 = PiMultiplier(2);
let func2 = PiMultiplier(2 / 3);
let func3 = PiMultiplier(1 / 2);

console.log(func1());
console.log(func2());
console.log(func3());
//--------------- функція Painter ---------------
function Painter(color) {
  return function (obj) {
    if ("type" in obj) {
      console.log(`${color} ${obj.type}`);
    } else {
      console.log("No 'type' property occurred!");
    }
  };
}
let PaintBlue = Painter("blue");
let PaintRed = Painter("red");
let PaintYellow = Painter("yellow");
let obj1 = {
  maxSpeed: 280,
  type: "Sportcar",
  color: "magenta",
};
let obj2 = {
  type: "Truck",
  "avg speed": 90,
  "load capacity": 2400,
};
let obj3 = {
  maxSpeed: 180,
  color: "purple",
  isCar: true,
};

PaintBlue(obj1);
PaintBlue(obj2);
PaintBlue(obj3);

PaintRed(obj1);
PaintRed(obj2);
PaintRed(obj3);

PaintYellow(obj1);
PaintYellow(obj2);
PaintYellow(obj3);

