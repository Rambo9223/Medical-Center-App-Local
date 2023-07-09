import { render } from '@testing-library/react';
import App from './App';
import React from 'react';
import mockAxios from "jest-mock-axios";
import { fetchData } from './utils';

/* Note to test we must make sure the backend is running */

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXJub2xkIEFkbWluIiwidXNlcm5hbWUiOiJhZG1pbkBjbGluaWMuY29tIiwicGFzc3dvcmQiOiJhZG1pbjEiLCJwb3NpdGlvbiI6IkFkbWluIiwiaWF0IjoxNjg4ODI0NjE5fQ.nVNMSPswU3QmELHJWNzgc1-t5kcIQ8-EnlDuttJgYSE";


// test 1 App renders correctly and matches snapshot
function MockApp(){
  return (<>
  <App/>
  </>)
}

test("renders correctly",() => {
  const app = render(<MockApp/>);
  expect(app).toMatchSnapshot();
});

// Test 2 Unit test to check login function using mockAxios

describe("fetch API item", () => {
  afterEach(()=>{
    mockAxios.reset();
  });



  describe("when Login call is succesful", () => {
    it("should return the logged in userInfo", async() => {
      
      // given
      const expected = {
        "_id": "64a2bc2f4f9b38a406cf461b",
        "name": "Arnold Admin",
        "username": "admin@clinic.com",
        "password": "admin1",
        "position": "Admin",
        "startDate": "2023-06-01T23:00:00.000Z",
        "__v": 0,
        "contactNumber": "07654345654"
    };
      mockAxios.get.mockResolvedValueOnce(expected);

      
      // result is the returned object from the utils.js function fetchData()
      const result = await fetchData(token);
      console.log(result);

      // then
      expect(result).toEqual(expected);
    });
  });

  
  describe("when Login call fails with no details", () => {
    it("should return error object", async () => {
      // given
      const message = {"message":"No token attached to the request"};
      

      // when
      const result = await fetchData();
      console.log(result);

      // then
      expect(result).toEqual(message);
    });
  });


  describe("when Login call fails with incorrect details", () => {
    it("should return error object", async () => {

      let falseToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXJub2xkIEFkbWluIiwidXNlcm5hbWUiOiJhZG1pbkBjbGluaWMuY29tIiwicGFzc3dvcmQiOiJhZG1pbjEiLCJwb3NpdGlvbiI6IkFkbWluIiwiaWF0IjoxNjg4ODI0NjE5fQ.nVNMSPswU3QmELHJWNzgc1-t5kcIQ8-EnlDuttJgYS";
      // given
      const message = {"message":"Invalid Token"};
      

      // when
      const result = await fetchData(falseToken);
      console.log(result);

      // then
      expect(result).toEqual(message);
    });
  });
});


