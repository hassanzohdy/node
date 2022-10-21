# Reinforcements

`Reinforcements` is a node js package written in `Typescript` to give a massive support for variant data like `Strings`, `Arrays`, `Objects` ... and so on.

## Table Of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Working with objects](#working0with-objects)
- [Generating Random Values](#generating-random-values)

## Installation

`yarn add @mongez/reinforcements`

or using `npm`

`npm i @mongez/reinforcements`

## Usage

The following list illustrates what's included in this package.

- `Obj` object/functions.
- `Random` object.
- `Str` object/functions.
- Other utilities.

## Working with objects

The following list illustrates all available object utilities, which are wrapped in `Obj` object.

- `objGet` or `Obj.get`
- `objSet` or `Obj.set`
- `objMerge` or `Obj.merge`
- `objClone` or `Obj.clone`
- `objSort` or `Obj.sort`
- `objOnly` or `Obj.only`
- `objExcept` or `Obj.except`
- `objFlatten` or `Obj.flatten`

### Getting value from object

Using `Obj.get(object, key, defaultValue)` will allow us to get a value based on the given key.

```js
import { Obj } from "@mongez/reinforcements";

let user = {
  id: 1,
  name: {
    first: "Hasan",
    last: "Zohdy",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

Obj.get(user, "id"); // 1
Obj.get(user, "name"); // {first: 'Hasan', last: 'Zohdy'}
Obj.get(user, "name.first"); // Hasan
Obj.get(user, "address.country"); // Egypt
Obj.get(user, "address.building.number"); // 12
Obj.get(user, "address.building.floor.number"); // 3
```

As we can see in the previous example, we can get values from objects using **dot.notation.syntax**.

If the key is missing in the object, we may return default value instead.

```js
Obj.get(user, "email", "no-email"); // no-email
```

### Setting value in object

This works exactly but `Obj.set(object, key, value)` will set the value instead of getting it.

```js
import { Obj } from "@mongez/reinforcements";

let user = {
  id: 1,
  name: {
    first: "Hasan",
    last: "Zohdy",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

Obj.set(user, "email", "hassanzohdy@gmail.com");
Obj.set(user, "address.building.floor.apartment", 36);
Obj.set(user, "job.title", "Software Engineer");
```

In the previous example, we've three different cases, first case which would not be used with `Obj.set` which is setting one level key to the given object `user`, in this case we added `email` key.

In the second scenario, we added a new nested key in `address.building.floor` object, which is `apartment`, this would be a nice case to use `Obj.set`.

The last scenario, we don't have `job` key, the function will create `job` key then set `job.title` inside it.

The final user object will be:

```json
{
  "id": 1,
  "email": "hassanzohdy@gmail.com",
  "job": {
    "title": "Software Engineer"
  },
  "name": {
    "first": "Hasan",
    "last": "Zohdy"
  },
  "address": {
    "country": "Egypt",
    "building": {
      "number": 12,
      "floor": {
        "number": 3,
        "apartment": 36
      }
    }
  }
}
```

### Merging objects deeply

Another good feature from `Obj` object is to merge objects deeply.

You may use `Obj.merge` or import `objMerge` directly from the package.

```js
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
};

const userJob = {
  job: {
    title: "Software Engineer",
    level: "Senior",
  },
};

const userWithJob = Obj.merge(user, userJob);
```

Final output:

```json
{
  "id": 1,
  "name": "Hasan Zohdy",
  "job": {
    "title": "Software Engineer",
    "level": "Senior"
  }
}
```

But why not simply using the following syntax?

```js
const user = {
  id: 1,
  name: "Hasan Zohdy",
};

const userJob = {
  job: {
    title: "Software Engineer",
    level: "Senior",
  },
};

const userWithJob = { ...user, ...userJob };
// OR
const userWithJob = Object.assign({}, user, userJob);
```

In the previous example, that would be the proper approach as the merging depth here is simple, but let's take another example.

```js
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  job: {
    title: "Software Engineer",
  },
};

const userJob = {
  job: {
    level: "Senior",
  },
};

const userWithJob = Obj.merge(user, userJob);
```

The output will be:

```json
{
  "id": 1,
  "name": "Hasan Zohdy",
  "job": {
    "title": "Software Engineer",
    "level": "Senior"
  }
}
```

But when using spread syntax or `Object.assign` will give us a different value.

```js
const user = {
  id: 1,
  name: "Hasan Zohdy",
  job: {
    title: "Software Engineer",
  },
};

const userJob = {
  job: {
    level: "Senior",
  },
};

const userWithJob = { ...user, ...userJob };
// OR
const userWithJob = Object.assign({}, user, userJob);
```

```json
{
  "id": 1,
  "name": "Hasan Zohdy",
  "job": {
    "level": "Senior"
  }
}
```

### Clone objects

You can also make a **deep copy** for the given object using `Obj.clone` or `objClone`

```js
const user = {
  id: 1,
  name: {
    first: "Hasan",
  },
};

const normalClonedUser = { ...user };

normalClonedUser.name.first = "Ali";

// both will be the same as only the top level is deeply copied but nested objects are shallow copies
console.log(normalClonedUser.name.first); // Ali
console.log(user.name.first); // Ali
```

Now using `Obj.clone`

```js
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: {
    first: "Hasan",
  },
};

const normalClonedUser = Obj.clone(user);

cloned.name.first = "Ali";

console.log(cloned.name.first); // Ali
// Here the original object is kept untouched
console.log(user.name.first); // Hasan
```

### Getting certain values from object

To get a new object from the base object with only list of keys, use `Obj.only(object: object, keys: string[]): object`

```js
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

const simpleUserData = Obj.only(user, ["id", "name", "email"]); // {id: 1, name: 'Hasan Zohdy', email: 'hassanzohdy@gmail.com'}
```

### Getting all object except for certain keys

This is the reverse of `obj.only`, which returns the entire object except for the given keys.

```js
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

const simpleUserData = Obj.except(user, ["id", "address", "email"]); // { name: 'Hasan Zohdy', email: 'hassanzohdy@gmail.com', job: {title: 'Software Engineer'}}
```

### Flatten objects

We can flatten any big fat objects into one object, with only one dimension.

```js
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

console.log(Obj.flatten(user));
```

Output:

```json
{
  "id": 1,
  "name": "Hasan Zohdy",
  "email": "hassanzohdy@gmail.com",
  "job.title": "Software Engineer",
  "address.country": "Egypt",
  "address.building.number": 12,
  "address.building.floor.number": 3
}
```

You may set the separator by passing second argument to the function.

```js
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

console.log(Obj.flatten(user, "->"));
```

Output:

```json
{
  "id": 1,
  "name": "Hasan Zohdy",
  "email": "hassanzohdy@gmail.com",
  "job->title": "Software Engineer",
  "address->country": "Egypt",
  "address->building->number": 12,
  "address->building->floor->number": 3
}
```

### Sort object by its keys

To sort objects based on their keys alphabets recursively use `Obj.sort(object: object, recursive: boolean = true): object` function.

```js
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

console.log(Obj.sort(user));
```

Output:

```json
{
  "address": {
    "building": {
      "floor": {
        "number": 3
      },
      "number": 12
    },
    "country": "Egypt"
  },
  "email": "hassanzohdy@gmail.com",
  "id": 1,
  "job": {
    "title": "Software Engineer"
  },
  "name": "Hasan Zohdy"
}
```

To sort the object only the first level, pass the second argument as false.

```js
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

console.log(Obj.sort(user, false));
```

Output:

```json
{
  "address": {
    "country": "Egypt",
    "building": {
      "number": 12,
      "floor": {
        "number": 3
      }
    }
  },
  "email": "hassanzohdy@gmail.com",
  "id": 1,
  "job": {
    "title": "Software Engineer"
  },
  "name": "Hasan Zohdy"
}
```

## Generating Random Values

Another good feature is `Random` object, which allows us to generate variant random values of different types.

### Generate random string

To generate a random string use `Random.string(length: number = 32): string` method.

```js
import { Random } from "@mongez/reinforcements";

Random.string(); // 4G8JyA4uM5YVMbkqVaoYnW6GzPcC64Fy
```

To generate a random string with certain length, just pass the length value to the function.

```js
import { Random } from "@mongez/reinforcements";

Random.string(12); // P057C06VPwxl
```

### Generate random integer

To generate a random integer use `Random.int(min: number = 1, max: number = 9999999): number` method.

```js
import { Random } from "@mongez/reinforcements";

Random.int(); // 7387115
Random.int(); // 9411554
Random.int(); // 691593
```

To set min value, pass first argument with minimum value

```js
import { Random } from "@mongez/reinforcements";

Random.int(10); // 7387115
```

To set min and max value, pass second argument as well with maximum value

```js
import { Random } from "@mongez/reinforcements";

Random.int(10, 100); // 36
```

### Generate random html id

This function will generate a valid random html id string `Random.id(length: number = 6, startsWith: string = "el-"): string`.

```js
import { Random } from "@mongez/reinforcements";

Random.id(); // el-SDFefdvgtr2e3qw
Random.id(); // el-fasrg3q
```

You may set the length as first argument and/or set the id prefix as second argument (**default is el-**).

### Generate random boolean value

To generate random boolean value use `Random.bool(): boolean` or `Random.boolean(): boolean`

```js
import { Random } from "@mongez/reinforcements";

Random.bool(); // true
Random.bool(); // true
Random.bool(); // false
Random.boolean(); // false
Random.boolean(); // true
Random.boolean(); // false
```

## Round float numbers

To round float numbers, use `round(value: number, precision: number = 2): number`.

```js
import { round } from "@mongez/reinforcements";

console.log(round(10.0001)); // 10
console.log(round(10.0478878)); // 10.04
console.log(round(10.6987894849)); // 10.69
console.log(round(10.6987894849, 3)); // 10.698
```

## Working With Strings (Str)

The following list defines all available string utilities

- `capitalize`
- `toCamelCase`
- `toSnakeCase`
- `toStudlyCase`
- `ucfirst`
- `toInputName`
- `extension`
- `readMoreChars`
- `readMoreWords`
- `replaceFirst`
- `replaceLast`
- `replaceAll`
- `removeFirst`
- `removeLast`
- `repeatsOf`
- `ltrim`
- `trim`
- `rtrim`
- `startsWithArabic`

### Capitalize words

Capitalize each word in string Separated by whitespace `capitalize(string: string): string`.

```js
import { capitalize } from "@mongez/reinforcements";

const words = "hello world";

console.log(capitalize(words)); // Hello World
```

### Convert string to camel case

Convert string to camel case, each word in string Separated by **whitespace** **underscores** or **dashes** `toCamelCase(string: string, separator: string = "\\s+|-|/|_|\\."): string`.

```js
import { toCamelCase } from "@mongez/reinforcements";

const words = "hello world";

console.log(toCamelCase(words)); // helloWorld
```

Any of following will be used as a separator for the text, `.` | `-` | `whitespace` | `/`, you can set the separator as second argument though.

### Convert string to snake case

Convert string to snake case, each word in string Separated by **whitespace** or **dashes** `toSnakeCase(string: string): string`.

The final output of the text will be all letters in lower case string separated by \_ **underscores**.

```js
import { toSnakeCase } from "@mongez/reinforcements";

const words = "hello world";

console.log(toSnakeCase(words)); // hello_world
```

### Convert string to studly case

Convert string to studly case, each word in string Separated by **whitespace**, **underscores** or **dashes** `toStudlyCase(string: string, separator: string = "-|\\.|_|\\s"): string`.

The final output will be capitalizing each word and glue it together without any separators such as **whitespace**, **under scores** or **dashes**.

```js
import { toStudlyCase } from "@mongez/reinforcements";

const words = "hello world";

console.log(toStudlyCase(words)); // HelloWorld
```

### Capitalize first word of string

Capitalize only first word of string `ucfirst(string: string): string`.

```js
import { ucfirst } from "@mongez/reinforcements";

const words = "hello world";

console.log(ucfirst(words)); // Hello world
```

### To input name

Convert dot notation syntax to valid html input name `toInputName(string: string): string`.

```js
import { toInputName } from "@mongez/reinforcements";

const name = "user.name";

console.log(toInputName(name)); // user[name]
console.log(toInputName("keywords.en.list[]")); // keywords[en][list][]
```

### Get extension of string

Get the last extension in the string, the string that is suffix to last dot `.`.

`extension(string: string): string`

```js
import { extension } from "@mongez/reinforcements";

const file = "my-image.png";

console.log(extension(file)); //png
```

### Read more characters

This function will cut off the string when characters reach limit, and append three dots `...` at the end of the string.

`readMoreChars(string: string, length: number, readMoreDots: string = '...'): string`

```js
import { readMoreChars } from "@mongez/reinforcements";

const string = "This is a fine words list";

console.log(readMoreChars(string, 20)); // This is a fine words...

// if the given limit is equal to or more than string length, then the entire string will be returned without any dots
console.log(readMoreChars(string, 30)); // This is a fine words list

// change the three dots to something else

const string = "This is a fine words list";

console.log(readMoreChars(string, 20, " >>")); // This is a fine words >>
```

### Read more words

This function will cut off the string when words reach the given limit, and append three dots `...` at the end of the string.

This works based on total number of whitespace in the string.

`readMoreWords(string: string, length: number, readMoreDots: string = '...'): string`

```js
import { readMoreWords } from "@mongez/reinforcements";

const string = "This is a fine words list";

console.log(readMoreWords(string, 4)); // This is a fine...

// if the given limit is equal to or more than words length, then the entire string will be returned without any dots
console.log(readMoreWords(string, 6)); // This is a fine words list

// change the three dots to something else

const string = "This is a fine words list";

console.log(readMoreWords(string, 4, " >>")); // This is a fine >>
```

### Remove first matched string

Remove the first matched needle to the given string.

`removeFirst(string: string, needle: string): string`

```js
import { removeFirst } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(removeFirst(words, "home")); // welcome  buddy, your are not safe at your home!
```

### Replace first matched string

Replace the first matched needle to the given string.

`replaceFirst(string:string, needle: string, replacement: string): string`

```js
import { replaceFirst } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(replaceFirst(words, "home", "country")); // welcome country buddy, your are not safe at your home!
```

### Replace last matched string

Replace the last matched needle to the given string.

`replaceLast(string:string, needle: string, replacement: string): string`

```js
import { replaceLast } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(replaceLast(words, "home", "country")); // welcome home buddy, your are not safe at your country!
```

### Replace all matched string

Replace all matched words to the given string.

`replaceAll(string: string, searchText:string, replacement: string): string`

```js
import { replaceAll } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(replaceAll(words, "home", "country")); // welcome country buddy, your are not safe at your country!
```

### Remove last matched string

Remove the last matched needle to the given string.

`removeLast(string: string, needle: string): string`

```js
import { removeLast } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(removeLast(words, "home")); // welcome home buddy, your are not safe at your !
```

### Count repeats of needle in a string

Count repeats of a needle in the given string.

`repeatsOf(string: string, needle: string, caseSensitive: boolean = true): number`

```js
import { repeatsOf } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(repeatsOf(words, "home")); // 2
```

You may also detect number of repetitions ignoring case sensitive.

```js
import { repeatsOf } from "@mongez/reinforcements";

// note the first Home is capitalized
const words = "welcome Home buddy, your are not safe at your home!";

// case sensitive
console.log(repeatsOf(words, "home")); // 1
// case insensitive
console.log(repeatsOf(words, "home", false)); // 2
```

### Trimming values from string

Trim value from the start and the end of a string.

`trim(string: string, needle: string = ' '): string`

```js
import { trim } from "@mongez/reinforcements";

const string = " space at the start and at the end ";

console.log(trim(string)); // "space at the start and at the end"
```

But why not use [String.trim()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) directly? well they both will give you same functionality except that `trim()` function trims any value not only white space.

Remove certain value:

```js
import { trim } from "@mongez/reinforcements";

const string = "/home/";

console.log(trim(string, "/")); // home
```

### Left Trimming values from string

Trim value from the start of a string.

`ltrim(string: string, needle: string = ' '): string`

```js
import { ltrim } from "@mongez/reinforcements";

const string = " A space at the start and keep space at the end ";

console.log(ltrim(string)); // "A space at the start and keep space at the end "
```

Remove certain value:

```js
import { ltrim } from "@mongez/reinforcements";

const string = "home/";

console.log(ltrim(string, "/")); // home/
```

### Right Trimming values from string

Trim value from the end of a string.

`rtrim(string: string, needle: string = ' '): string`

```js
import { rtrim } from "@mongez/reinforcements";

const string = " Keep A space at the start and remove space at the end ";

console.log(rtrim(string)); // " Keep A space at the start and remove space at the end"
```

Remove certain value:

```js
import { ltrim } from "@mongez/reinforcements";

const string = "home/";

console.log(rtrim(string, "/")); // /home
```

## Detect if string starts with Arabic

Determine if the string starts with Arabic letter.

`startsWithArabic(text: string, trimmed: boolean = true): boolean {`

```js
import { startsWithArabic } from "@mongez/reinforcements";

const string = "English Text";

const arabicString = "مرحبا";

console.log(startsWithArabic(string)); // false
console.log(startsWithArabic(arabicString)); // true
```

## Debounce

`debounce(callback: Function, timer: number = 0): void`

You can debounce your functions using `debounce` to prevent multiple calls.

> This debounce function will be called instantly and will not return a callback function.

```tsx
import { debounce } from "@mongez/reinforcements";

function sendEmail(e: any) {
  sendEmailApi(e.target);
}

// If user clicked 5 times, it will make 5 ajax calls

<button click={sendEmail}>Send Email</button>;
```

Now when using `debounce`

```tsx
import { debounce } from "@mongez/reinforcements";

function sendEmail(e: any) {
  debounce(() => {
    sendEmailApi(e.target);
  });
}

// If user clicked 5 times, it will make only one ajax call

<button click={sendEmail}>Send Email</button>;
```

You can also set a timer when to trigger the function

```tsx
import { debounce } from "@mongez/reinforcements";

function sendEmail(e: any) {
  // wait 3 seconds before calling the function
  debounce(() => {
    sendEmailApi(e.target);
  }, 3000);
}

// If user clicked 5 times, it will make only one ajax call

<button click={sendEmail}>Send Email</button>;
```

## Tests

To run tests run `npm run test` or `yarn test`

## Change Log

- 1.0.28 (11 Aug 2022)
  - Fixed object merge call.
- 1.0.27 (11 Aug 2022)
  - Added test.
  - `toCamelCase` now will use the dot `.` as separator.
  - `toCamelCase`'s separator is not explicit as second argument.
- 1.0.26 (08 Jun 2022)
  - Removed `sprintf-js` from dependencies.
- 1.0.25 (08 Jun 2022)
  - Fixed Flatten method with empty arrays.
- 1.0.23 (03 Jun 2022)
  - Added [debounce](#debounce) function.
  - Added `/` to be replaced in `toCamelCase` `toStudlyCase` and `toSnakeCase`.
- 1.0.22 (10 Feb 2022)
  - Added [Obj.except](#getting-all-object-except-for-certain-keys) method.
- 1.0.21 (28 Jan 2022)
  - Fixed `objOnly` method that adds undefined values if key does not exist on the given object.
- 1.0.19 (15 Jan 2022)
  - Added [Clone objects](#clone-objects) function.
- 1.0.18 (15 Jan 2022)
  - Added [Flatten objects](#flatten-objects) function.

## TODO

- Create tests.
- Implements Array helpers list.
