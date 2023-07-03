const { when } = require("jest-when");
const usersController = require("../users");
const prisma = require("../../utils/prisma");
const bcrypt = require("bcrypt");
jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("users controller", () => {
  describe("getAllUsers", () => {
    it("Should return 404 when no users available", async () => {
      // arrange
      const res = {
        locals: {
          user: 1,
        },
      };
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      prisma.users = { findMany: jest.fn().mockReturnValueOnce([]) };

      // act
      await usersController.getAllUsers(undefined, res);

      // assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: "Users not found" })
      );
    });

    it("Should return 200 when users available", async () => {
      // arrange
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const users = [{ firstName: "Oscar" }];
      const usersMock = jest.fn();

      when(usersMock)
        .calledWith(
          expect.objectContaining({
            where: {
              active: true,
            },
          })
        )
        .mockReturnValueOnce(users);

      prisma.users = { findMany: usersMock };

      //act
      await usersController.getAllUsers(undefined, res);

      //assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe("getUser", () => {
    const req = {
      params: { id: "1" },
    };
    it("Should return 404 when no user available", async () => {
      // arrange
      const res = {
        locals: {
          user: 1,
        },
      };
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      prisma.users = { findMany: jest.fn().mockReturnValueOnce([]) };

      // act
      await usersController.getUser(req, res);

      // assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: "User not found" })
      );
    });

    it("Should return 200 when user available", async () => {
      // arrange
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const user = [{ firstName: "Oscar" }];
      const userMock = jest.fn();

      when(userMock)
        .calledWith(
          expect.objectContaining({
            where: {
              id: parseInt(1),
              active: true,
            },
            select: {
              id: true,
              first_name: true,
              second_name: true,
              email: true,
              projects: {
                select: {
                  id: true,
                  name: true,
                  date_created: true,
                  routines: {
                    select: {
                      id: true,
                      name: true,
                      description: true,
                      technique_id: true,
                      scale_id: true,
                    },
                  },
                },
              },
            },
          })
        )
        .mockReturnValueOnce([user]);

      prisma.users = { findMany: userMock };

      //act
      await usersController.getUser(req, res);

      //assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe("createUser", () => {
    it("Should create a user and return a 201 status with user data", async () => {
      // arrange
      bcrypt.hash = jest.fn().mockResolvedValueOnce("hashedPassword");

      const req = {
        body: {
          first_name: "John",
          second_name: "Doe",
          email: "john@example.com",
          password: "password123",
        },
      };

      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      const user = {
        first_name: "John",
        second_name: "Doe",
        email: "john@example.com",
      };

      prisma.users = {
        create: jest.fn(),
      };

      prisma.users.create.mockResolvedValueOnce({
        //just user
        first_name: "John",
        second_name: "Doe",
        email: "john@example.com",
      });

      //act
      await usersController.createUser(req, res);

      //assert
      expect(prisma.users.create).toHaveBeenCalledWith({
        data: {
          first_name: "John",
          second_name: "Doe",
          email: "john@example.com",
          password: "hashedPassword",
        },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe("updateUser", () => { //update as in deleteUser
    const req = {
      params: { id: "1" },
      body: {
        first_name: "John",
        second_name: "Doe",
        email: "john@example.com",
        password: "password123",
      },
    };
    prisma.users = {
      findMany: jest.fn(),
      update: jest.fn(),
    };
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    it("Should update the user and return a 200 status with updated user data", async () => {
      // arrange
      bcrypt.hash = jest.fn().mockResolvedValueOnce("hashedPassword");

      const user = {
        first_name: "John",
        second_name: "Doe",
        email: "john@example.com",
      };

      prisma.users.findMany.mockResolvedValueOnce([{ id: 1 }]);
      prisma.users.update.mockResolvedValueOnce(user);

      //act
      await usersController.updateUser(req, res);

      //assert
      expect(prisma.users.findMany).toHaveBeenCalledWith({
        where: {
          id: 1,
          active: true,
        },
      });
      expect(prisma.users.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          first_name: "John",
          second_name: "Doe",
          email: "john@example.com",
          password: "hashedPassword",
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe("deleteUser", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {
        params: { id: "1" },
      };

      res = {
        status: jest.fn().mockReturnThis(),
        sendStatus: jest.fn(),
        json: jest.fn(),
      };
    });
    

    it("Should set the user as inactive and return a 204 status", async () => {
      // arrange
      prisma.users = {
        findUnique: jest.fn().mockResolvedValueOnce({ id: 1 }),
        update: jest.fn().mockResolvedValueOnce(),
      };

      //act
      await usersController.deleteUser(req, res);

      //assert
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.users.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { active: false },
      });
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return a 404 error if user is not found", async () => {
      //arrange
      prisma.users = {
        findUnique: jest.fn().mockResolvedValueOnce(null)}

      //act
      await usersController.deleteUser(req, res);

      //assert
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });
});
