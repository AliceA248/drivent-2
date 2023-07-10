import httpStatus from "http-status"
import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import { ticketsRouter } from "@/routers";
import TicketService from "@/services/tickets-service";
import { number } from "joi";

export async function  getTicketsTypes (req: Request, res: Response) {
    try {
        const ticketsType = await TicketService.getTicketType()
        return res.status(httpStatus.OK).send(ticketsType) 
    }
    catch (e) {
        return res.sendStatus(httpStatus.NO_CONTENT)
    }


}


export async function createTicket(req: AuthenticatedRequest, res: Response) {
    const {userId} = req
    const { ticketsTypeId } = req.body
 

    if (!ticketsTypeId) return res.sendStatus(httpStatus.BAD_REQUEST)
    
    try {
        const ticket = await TicketService.createTicket(userId, ticketsTypeId)
        return res.status(httpStatus.CREATED).send(ticket) 
    }
    catch (e) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }

}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req

    try {
        const ticket = await TicketService.getTicketByUserId(userId)
        return res.status(httpStatus.OK).send(ticket) 
    }
    catch (e) {
        return res.sendStatus(httpStatus.NO_CONTENT)
    }

}

