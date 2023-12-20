// Import the faker library
import { faker } from 'https://esm.sh/@faker-js/faker';

const stacks = [
  "Javascript"
  , "Python"
  , "Go"
  , "Java"
  , "Kotlin"
  , "PHP"
  , "C#"
  , "Swift"
  , "R"
  , "Ruby"
  , "C"
  , "C++"
  , "Matlab"
  , "TypeScript"
  , "Scala"
  , "SQL"
  , "HTML"
  , "CSS"
  , "NoSQL"
  , "Rust"
  , "Perl"
  , "C#"
  , "Clojure"
  , "MySQL"
  , "Postgres"]

export const userData = () => ({
  apelido: faker.person.firstName(),
  nome: faker.person.fullName(),
  nascimento: faker.date.birthdate(),
  stack: faker.helper.arrayElements(stacks)
});