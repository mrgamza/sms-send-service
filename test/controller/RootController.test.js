import * as RootController from "../../app/controller/RootController.js"

const mockRequest = (sessionData) => {
   return {
     session: { data: sessionData },
   }
 }

const mockResponse = () => {
   const res = {}
   res.status = jest.fn().mockReturnValue(res)
   res.json = jest.fn().mockReturnValue(res)
   return res;
}

describe('Hello test', () => {
   test('hi > should 200', async () => {
      const req = mockRequest()
      const res = mockResponse()
      await RootController.hi(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
   })
})