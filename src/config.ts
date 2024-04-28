// This could be an enum if you like. An enum is a weird beast in typescript, so I tend to want to use objects instead
export const Directions = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
} as const; // <-- this tells typescript that this is completely immutable

// Just a type reflecting the values contained in the object I created earlier. Makes for nice typings in the code
type ObjectValues<T> = T[keyof T]; // This basicly tells typescript to list all the keys of the generic type
export type Directions = ObjectValues<typeof Directions>; // This results in a type like this : 0 | 1 | 2 | 3

// With the above code, we can use Directions much like we would use an enum
// ex:
//    let direction: Directions;
//    direction = Directions.DOWN;
//    if (direction === Directions.UP)

// You can also do the following though:
//
//    let direction = 0 as Directions;
//    direction = 2;
//    if (direction === 3)
//
// Which is not ideal. But it works.

// Typescript would raise an error here though:
//
//    let direction: Directions = 5; <-- 5 is not a value contained in the type Directions
//    direction = 10; <-- 10 is not a value contained in the type Directions
//    if (direction === -1) <-- -1 is not a value contained in the type Directions
//
// Proving that the resulting type is good enough.

// You can safely use an enum instead of the technique used above. Just know an enum with integer elements is weird
// when transpiled in ES5. An enum like this:
//
// enum TestEnum {
//   Element1,
//   Element2
// }
//
// Will be transformed like this:
//
//    { '0': 'Element1', '1': 'Element2', Element1: 0, Element2: 1 }
//
// Which, you have to admit, is weird. It works, but it's weird.
