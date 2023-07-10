import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";
import { userInfo } from "os";
import { resourceUsage } from "process";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketType() {
    const ticketType = await ticketsRepository.findTicketTypes()
    if (!ticketType) throw notFoundError

    return ticketType
}

async function getTicketByUserId(userId:number, ticketsTypeId:number) {
    const enrollments = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!enrollments) throw notFoundError
    
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollments.id)
    return ticket
}
async function createTicket(userId:number, ticketsTypeId:number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!enrollment) throw notFoundError

    const ticketData = {
        ticketsTypeId,
        enrollmentId: enrollment.id,
        status:TicketStatus.RESERVED
    } 
    await ticketsRepository.createTicket(ticketData)

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)

    return ticket
}

const TicketService = { getTicketByUserId, getTicketType, createTicket }

export default TicketService;