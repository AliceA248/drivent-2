import { Router } from "express";
import { types } from "util";
import { authenticateToken } from "@/middlewares";
import { createTicket, getTickets, getTicketsTypes } from "@/controllers";

const ticketsRouter = Router()

ticketsRouter.all("/*", authenticateToken).get("/types", getTicketsTypes).get("/", getTickets).post("/",createTicket)

export { ticketsRouter }