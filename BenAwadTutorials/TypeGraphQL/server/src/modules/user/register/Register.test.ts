

import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn"

beforeAll(async() => {
    await testConn();
})

afterAll(() => {

})

const registerMutation = `
mutation Register($data: RegisterInput!) {
    register(
        data: $data
    ) {
        id
        firstName
        lastName
        email
        name
    }
}`;

describe('Register', () => {
    it("create user", async () => {
        console.log(
            await gCall({
                source: registerMutation,
                variableValues: {
                    data:{
                        firstName: 'bob',
                        lastName: 'bob2',
                        email: 'bob@email.com',
                        password: "asdfasdf"
                    }
                }
            })
        )
    })
})