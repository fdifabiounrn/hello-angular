export class Person {
  name: string;
  lastName: string;
  age: number;


  constructor(name: string, lastName: string, age: number) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }

  public showName(): string {
    return this.name + ", " + this.lastName;
  }

  public isAdult(): boolean {
    return this.age >= 18;
  }
}
