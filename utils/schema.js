import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition', { length: 256 }).notNull(),
    jobDescription: varchar('jobDescription', { length: 1000 }).notNull(),
    jobExperience: varchar('jobExperience', { length: 50 }).notNull(),
    createdBy: varchar('createdBy', { length: 256 }).notNull(),
    creaatedAt: varchar('creaatedAt', { length: 50 }).notNull(), 
    mockId: varchar('mockId', { length: 256 }).notNull()
});