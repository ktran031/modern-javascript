// Person constructor
function Person(name, dob) {
  this.name = name;
  // this.age = age;
  this.birthday = new Date(dob);
  this.calculateAge = function(){
    
    // Date.now() returns todays date as a timestamp since 1970.
    // this.birtday.getTime() returns the birthdate a timestamp since 1970.
    const diff =  Date.now() - this.birthday.getTime();

    // in ageDate, we wrap that in a new Date constructor so we actually get a date, and not just a timestamp.
    const ageDate = new Date(diff);

    // Then we use the ageDate.getUTCFullYear(), so we get the year and not the entire date. Since the datestamp only goes back to 1970, we have to subtract 1970 from the date we get returned, to get the age.
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}

// const brad = new Person('Brad', 36);
// const john = new Person('John', 30);

// console.log(john.age);

const brad = new Person('Brad', '9-20-1991');
console.log(brad)
console.log(brad.calculateAge());
