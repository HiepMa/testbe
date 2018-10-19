var request = require("request");

var base_url = "http://localhost:1321/api/";



describe("Login api", function() {
    describe("POST /auth/token", function() {
      it("Should status 400", function(done) {
        request.post(base_url + "auth/token", {json : true} , function(error, response, body) {
            console.log(response.statusCode);
            expect(response.statusCode).toBe(400);
            done();
        });
      });

      it("Should status 401", function(done) {
        const data = {
          "userName" :"admin",
          "passWord" : "sadas"
        }
        request.post(base_url + "auth/token", {json : true, body : data} , function(error, response, body) {
            console.log(response.statusCode);
            expect(response.statusCode).toBe(401);
            done();
        });
      });

      it("Should status 200", function(done) {
        const data = {
          "userName" :"admin",
          "passWord" : "admin"
        }
        
        request.post(base_url + "auth/token", {json : true, body : data} , function(error, response, body) {
            console.log(response.statusCode);
            expect(response.statusCode).toBe(200);

            //compare to object
            let dataProperty = Object.keys(body).sort();
            let dataExpected = [
              'id',
              'usr',
              'fullname',
              'token'
            ].sort();
            expect(dataProperty).toEqual(dataExpected);

            //Check Token
            console.log(body.token);
            var n = body.token.startsWith("Bearer");
            expect(n).toBe(true);
            expect(body.token).toMatch("Bearer");
            done();
        });
      });
    });
  });