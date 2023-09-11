import { faker } from '@faker-js/faker';

const config = {
   username :'standard_user',
   lockedOutUser: 'locked_out_user',
   password :'secret_sauce',
   firstName: faker.person.firstName(),
   lastName: faker.person.lastName(),
   zip: faker.location.zipCode()
}
export default config