export type EmailTemplateSchema = {
    id: string,
    project_id: string,
    title: string,
    subject: string,
    html: string,
    created_at?: any
}